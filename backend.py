import cgi
import json
import os
from datetime import datetime, timedelta, timezone
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
STATE_FILE = os.path.join(DATA_DIR, "state.json")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(UPLOAD_DIR, exist_ok=True)
VIDEO_RETENTION_DAYS = 365


def _parse_iso_ts(value):
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except Exception:
        return None


def _is_old(ts_str, days):
    ts = _parse_iso_ts(ts_str)
    if not ts:
        return False
    if ts.tzinfo is None:
        ts = ts.replace(tzinfo=timezone.utc)
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    return ts < cutoff


def _safe_delete_upload(file_path):
    if not file_path or not file_path.startswith("/uploads/"):
        return
    basename = os.path.basename(file_path)
    abs_path = os.path.join(UPLOAD_DIR, basename)
    if os.path.exists(abs_path):
        try:
            os.remove(abs_path)
        except Exception:
            pass


def enforce_video_retention(state):
    if not isinstance(state, dict):
        return state

    tasks = state.get("tasks", [])
    for task in tasks:
        evidence = task.get("evidence", [])
        keep = []
        for item in evidence:
            mime = str(item.get("mimeType", "")).lower()
            is_video = mime.startswith("video/")
            old_video = is_video and _is_old(item.get("uploadedAt"), VIDEO_RETENTION_DAYS)
            if old_video:
                _safe_delete_upload(item.get("filePath"))
                continue
            keep.append(item)
        task["evidence"] = keep

    docs = state.get("documents", [])
    keep_docs = []
    for doc in docs:
        mime = str(doc.get("mimeType", "")).lower()
        old_video_doc = mime.startswith("video/") and _is_old(doc.get("uploadedAt"), VIDEO_RETENTION_DAYS)
        if old_video_doc:
            _safe_delete_upload(doc.get("filePath"))
            continue
        keep_docs.append(doc)
    state["documents"] = keep_docs

    # Safety cleanup for any old, unreferenced files in uploads/.
    cutoff = datetime.now(timezone.utc) - timedelta(days=VIDEO_RETENTION_DAYS)
    for name in os.listdir(UPLOAD_DIR):
        path = os.path.join(UPLOAD_DIR, name)
        try:
            mtime = datetime.fromtimestamp(os.path.getmtime(path), tz=timezone.utc)
        except Exception:
            continue
        if mtime < cutoff:
            try:
                os.remove(path)
            except Exception:
                pass

    return state


class PortalHandler(SimpleHTTPRequestHandler):
    def _send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _read_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length) if length else b"{}"
        try:
            return json.loads(raw.decode("utf-8"))
        except Exception:
            return None

    def do_GET(self):
        if self.path == "/api/state":
            if not os.path.exists(STATE_FILE):
                return self._send_json({"status": "empty"}, 404)
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
            data = enforce_video_retention(data)
            with open(STATE_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=True)
            return self._send_json(data)
        return super().do_GET()

    def do_POST(self):
        if self.path == "/api/state":
            payload = self._read_json()
            if not payload:
                return self._send_json({"error": "invalid_json"}, 400)
            payload = enforce_video_retention(payload)
            with open(STATE_FILE, "w", encoding="utf-8") as f:
                json.dump(payload, f, ensure_ascii=True)
            return self._send_json({"status": "ok"})

        if self.path == "/api/upload":
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={
                    "REQUEST_METHOD": "POST",
                    "CONTENT_TYPE": self.headers.get("Content-Type", ""),
                },
            )

            uploaded_files = form["files"] if "files" in form else []
            if not isinstance(uploaded_files, list):
                uploaded_files = [uploaded_files]

            out = []
            for item in uploaded_files:
                if not getattr(item, "filename", None):
                    continue
                original = os.path.basename(item.filename)
                ts = datetime.utcnow().strftime("%Y%m%d%H%M%S%f")
                safe_name = f"{ts}_{original}".replace(" ", "_")
                save_path = os.path.join(UPLOAD_DIR, safe_name)
                with open(save_path, "wb") as f:
                    data = item.file.read()
                    f.write(data)

                out.append(
                    {
                        "fileName": original,
                        "mimeType": item.type or "application/octet-stream",
                        "fileSizeKb": max(1, int(len(data) / 1024)),
                        "uploadedAt": datetime.utcnow().isoformat() + "Z",
                        "filePath": f"/uploads/{safe_name}",
                    }
                )

            return self._send_json({"files": out})

        self._send_json({"error": "not_found"}, 404)


if __name__ == "__main__":
    os.chdir(BASE_DIR)
    host, port = "0.0.0.0", 8000
    server = ThreadingHTTPServer((host, port), PortalHandler)
    print(f"Fire Compliance Portal running at http://{host}:{port}")
    print("Open from same machine: http://localhost:8000")
    server.serve_forever()
