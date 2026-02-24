# Fire Compliance Portal (MVP)

Web-first fire compliance portal with mobile field workflow and central sync support.

## What is included

- Phone + OTP login flow (demo OTP in UI)
- Role-based access: `Admin`, `Maintenance`, `Compliance`, `Auditor`, `Accounts`, `Manager`
- Store/city scoped visibility
- Dashboard for pending, overdue, expiring, and critical items
- Dashboard drilldown:
  - Work done in last 7 days by category/subcategory
  - Auditor and maintenance efficiency (last 30 days)
- Compliance tasks with recurring + one-time logic
- Review workflow:
  - Field uploads go to admin review queue first
  - Task closes only after admin approval
  - Rejection requires minimum 100-word comment and task returns to pending
- Mobile-first **Field Work** page:
  - Select outlet
  - See pending agenda items
  - Capture live back-camera video (with audio) in-app
  - Attach geolocation + capture timestamp metadata
  - Upload photo/video/document
  - Upload optional audio note
  - Add text description and submit from store
- Document vault with expiry tracking
- Asset register for fire/electrical/gas safety
- Admin template manager for add/remove/frequency configuration

## Demo users

- `9999999990` Admin
- `9999999991` Maintenance
- `9999999992` Accounts
- `9999999993` Manager
- `9999999994` Compliance
- `9999999995` Auditor

## Run with central sync (recommended)

From `/Users/amitraj/Documents/Codex`:

```bash
python3 backend.py
```

Then open:

- `http://localhost:8000`

This mode enables:

- Shared state across devices/users connected to same server
- Central file uploads under `/uploads`
- Video retention policy: video evidence and video documents older than 365 days are auto-purged

## Run static-only fallback

```bash
python3 -m http.server 8000
```

This mode is local browser storage only (no shared central sync across devices).

## Deploy publicly

1. Push repository to GitHub.
2. Deploy to a VM/container where `python3 backend.py` can run (Render/Railway/AWS/DO/etc.).
3. Point your domain/subdomain to that service.
4. Add HTTPS.

Note: GitHub Pages alone serves static files only and will not support central uploads/database.
