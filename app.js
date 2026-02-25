const LOCAL_SESSION_KEY = "fireComplianceSessionV1";
const LOCAL_STATE_KEY = "fireComplianceStateFallbackV1";
const API_STATE = "/api/state";
const API_UPLOAD = "/api/upload";

const CATEGORY_OPTIONS = ["gas_safety", "electrical_safety", "fire_system", "licensing", "training", "other"];

const seedState = {
  users: [
    { id: "u-admin", name: "Admin User", email: "admin@company.com", phone: "9999999990", role: "admin", cityIds: ["all"], storeIds: ["all"] },
    { id: "u-maint", name: "Maintenance Lead", email: "maintenance@company.com", phone: "9999999991", role: "maintenance", cityIds: ["city-delhi", "city-mumbai"], storeIds: ["all"] },
    { id: "u-accounts", name: "Accounts Team", email: "accounts@company.com", phone: "9999999992", role: "accounts", cityIds: ["all"], storeIds: ["all"] },
    { id: "u-manager", name: "Store Manager", email: "manager@company.com", phone: "9999999993", role: "manager", cityIds: ["city-delhi"], storeIds: ["s-del-01", "s-del-02"] },
    { id: "u-compliance", name: "Compliance Officer", email: "compliance@company.com", phone: "9999999994", role: "compliance", cityIds: ["all"], storeIds: ["all"] },
    { id: "u-auditor", name: "Field Auditor", email: "auditor@company.com", phone: "9999999995", role: "auditor", cityIds: ["all"], storeIds: ["all"] },
  ],
  cities: [
    { id: "city-delhi", name: "Delhi" },
    { id: "city-mumbai", name: "Mumbai" },
    { id: "city-bengaluru", name: "Bengaluru" },
    { id: "city-pune", name: "Pune" },
    { id: "city-hyderabad", name: "Hyderabad" },
  ],
  stores: [
    { id: "s-del-01", code: "DEL-01", name: "Delhi Kitchen 1", cityId: "city-delhi" },
    { id: "s-del-02", code: "DEL-02", name: "Delhi Kitchen 2", cityId: "city-delhi" },
    { id: "s-mum-01", code: "MUM-01", name: "Mumbai Kitchen 1", cityId: "city-mumbai" },
    { id: "s-blr-01", code: "BLR-01", name: "Bengaluru Kitchen 1", cityId: "city-bengaluru" },
    { id: "s-pun-01", code: "PUN-01", name: "Pune Kitchen 1", cityId: "city-pune" },
  ],
  templates: [
    { id: "t-lpg-leak", name: "LPG Leak Test Video", category: "gas_safety", subcategory: "LPG", team: "maintenance", frequencyType: "days", frequencyValue: 90, evidenceType: "video", mandatory: true, scope: "all", active: true, alerts: "30,15,7" },
    { id: "t-lpg-det", name: "LPG Detector Video", category: "gas_safety", subcategory: "Detector", team: "maintenance", frequencyType: "days", frequencyValue: 90, evidenceType: "video", mandatory: true, scope: "all", active: true, alerts: "30,15,7" },
    { id: "t-elec-audit", name: "Electrical Audit Video", category: "electrical_safety", subcategory: "Circuit", team: "maintenance", frequencyType: "days", frequencyValue: 90, evidenceType: "video", mandatory: true, scope: "all", active: true, alerts: "30,15,7" },
    { id: "t-alarm", name: "Fire Alarm Testing", category: "fire_system", subcategory: "Alarm", team: "maintenance", frequencyType: "days", frequencyValue: 90, evidenceType: "video", mandatory: true, scope: "all", active: true, alerts: "30,15,7" },
    { id: "t-purchase-lpg", name: "Purchase of LPG Components", category: "gas_safety", subcategory: "Purchase", team: "compliance", frequencyType: "one_time", frequencyValue: 0, evidenceType: "document", mandatory: true, scope: "all", active: true, alerts: "" },
    { id: "t-purchase-elec", name: "Purchase of Electrical Components", category: "electrical_safety", subcategory: "Purchase", team: "compliance", frequencyType: "one_time", frequencyValue: 0, evidenceType: "document", mandatory: true, scope: "all", active: true, alerts: "" },
    { id: "t-lpg-report", name: "LPG Inspection Report", category: "gas_safety", subcategory: "Inspection", team: "compliance", frequencyType: "one_time", frequencyValue: 0, evidenceType: "document", mandatory: true, scope: "all", active: true, alerts: "" },
    { id: "t-noc", name: "Fire NOC from Fire Department", category: "licensing", subcategory: "NOC", team: "compliance", frequencyType: "days", frequencyValue: 365, evidenceType: "document", mandatory: true, scope: "all", active: true, alerts: "90,60,30" },
    { id: "t-extinguisher-test", name: "Fire Extinguisher Bills and Testing Report", category: "fire_system", subcategory: "Extinguisher", team: "compliance", frequencyType: "days", frequencyValue: 365, evidenceType: "document", mandatory: true, scope: "all", active: true, alerts: "90,60,30" },
    { id: "t-ext-refill", name: "Fire Extinguisher Refill Bills", category: "fire_system", subcategory: "Refill", team: "compliance", frequencyType: "days", frequencyValue: 365, evidenceType: "document", mandatory: true, scope: "all", active: true, alerts: "90,60,30" },
  ],
  documentTypes: [
    { id: "dt-fire-noc", name: "Fire NOC from Fire Department", description: "State fire license/NOC", active: true },
    { id: "dt-lpg-inspection", name: "LPG Inspection Report", description: "Licensed LPG inspection report", active: true },
    { id: "dt-lpg-components", name: "Purchase of LPG Components", description: "Bills for LPG components", active: true },
    { id: "dt-electrical-components", name: "Purchase of Electrical Components", description: "Bills for electrical components", active: true },
    { id: "dt-extinguisher-test", name: "Fire Extinguisher Bills and Testing Report", description: "Extinguisher test certificates and bills", active: true },
  ],
  assetTypes: [
    { id: "at-extinguisher", name: "Fire Extinguisher", description: "Portable extinguisher unit", active: true },
    { id: "at-fire-alarm", name: "Fire Alarm Panel", description: "Main fire alarm panel", active: true },
    { id: "at-lpg-detector", name: "LPG Detector", description: "LPG leak detector", active: true },
    { id: "at-rccb", name: "RCCB", description: "Residual current circuit breaker", active: true },
    { id: "at-mcb", name: "MCB Panel", description: "Electrical panel safety", active: true },
    { id: "at-gas-valve", name: "Gas Pipeline Valve", description: "Gas valve / regulator", active: true },
  ],
  tasks: [],
  reviewQueue: [],
  auditLogs: [],
  documents: [],
  assets: [
    {
      id: "a-1",
      storeId: "s-del-01",
      type: "Fire Extinguisher",
      itemName: "ABC Extinguisher 6kg",
      serialNo: "DEL01-EX-001",
      location: "Kitchen Entry",
      count: 1,
      fillStatus: "filled",
      workingStatus: "working",
      lastCheckedOn: dateOffset(-15),
      nextDueOn: dateOffset(75),
      notes: "Pressure in green zone",
    },
  ],
};

const DEFAULT_ROLE_META = {
  admin: { name: "Admin", description: "Full control across system settings and approvals." },
  maintenance: { name: "Maintenance", description: "Field team for periodic preventive checks." },
  accounts: { name: "Accounts", description: "Central document and renewal visibility." },
  manager: { name: "Manager", description: "Store-level business and compliance visibility." },
  compliance: { name: "Compliance", description: "Central compliance document ownership." },
  auditor: { name: "Auditor", description: "Field auditor for onsite evidence uploads." },
};

const PERMISSION_DEFS = [
  { key: "page_dashboard", label: "Page: Dashboard" },
  { key: "page_users", label: "Page: User Management" },
  { key: "page_reviews", label: "Page: Admin Reviews" },
  { key: "page_field", label: "Page: Field Work" },
  { key: "page_tasks", label: "Page: Compliance Tasks" },
  { key: "page_documents", label: "Page: Documents" },
  { key: "page_assets", label: "Page: Asset Register" },
  { key: "page_templates", label: "Page: Template Manager" },
  { key: "page_audit", label: "Page: Audit Trail" },
  { key: "action_field_submit", label: "Action: Submit Field Upload" },
  { key: "action_docs_upload", label: "Action: Upload Central Document" },
  { key: "action_asset_edit", label: "Action: Add/Edit Assets" },
  { key: "action_user_manage", label: "Action: Add/Disable Users" },
  { key: "action_template_manage", label: "Action: Manage Templates" },
  { key: "action_review_decide", label: "Action: Approve/Reject Reviews" },
];

const app = document.getElementById("app");
let state = null;
let session = loadSession();
let serverSync = false;
let activePage = "dashboard";
let fieldStoreId = "";
const fieldDrafts = {};
let dashboardFilters = {
  cityId: "all",
  storeId: "all",
  team: "all",
  status: "all",
};
const PAGE_ORDER = ["field", "documents", "dashboard", "tasks", "reviews", "users", "templates", "assets", "audit"];

bootstrap();

async function bootstrap() {
  state = normalizeState(await loadServerOrSeedState());
  ensureRecurringTasks();
  await saveState();
  render();
}

function normalizeState(input) {
  const data = structuredClone(input || seedState);
  if (!Array.isArray(data.users) || data.users.length === 0) {
    data.users = structuredClone(seedState.users);
  }
  if (!Array.isArray(data.cities) || data.cities.length === 0) {
    data.cities = structuredClone(seedState.cities);
  }
  if (!Array.isArray(data.stores) || data.stores.length === 0) {
    data.stores = structuredClone(seedState.stores);
  }
  if (!Array.isArray(data.templates) || data.templates.length === 0) {
    data.templates = structuredClone(seedState.templates);
  }
  if (!Array.isArray(data.documentTypes) || data.documentTypes.length === 0) {
    data.documentTypes = structuredClone(seedState.documentTypes);
  }
  if (!Array.isArray(data.assetTypes) || data.assetTypes.length === 0) {
    data.assetTypes = structuredClone(seedState.assetTypes);
  }
  data.templates = (data.templates || []).map((t) => ({
    category: t.category || inferCategory(t.name),
    subcategory: t.subcategory || "General",
    ...t,
  }));
  data.tasks = (data.tasks || []).map((t) => ({
    category: t.category || templateById(t.templateId)?.category || "other",
    subcategory: t.subcategory || templateById(t.templateId)?.subcategory || "General",
    itemNameSnapshot: t.itemNameSnapshot || templateById(t.templateId)?.name || "Unknown Task Item",
    ...t,
    evidence: Array.isArray(t.evidence) ? t.evidence : [],
    agendaNotes: t.agendaNotes || "",
    fieldMeta: t.fieldMeta || null,
    pendingReviewId: t.pendingReviewId || null,
    lastRejectionComment: t.lastRejectionComment || "",
  }));
  data.users = (data.users || []).map((u) => ({
    active: u.active !== false,
    email: u.email || `${normalizePhone(u.phone)}@example.local`,
    ...u,
  }));
  data.roleMeta = mergeRoleMeta(data.roleMeta);
  data.rolePermissions = mergeRolePermissions(data.rolePermissions, data.roleMeta);
  data.reviewQueue = (data.reviewQueue || []).map((r) => ({
    status: r.status || "under_review",
    adminComment: r.adminComment || "",
    itemNameSnapshot: r.itemNameSnapshot || templateById(r.templateId)?.name || "Unknown Task Item",
    ...r,
  }));
  data.auditLogs = Array.isArray(data.auditLogs) ? data.auditLogs : [];
  data.documents = data.documents || [];
  data.documentTypes = (data.documentTypes || []).map((x) => ({
    active: x.active !== false,
    description: x.description || "",
    ...x,
  }));
  data.assetTypes = (data.assetTypes || []).map((x) => ({
    active: x.active !== false,
    description: x.description || "",
    ...x,
  }));
  data.assets = data.assets || [];

  function templateById(id) {
    return data.templates.find((x) => x.id === id) || null;
  }

  return data;
}

function defaultRolePermissions() {
  return {
    admin: {
      page_dashboard: true,
      page_users: true,
      page_reviews: true,
      page_field: true,
      page_tasks: true,
      page_documents: true,
      page_assets: true,
      page_templates: true,
      page_audit: true,
      action_field_submit: true,
      action_docs_upload: true,
      action_asset_edit: true,
      action_user_manage: true,
      action_template_manage: true,
      action_review_decide: true,
    },
    maintenance: {
      page_dashboard: false,
      page_users: false,
      page_reviews: false,
      page_field: true,
      page_tasks: false,
      page_documents: false,
      page_assets: false,
      page_templates: false,
      page_audit: false,
      action_field_submit: true,
      action_docs_upload: false,
      action_asset_edit: false,
      action_user_manage: false,
      action_template_manage: false,
      action_review_decide: false,
    },
    auditor: {
      page_dashboard: false,
      page_users: false,
      page_reviews: false,
      page_field: true,
      page_tasks: false,
      page_documents: false,
      page_assets: false,
      page_templates: false,
      page_audit: false,
      action_field_submit: true,
      action_docs_upload: false,
      action_asset_edit: false,
      action_user_manage: false,
      action_template_manage: false,
      action_review_decide: false,
    },
    accounts: {
      page_dashboard: true,
      page_users: false,
      page_reviews: false,
      page_field: false,
      page_tasks: false,
      page_documents: true,
      page_assets: false,
      page_templates: false,
      page_audit: false,
      action_field_submit: false,
      action_docs_upload: true,
      action_asset_edit: false,
      action_user_manage: false,
      action_template_manage: false,
      action_review_decide: false,
    },
    manager: {
      page_dashboard: true,
      page_users: false,
      page_reviews: false,
      page_field: false,
      page_tasks: false,
      page_documents: true,
      page_assets: false,
      page_templates: false,
      page_audit: false,
      action_field_submit: false,
      action_docs_upload: true,
      action_asset_edit: false,
      action_user_manage: false,
      action_template_manage: false,
      action_review_decide: false,
    },
    compliance: {
      page_dashboard: true,
      page_users: false,
      page_reviews: false,
      page_field: false,
      page_tasks: false,
      page_documents: true,
      page_assets: false,
      page_templates: false,
      page_audit: false,
      action_field_submit: false,
      action_docs_upload: true,
      action_asset_edit: false,
      action_user_manage: false,
      action_template_manage: false,
      action_review_decide: false,
    },
  };
}

function mergeRoleMeta(custom) {
  const merged = structuredClone(DEFAULT_ROLE_META);
  for (const [roleKey, roleData] of Object.entries(custom || {})) {
    if (!roleKey) continue;
    merged[roleKey] = {
      name: roleData?.name || roleKey,
      description: roleData?.description || "",
      ...(merged[roleKey] || {}),
      ...(roleData || {}),
    };
  }
  return merged;
}

function getRoleKeys() {
  return Object.keys(state?.roleMeta || DEFAULT_ROLE_META);
}

function mergeRolePermissions(custom, roleMeta) {
  const defaults = defaultRolePermissions();
  const merged = {};
  const roles = Object.keys(roleMeta || DEFAULT_ROLE_META);
  for (const role of roles) {
    const defaultForRole = defaults[role] || Object.fromEntries(PERMISSION_DEFS.map((p) => [p.key, false]));
    merged[role] = {
      ...defaultForRole,
      ...((custom && custom[role]) || {}),
    };
  }
  return merged;
}

function inferCategory(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("lpg") || n.includes("gas")) return "gas_safety";
  if (n.includes("electrical") || n.includes("rccb") || n.includes("mcb")) return "electrical_safety";
  if (n.includes("noc") || n.includes("license")) return "licensing";
  if (n.includes("alarm") || n.includes("extinguisher") || n.includes("fire")) return "fire_system";
  if (n.includes("training")) return "training";
  return "other";
}

async function loadServerOrSeedState() {
  try {
    const res = await fetch(API_STATE, { cache: "no-store" });
    if (res.status === 404) {
      serverSync = true;
      return structuredClone(seedState);
    }
    if (res.ok) {
      const remote = await res.json();
      if (remote && remote.users && remote.templates) return (serverSync = true), remote;
      if (remote && remote.status === "empty") {
        serverSync = true;
        return structuredClone(seedState);
      }
    }
  } catch {
    serverSync = false;
  }

  const local = localStorage.getItem(LOCAL_STATE_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return structuredClone(seedState);
    }
  }
  return structuredClone(seedState);
}

function loadSession() {
  const raw = localStorage.getItem(LOCAL_SESSION_KEY);
  if (!raw) return { userId: null, otpPhone: null, otpCode: null };
  try {
    return JSON.parse(raw);
  } catch {
    return { userId: null, otpPhone: null, otpCode: null };
  }
}

function saveSession() {
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
}

async function saveState() {
  localStorage.setItem(LOCAL_STATE_KEY, JSON.stringify(state));
  if (!serverSync) return;
  try {
    await fetch(API_STATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
  } catch {
    // local fallback preserved
  }
}

function dateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function hasAll(scope) {
  return Array.isArray(scope) && scope.includes("all");
}

function getCurrentUser() {
  return state.users.find((u) => u.id === session.userId && u.active !== false) || null;
}

function hasPermission(role, permissionKey) {
  return Boolean(state?.rolePermissions?.[role]?.[permissionKey]);
}

function getAllowedPagesForRole(role) {
  return PAGE_ORDER.filter((page) => hasPermission(role, `page_${page}`));
}

function getActiveDocumentTypes() {
  return (state.documentTypes || []).filter((x) => x.active);
}

function getActiveAssetTypes() {
  return (state.assetTypes || []).filter((x) => x.active);
}

function normalizePhone(raw) {
  const digits = String(raw || "").replace(/\D/g, "");
  if (digits.length <= 10) return digits;
  return digits.slice(-10);
}

function storesForUser(user) {
  if (!user || user.active === false) return [];
  let scoped = state.stores;
  if (!hasAll(user.cityIds)) scoped = scoped.filter((s) => user.cityIds.includes(s.cityId));
  if (!hasAll(user.storeIds)) scoped = scoped.filter((s) => user.storeIds.includes(s.id));
  return scoped;
}

function canAccessStore(user, storeId) {
  return storesForUser(user).some((s) => s.id === storeId);
}

function templateAppliesToStore(template, store) {
  if (template.scope === "all") return true;
  if ((template.scope || "").startsWith("city:")) return template.scope.slice(5) === store.cityId;
  if ((template.scope || "").startsWith("store:")) return template.scope.slice(6) === store.id;
  return true;
}

function ensureRecurringTasks() {
  for (const tpl of state.templates.filter((x) => x.active)) {
    for (const store of state.stores) {
      if (!templateAppliesToStore(tpl, store)) continue;
      const tasks = state.tasks
        .filter((t) => t.templateId === tpl.id && t.storeId === store.id)
        .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1));

      if (tasks.length === 0) {
        state.tasks.push(createTask(tpl, store.id, dateOffset(0)));
        continue;
      }
      if (tpl.frequencyType === "one_time") continue;

      const last = tasks[tasks.length - 1];
      if (last.status !== "completed") continue;

      const next = new Date(last.dueDate);
      next.setDate(next.getDate() + Number(tpl.frequencyValue || 0));
      const nextDue = next.toISOString().slice(0, 10);
      if (nextDue <= new Date().toISOString().slice(0, 10) && !tasks.find((t) => t.dueDate === nextDue)) {
        state.tasks.push(createTask(tpl, store.id, nextDue));
      }
    }
  }
}

function createTask(template, storeId, dueDate) {
  return {
    id: uid("task"),
    templateId: template.id,
    itemNameSnapshot: template.name,
    storeId,
    dueDate,
    status: "pending",
    assignedTeam: template.team,
    category: template.category || "other",
    subcategory: template.subcategory || "General",
    submittedAt: null,
    submittedBy: null,
    agendaNotes: "",
    fieldMeta: null,
    pendingReviewId: null,
    lastRejectionComment: "",
    evidence: [],
  };
}

function formatStore(storeId) {
  const s = state.stores.find((x) => x.id === storeId);
  if (!s) return "Unknown";
  const c = state.cities.find((x) => x.id === s.cityId);
  return `${s.code} - ${s.name}${c ? ` (${c.name})` : ""}`;
}

function formatUser(userId) {
  const u = state.users.find((x) => x.id === userId);
  return u ? u.name : "-";
}

function getUserEmail(userId) {
  const u = state.users.find((x) => x.id === userId);
  return u?.email || "-";
}

function teamLabel(team) {
  return state?.roleMeta?.[team]?.name || team;
}

function addAuditLog(actorUser, actionType, entityType, entityId, details = {}) {
  const actor = actorUser || getCurrentUser();
  state.auditLogs.push({
    id: uid("log"),
    actionType,
    entityType,
    entityId: entityId || null,
    actorUserId: actor?.id || null,
    actorName: actor?.name || "System",
    actorEmail: actor?.email || "system@local",
    details,
    createdAt: new Date().toISOString(),
  });
}

function escapeHtml(input) {
  return String(input || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function canInlinePreview(mimeType) {
  const mime = String(mimeType || "").toLowerCase();
  return mime.startsWith("image/") || mime.startsWith("video/") || mime.startsWith("audio/") || mime === "application/pdf";
}

function renderEvidencePreview(evidence) {
  if (!Array.isArray(evidence) || evidence.length === 0) {
    return `<p class="help">No files attached.</p>`;
  }

  return evidence
    .map((file, index) => {
      const src = file.filePath || file.previewDataUrl || "";
      const mime = String(file.mimeType || "").toLowerCase();
      const safeName = escapeHtml(file.fileName || `file-${index + 1}`);
      if (!src) {
        return `<div class="help">File: ${safeName} (preview unavailable in this mode)</div>`;
      }
      if (mime.startsWith("image/")) {
        return `<div class="review-media"><div class="help">File: ${safeName}</div><img class="review-image" src="${src}" alt="${safeName}" /></div>`;
      }
      if (mime.startsWith("video/")) {
        return `<div class="review-media"><div class="help">File: ${safeName}</div><video class="review-video" src="${src}" controls playsinline></video></div>`;
      }
      if (mime.startsWith("audio/")) {
        return `<div class="review-media"><div class="help">File: ${safeName}</div><audio src="${src}" controls></audio></div>`;
      }
      if (mime === "application/pdf") {
        return `<div class="review-media"><div class="help">File: ${safeName}</div><iframe class="review-doc" src="${src}" title="${safeName}"></iframe></div>`;
      }
      return `<div class="help"><a href="${src}" target="_blank" rel="noreferrer">Open ${safeName}</a></div>`;
    })
    .join("");
}

function categoryLabel(category) {
  return {
    gas_safety: "Gas Safety",
    electrical_safety: "Electrical Safety",
    fire_system: "Fire System",
    licensing: "Licensing",
    training: "Training",
    other: "Other",
  }[category] || category;
}

function daysFromToday(dateIso) {
  const today = new Date();
  const d = new Date(dateIso);
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return Math.floor((d - today) / 86400000);
}

function daysLate(dueDate, submittedAt) {
  if (!submittedAt) return 0;
  const due = new Date(dueDate);
  due.setHours(23, 59, 59, 999);
  const submitted = new Date(submittedAt);
  const diff = submitted - due;
  if (diff <= 0) return 0;
  return Math.ceil(diff / 86400000);
}

function withinLastDays(isoDate, days) {
  if (!isoDate) return false;
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  return now - d <= days * 86400000;
}

function statusBadge(task) {
  if (task.status === "completed") return '<span class="badge ok">Completed</span>';
  if (task.status === "under_review") return '<span class="badge due">Under Review</span>';
  const d = daysFromToday(task.dueDate);
  if (d < 0) return '<span class="badge overdue">Overdue</span>';
  if (d <= 7) return '<span class="badge due">Due Soon</span>';
  return '<span class="badge ok">On Track</span>';
}

function render() {
  if (!state) return;
  const user = getCurrentUser();
  if (!user) return renderLogin();
  const allowedPages = getAllowedPagesForRole(user.role);
  if (!allowedPages.includes(activePage)) {
    activePage = allowedPages[0] || "dashboard";
  }
  renderApp(user);
}

function renderLogin() {
  app.innerHTML = `
    <main class="auth">
      <section class="card auth-card">
        <div class="section-title">Fire Compliance Portal</div>
        <p class="subtitle">Login with phone number and OTP</p>
        <form id="phoneForm" class="actions">
          <div style="width:100%">
            <label>Phone Number</label>
            <input name="phone" maxlength="10" placeholder="Enter 10 digit phone" required />
          </div>
          <button class="primary" type="submit">Send OTP</button>
        </form>
        <form id="otpForm" class="actions" style="margin-top:8px">
          <div style="width:100%">
            <label>OTP</label>
            <input name="otp" maxlength="6" placeholder="Enter OTP" required ${session.otpCode ? "" : "disabled"} />
          </div>
          <button class="secondary" type="submit" ${session.otpCode ? "" : "disabled"}>Verify</button>
        </form>
        <p class="help">Demo users: 9999999990 Admin, 9999999991 Maintenance, 9999999992 Accounts, 9999999993 Manager, 9999999994 Compliance, 9999999995 Auditor</p>
        ${session.otpCode ? `<p class="help">Demo OTP for ${session.otpPhone}: <strong>${session.otpCode}</strong></p>` : ""}
        <p class="help">Sync mode: ${serverSync ? "Central server connected" : "Local-only fallback"}</p>
      </section>
    </main>
  `;

  document.getElementById("phoneForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = normalizePhone(new FormData(e.currentTarget).get("phone"));
    const user = state.users.find((u) => normalizePhone(u.phone) === phone && u.active !== false);
    if (!user) return alert("Phone not found.");
    session.otpPhone = normalizePhone(user.phone);
    session.otpCode = String(Math.floor(100000 + Math.random() * 900000));
    saveSession();
    render();
  });

  document.getElementById("otpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const otp = String(new FormData(e.currentTarget).get("otp") || "").trim();
    if (otp !== session.otpCode) return alert("Invalid OTP");
    const user = state.users.find((u) => normalizePhone(u.phone) === normalizePhone(session.otpPhone));
    if (!user) return alert("User not found");
    session.userId = user.id;
    session.otpCode = null;
    session.otpPhone = null;
    saveSession();
    render();
  });
}

function renderApp(user) {
  const allowedPages = getAllowedPagesForRole(user.role);
  const navMap = {
    field: "Field Work (Mobile)",
    documents: "Central Documents",
    dashboard: "Dashboard",
    users: "User Management",
    reviews: "Admin Reviews",
    tasks: "Compliance Tasks",
    assets: "Asset Register",
    templates: "Template Manager",
    audit: "Audit Trail",
  };

  app.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">Fire Compliance Portal</div>
        <p class="brand-sub">Centralized safety, audits and records</p>
        ${allowedPages.map((p) => `<button class="nav-btn ${p === activePage ? "active" : ""}" data-page="${p}">${navMap[p]}</button>`).join("")}
        <div class="sidebar-foot">
          <div><strong>${user.name}</strong></div>
          <div>${teamLabel(user.role)}</div>
          <div>${serverSync ? "Central Sync: ON" : "Central Sync: OFF"}</div>
          <button class="signout" id="signOutBtn">Sign out</button>
        </div>
      </aside>
      <main class="main" id="pageRoot"></main>
    </div>
  `;

  document.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activePage = btn.dataset.page;
      render();
    });
  });

  document.getElementById("signOutBtn").addEventListener("click", () => {
    session.userId = null;
    saveSession();
    render();
  });

  const root = document.getElementById("pageRoot");
  if (activePage === "dashboard") root.innerHTML = dashboardHTML(user);
  if (activePage === "users") root.innerHTML = usersHTML(user);
  if (activePage === "reviews") root.innerHTML = reviewsHTML(user);
  if (activePage === "field") root.innerHTML = fieldHTML(user);
  if (activePage === "tasks") root.innerHTML = tasksHTML(user);
  if (activePage === "documents") root.innerHTML = documentsHTML(user);
  if (activePage === "assets") root.innerHTML = assetsHTML(user);
  if (activePage === "templates") root.innerHTML = templatesHTML(user);
  if (activePage === "audit") root.innerHTML = auditHTML(user);
  wireEvents(user);
}

function dashboardHTML(user) {
  const scopedStores = storesForUser(user);
  const scopedStoreIds = scopedStores.map((s) => s.id);
  let filteredStoreIds = scopedStoreIds;
  if (dashboardFilters.cityId !== "all") {
    filteredStoreIds = filteredStoreIds.filter((sid) => state.stores.find((s) => s.id === sid)?.cityId === dashboardFilters.cityId);
  }
  if (dashboardFilters.storeId !== "all") {
    filteredStoreIds = filteredStoreIds.filter((sid) => sid === dashboardFilters.storeId);
  }

  let scopedTasks = state.tasks.filter((t) => filteredStoreIds.includes(t.storeId));
  if (dashboardFilters.team !== "all") {
    scopedTasks = scopedTasks.filter((t) => t.assignedTeam === dashboardFilters.team);
  }
  if (dashboardFilters.status !== "all") {
    scopedTasks = scopedTasks.filter((t) => t.status === dashboardFilters.status);
  }

  const pending = scopedTasks.filter((t) => t.status === "pending");
  const underReview = scopedTasks.filter((t) => t.status === "under_review");
  const overdue = pending.filter((t) => daysFromToday(t.dueDate) < 0);
  const dueSoon = pending.filter((t) => {
    const d = daysFromToday(t.dueDate);
    return d >= 0 && d <= 30;
  });
  const expiringDocs = state.documents.filter((d) => filteredStoreIds.includes(d.storeId) && d.expiryDate && daysFromToday(d.expiryDate) <= 60);
  const criticalAssets = state.assets.filter((a) => filteredStoreIds.includes(a.storeId) && a.workingStatus !== "working");

  const completedLast7 = scopedTasks.filter((t) => t.status === "completed" && withinLastDays(t.submittedAt, 7));
  const categoryMap = {};
  for (const t of completedLast7) {
    const key = `${t.category || "other"}::${t.subcategory || "General"}`;
    categoryMap[key] = (categoryMap[key] || 0) + 1;
  }
  const categoryRows = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => {
      const [cat, subcat] = key.split("::");
      return `<tr><td>${categoryLabel(cat)}</td><td>${subcat}</td><td>${count}</td></tr>`;
    })
    .join("");

  const efficiencyUsers = state.users.filter((u) => ["auditor", "maintenance"].includes(u.role));
  const efficiencyRows = efficiencyUsers
    .map((u) => {
      const completed = scopedTasks.filter((t) => t.status === "completed" && t.submittedBy === u.id && withinLastDays(t.submittedAt, 30));
      const total = completed.length;
      const onTime = completed.filter((t) => daysLate(t.dueDate, t.submittedAt) === 0).length;
      const lateDaysTotal = completed.reduce((sum, t) => sum + daysLate(t.dueDate, t.submittedAt), 0);
      const onTimePct = total ? Math.round((onTime / total) * 100) : 0;
      const avgDelay = total ? (lateDaysTotal / total).toFixed(1) : "0.0";
      return `<tr><td>${u.name}</td><td>${teamLabel(u.role)}</td><td>${total}</td><td>${onTimePct}%</td><td>${avgDelay}</td></tr>`;
    })
    .join("");

  const rows = scopedTasks
    .filter((t) => t.status !== "completed")
    .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
    .slice(0, 8)
    .map((t) => {
      const tpl = state.templates.find((x) => x.id === t.templateId);
      return `<tr><td>${tpl ? tpl.name : escapeHtml(t.itemNameSnapshot || "Unknown")}</td><td>${formatStore(t.storeId)}</td><td>${teamLabel(t.assignedTeam)}</td><td>${t.dueDate}</td><td>${statusBadge(t)}</td></tr>`;
    })
    .join("");

  return `
    <header class="page-header"><div><h1 class="header-title">Dashboard</h1><p class="subtitle">Central status by store, subcategory and team efficiency</p></div></header>
    <section class="card" style="margin-bottom:12px">
      <div class="section-title">Report Filters</div>
      <form id="dashboardFilterForm" class="form-grid three">
        <div><label>City</label><select name="cityId"><option value="all">All Cities</option>${state.cities
          .filter((c) => scopedStores.some((s) => s.cityId === c.id))
          .map((c) => `<option value="${c.id}" ${dashboardFilters.cityId === c.id ? "selected" : ""}>${c.name}</option>`)
          .join("")}</select></div>
        <div><label>Store</label><select name="storeId"><option value="all">All Stores</option>${scopedStores
          .filter((s) => dashboardFilters.cityId === "all" || s.cityId === dashboardFilters.cityId)
          .map((s) => `<option value="${s.id}" ${dashboardFilters.storeId === s.id ? "selected" : ""}>${formatStore(s.id)}</option>`)
          .join("")}</select></div>
        <div><label>Team</label><select name="team"><option value="all">All Teams</option>${getRoleKeys()
          .map((r) => `<option value="${r}" ${dashboardFilters.team === r ? "selected" : ""}>${teamLabel(r)}</option>`)
          .join("")}</select></div>
        <div><label>Status</label><select name="status"><option value="all">All Status</option><option value="pending" ${dashboardFilters.status === "pending" ? "selected" : ""}>Pending</option><option value="under_review" ${dashboardFilters.status === "under_review" ? "selected" : ""}>Under Review</option><option value="completed" ${dashboardFilters.status === "completed" ? "selected" : ""}>Completed</option></select></div>
        <div class="actions" style="grid-column:1/-1"><button class="secondary" type="button" id="dashboardFilterReset">Reset Filters</button></div>
      </form>
    </section>
    <section class="grid kpi">
      <article class="card"><div>Assigned Stores</div><div class="kpi-num">${filteredStoreIds.length}</div></article>
      <article class="card"><div>Pending</div><div class="kpi-num">${pending.length}</div><div class="kpi-note">${overdue.length} overdue</div></article>
      <article class="card"><div>Due in 30 Days</div><div class="kpi-num">${dueSoon.length}</div><div class="kpi-note">Under Review: ${underReview.length}</div></article>
      <article class="card"><div>Expiring Docs</div><div class="kpi-num">${expiringDocs.length}</div><div class="kpi-note">Critical Assets: ${criticalAssets.length}</div></article>
    </section>
    <section class="card" style="margin-top:12px">
      <div class="section-title">Last 7 Days</div>
      <p class="help">Completed items: ${completedLast7.length} | Review queue pending: ${state.reviewQueue.filter((r) => r.status === "under_review").length}</p>
    </section>

    <section class="card" style="margin-top:12px">
      <div class="section-title">Upcoming / Overdue Tasks</div>
      <div class="table-wrap"><table><thead><tr><th>Item</th><th>Store</th><th>Team</th><th>Due</th><th>Status</th></tr></thead><tbody>${rows || '<tr><td colspan="5">No pending tasks.</td></tr>'}</tbody></table></div>
    </section>

    <section class="card" style="margin-top:12px">
      <div class="section-title">Work Done in Last 7 Days (Subcategory)</div>
      <div class="table-wrap"><table><thead><tr><th>Category</th><th>Subcategory</th><th>Completed Count</th></tr></thead><tbody>${categoryRows || '<tr><td colspan="3">No completed items in last 7 days.</td></tr>'}</tbody></table></div>
    </section>

    <section class="card" style="margin-top:12px">
      <div class="section-title">Auditor & Maintenance Efficiency (Last 30 Days)</div>
      <div class="table-wrap"><table><thead><tr><th>Agent</th><th>Role</th><th>Tasks Closed</th><th>On-Time %</th><th>Avg Delay (days)</th></tr></thead><tbody>${efficiencyRows || '<tr><td colspan="5">No efficiency data yet.</td></tr>'}</tbody></table></div>
    </section>
  `;
}

function usersHTML(user) {
  if (!hasPermission(user.role, "action_user_manage")) {
    return `<section class="card">You do not have permission to manage users.</section>`;
  }

  const rows = state.users
    .map((u) => {
      const cityScope = hasAll(u.cityIds) ? "All Cities" : (u.cityIds || []).map((id) => state.cities.find((c) => c.id === id)?.name || id).join(", ");
      const storeScope = hasAll(u.storeIds) ? "All Stores" : (u.storeIds || []).map((id) => state.stores.find((s) => s.id === id)?.code || id).join(", ");
      return `<tr>
        <td>${escapeHtml(u.name)}</td>
        <td>${escapeHtml(u.email || "-")}</td>
        <td>${normalizePhone(u.phone)}</td>
        <td>${teamLabel(u.role)}</td>
        <td>${escapeHtml(cityScope || "-")}</td>
        <td>${escapeHtml(storeScope || "-")}</td>
        <td>${u.active === false ? '<span class="badge overdue">Inactive</span>' : '<span class="badge ok">Active</span>'}</td>
        <td>${u.id === user.id ? "-" : `<button class="secondary" data-toggle-user="${u.id}">${u.active === false ? "Activate" : "Deactivate"}</button>`}</td>
      </tr>`;
    })
    .join("");
  const permissionRows = getRoleKeys()
    .map((role) => {
      const cols = PERMISSION_DEFS.map((perm) => {
        const checked = hasPermission(role, perm.key) ? "checked" : "";
        return `<td><input type="checkbox" name="${role}__${perm.key}" ${checked} /></td>`;
      }).join("");
      return `<tr><td><strong>${teamLabel(role)}</strong></td>${cols}</tr>`;
    })
    .join("");
  const permissionHeaders = PERMISSION_DEFS.map((perm) => `<th>${perm.label}</th>`).join("");
  const roleTypeRows = getRoleKeys()
    .map((role) => {
      const meta = state.roleMeta?.[role] || { name: role, description: "" };
      const isDefault = Object.prototype.hasOwnProperty.call(DEFAULT_ROLE_META, role);
      return `<tr>
        <td><code>${role}</code></td>
        <td><input name="role-name-${role}" value="${escapeHtml(meta.name || role)}" /></td>
        <td><input name="role-desc-${role}" value="${escapeHtml(meta.description || "")}" /></td>
        <td>${isDefault ? "Default" : "Custom"}</td>
        <td><button type="button" class="secondary" data-save-role-meta="${role}">Save</button></td>
      </tr>`;
    })
    .join("");

  return `
    <header class="page-header">
      <div>
        <h1 class="header-title">User Management</h1>
        <p class="subtitle">Create user types and set authorization by city/store scope</p>
      </div>
    </header>

    <section class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>City Scope</th><th>Store Scope</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="8">No users found.</td></tr>'}</tbody>
        </table>
      </div>
    </section>

    <section class="card" style="margin-top:12px">
      <div class="section-title">Add User</div>
      <form id="userForm" class="form-grid three">
        <div><label>Name</label><input name="name" required placeholder="Employee name" /></div>
        <div><label>Email</label><input name="email" type="email" required placeholder="name@company.com" /></div>
        <div><label>Phone (10 digits)</label><input name="phone" required placeholder="9999999999" /></div>
          <div><label>Role</label><select name="role">
          ${getRoleKeys().map((role) => `<option value="${role}">${teamLabel(role)}</option>`).join("")}
        </select></div>
        <div><label>City Access</label><select name="cityIds" multiple size="5">${state.cities.map((c) => `<option value="${c.id}">${c.name}</option>`).join("")}</select></div>
        <div><label>Store Access</label><select name="storeIds" multiple size="5">${state.stores.map((s) => `<option value="${s.id}">${formatStore(s.id)}</option>`).join("")}</select></div>
        <div>
          <label>Scope Preset</label>
          <select name="scopePreset">
            <option value="all">All Cities + All Stores</option>
            <option value="custom">Use Selected City/Store</option>
          </select>
        </div>
        <div class="actions" style="grid-column:1/-1"><button class="primary" type="submit">Create User</button></div>
      </form>
      <p class="help">For custom scope, select city/store using Ctrl/Cmd click for multi-select.</p>
    </section>

    <section class="card" style="margin-top:12px">
      <div class="section-title">Role Permission Settings (Configurable)</div>
      <form id="permissionForm">
        <div class="table-wrap">
          <table>
            <thead><tr><th>Role</th>${permissionHeaders}</tr></thead>
            <tbody>${permissionRows}</tbody>
          </table>
        </div>
        <div class="actions">
          <button class="primary" type="submit">Save Permission Matrix</button>
        </div>
      </form>
      <p class="help">These settings control page access and action rights from frontend without code changes.</p>
    </section>

    <section class="card" style="margin-top:12px">
      <div class="section-title">User Type Definitions</div>
      <form id="roleTypeForm" class="form-grid three">
        <div><label>Role Key (id)</label><input name="roleKey" placeholder="e.g. city_auditor" /></div>
        <div><label>Role Name</label><input name="roleName" required placeholder="e.g. City Auditor" /></div>
        <div><label>Description</label><input name="roleDescription" placeholder="What this user type does" /></div>
        <div class="actions" style="grid-column:1/-1"><button class="primary" type="submit">Create User Type</button></div>
      </form>
      <div class="table-wrap" style="margin-top:10px">
        <table>
          <thead><tr><th>Role Key</th><th>Display Name</th><th>Description</th><th>Type</th><th>Action</th></tr></thead>
          <tbody>${roleTypeRows}</tbody>
        </table>
      </div>
      <p class="help">When a new user type is created, permission defaults are OFF. Enable required rights in the matrix above.</p>
    </section>
  `;
}

function reviewsHTML(user) {
  if (!hasPermission(user.role, "action_review_decide")) {
    return `<section class="card">You do not have permission to review submissions.</section>`;
  }

  const queue = state.reviewQueue
    .filter((r) => r.status === "under_review")
    .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
  const rejectedQueue = state.reviewQueue
    .filter((r) => r.status === "rejected")
    .sort((a, b) => (a.reviewedAt < b.reviewedAt ? 1 : -1));

  const cards = queue
    .map((r) => {
      const task = state.tasks.find((t) => t.id === r.taskId);
      const tpl = state.templates.find((t) => t.id === r.templateId);
      if (!task) return "";
      const files = (r.evidence || []).map((e) => e.fileName).join(", ") || "-";
      const meta = r.fieldMeta?.geo
        ? `${r.fieldMeta.geo.lat.toFixed(5)}, ${r.fieldMeta.geo.lng.toFixed(5)}`
        : "Location unavailable";
      const previewHtml = renderEvidencePreview(r.evidence || []);
      return `
        <article class="card" style="margin-bottom:10px">
          <div class="section-title">${tpl ? tpl.name : escapeHtml(r.itemNameSnapshot || "Unknown Task Item")}</div>
          <p class="help">Store: ${formatStore(r.storeId)} | Submitted by: ${formatUser(r.submittedBy)} | Submitted at: ${r.submittedAt?.slice(0, 16).replace("T", " ") || "-"}</p>
          <p class="help">Files: ${escapeHtml(files)}</p>
          <div style="margin-top:8px">${previewHtml}</div>
          <p class="help">Field metadata: ${meta}</p>
          <p class="help">Notes: ${escapeHtml(r.agendaNotes || "-")}</p>
          <div style="margin-top:8px">
            <label for="reject-comment-${r.id}">Rejection Comment (minimum 100 words)</label>
            <textarea id="reject-comment-${r.id}" rows="4" placeholder="Describe quality gaps in detail..."></textarea>
          </div>
          <div class="actions">
            <button class="primary" data-approve-review="${r.id}">Approve</button>
            <button class="secondary" data-reject-review="${r.id}">Reject</button>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <header class="page-header">
      <div>
        <h1 class="header-title">Admin Review Queue</h1>
        <p class="subtitle">Only approved submissions move into main records and close tasks</p>
      </div>
    </header>
    <section>${cards || '<article class="card">No submissions are waiting for review.</article>'}</section>
    <section class="card" style="margin-top:12px">
      <div class="section-title">Rejected Submissions (Temporary Queue)</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Task</th><th>Store</th><th>Submitted By</th><th>Rejected On</th><th>Comment</th></tr></thead>
          <tbody>
            ${rejectedQueue
              .map((r) => {
                const tpl = state.templates.find((t) => t.id === r.templateId);
                return `<tr><td>${tpl ? tpl.name : escapeHtml(r.itemNameSnapshot || "Unknown")}</td><td>${formatStore(r.storeId)}</td><td>${formatUser(r.submittedBy)}</td><td>${r.reviewedAt ? r.reviewedAt.slice(0, 16).replace("T", " ") : "-"}</td><td>${escapeHtml(r.adminComment || "-")}</td></tr>`;
              })
              .join("") || '<tr><td colspan="5">No rejected items in temporary queue.</td></tr>'}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function fieldHTML(user) {
  const stores = storesForUser(user);
  if (!fieldStoreId && stores.length) fieldStoreId = stores[0].id;

  let pending = state.tasks.filter((t) => t.status === "pending" && t.storeId === fieldStoreId);
  if (user.role === "maintenance") pending = pending.filter((t) => t.assignedTeam === "maintenance");
  if (user.role === "compliance") pending = pending.filter((t) => t.assignedTeam === "compliance");
  if (user.role === "auditor") pending = pending.filter((t) => ["maintenance", "compliance"].includes(t.assignedTeam));

  const cards = pending
    .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
    .map((t) => {
      const tpl = state.templates.find((x) => x.id === t.templateId);
      return `
        <article class="card" style="margin-bottom:10px">
          <div class="row" style="justify-content:space-between;align-items:center">
            <div>
              <div style="font-weight:700">${tpl ? tpl.name : escapeHtml(t.itemNameSnapshot || "Unknown Item")}</div>
              <div class="help">Due: ${t.dueDate} | Team: ${teamLabel(t.assignedTeam)} | ${categoryLabel(t.category)} / ${t.subcategory}</div>
              ${t.lastRejectionComment ? `<div class="help" style="color:#b42318">Last rejection comment: ${escapeHtml(t.lastRejectionComment)}</div>` : ""}
            </div>
            <div>${statusBadge(t)}</div>
          </div>

          <div class="live-box" style="margin-top:10px">
            <div class="live-title">Live Video Capture (Back Camera)</div>
            <video id="live-preview-${t.id}" class="live-preview" playsinline muted></video>
            <div id="live-meta-${t.id}" class="help">No live recording captured yet.</div>
            <div class="actions">
              <button type="button" class="secondary" data-live-start="${t.id}">Start Live Video</button>
              <button type="button" class="secondary" data-live-stop="${t.id}">Stop</button>
              <button type="button" class="secondary" data-live-clear="${t.id}">Clear</button>
            </div>
          </div>

          <div style="margin-top:10px">
            <label>Field Notes / Description</label>
            <textarea id="field-note-${t.id}" rows="2" placeholder="Observed condition, issue details, action taken"></textarea>
          </div>
          <div class="form-grid" style="margin-top:8px">
            <div>
              <label>Upload Additional Photo/Video/Document</label>
              <input id="field-file-${t.id}" type="file" multiple accept="image/*,video/*,.pdf,.doc,.docx" />
            </div>
            <div>
              <label>Upload Audio Note (optional)</label>
              <input id="field-audio-${t.id}" type="file" accept="audio/*" />
            </div>
          </div>
          <div class="actions">
            <button class="primary" data-field-submit="${t.id}">Submit from Store</button>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <header class="page-header">
      <div>
        <h1 class="header-title">Field Work</h1>
        <p class="subtitle">Mobile field page for pending outlet items with live geo/time stamped recording</p>
      </div>
    </header>
    <section class="card">
      <form id="fieldStoreForm" class="form-grid">
        <div>
          <label>Select Outlet</label>
          <select name="storeId">${stores.map((s) => `<option value="${s.id}" ${s.id === fieldStoreId ? "selected" : ""}>${formatStore(s.id)}</option>`).join("")}</select>
        </div>
      </form>
      <p class="help">Only pending items for selected outlet are shown below.</p>
    </section>
    <section style="margin-top:12px">${cards || '<article class="card">No pending items for this outlet.</article>'}</section>
  `;
}

function tasksHTML(user) {
  const storeIds = storesForUser(user).map((s) => s.id);
  let tasks = state.tasks.filter((t) => storeIds.includes(t.storeId));
  if (user.role === "maintenance") tasks = tasks.filter((t) => t.assignedTeam === "maintenance");
  if (user.role === "compliance") tasks = tasks.filter((t) => t.assignedTeam === "compliance");
  if (user.role === "auditor") tasks = tasks.filter((t) => ["maintenance", "compliance"].includes(t.assignedTeam));
  if (user.role === "manager" || user.role === "accounts") tasks = tasks.filter((t) => t.status === "completed");

  const rows = tasks
    .sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))
    .slice(0, 300)
    .map((t) => {
      const tpl = state.templates.find((x) => x.id === t.templateId);
      const files = t.evidence.length ? t.evidence.map((e) => e.fileName).join(", ") : "-";
      const meta = t.fieldMeta?.geo ? `${t.fieldMeta.geo.lat.toFixed(5)}, ${t.fieldMeta.geo.lng.toFixed(5)}` : "-";
      return `<tr><td>${tpl ? tpl.name : escapeHtml(t.itemNameSnapshot || "Unknown")}</td><td>${formatStore(t.storeId)}</td><td>${categoryLabel(t.category)} / ${t.subcategory}</td><td>${t.dueDate}</td><td>${statusBadge(t)}</td><td>${files}</td><td>${meta}</td><td>${t.submittedAt ? `${t.submittedAt.slice(0, 16).replace("T", " ")} by ${formatUser(t.submittedBy)}` : "-"}</td></tr>`;
    })
    .join("");

  return `
    <header class="page-header"><div><h1 class="header-title">Compliance Tasks</h1><p class="subtitle">All submissions synced from field and web users</p></div><button class="primary" id="regenTasksBtn">Generate Due Tasks</button></header>
    <section class="card"><div class="table-wrap"><table><thead><tr><th>Item</th><th>Store</th><th>Category</th><th>Due</th><th>Status</th><th>Evidence</th><th>Location</th><th>Submitted</th></tr></thead><tbody>${rows || '<tr><td colspan="8">No tasks found.</td></tr>'}</tbody></table></div></section>
  `;
}

function documentsHTML(user) {
  const stores = storesForUser(user);
  const storeIds = stores.map((s) => s.id);
  const docs = state.documents.filter((d) => storeIds.includes(d.storeId));

  const rows = docs
    .map((d) => {
      const diff = d.expiryDate ? daysFromToday(d.expiryDate) : null;
      let tag = '<span class="badge ok">No Expiry</span>';
      if (diff !== null) tag = diff < 0 ? '<span class="badge overdue">Expired</span>' : diff <= 60 ? '<span class="badge due">Expiring</span>' : '<span class="badge ok">Active</span>';
      return `<tr><td>${d.docType}</td><td>${formatStore(d.storeId)}</td><td>${teamLabel(d.ownerTeam)}</td><td>${d.expiryDate || "-"}</td><td>${tag}</td><td>${d.fileName || "-"}</td><td>${d.uploadedAt ? d.uploadedAt.slice(0, 10) : "-"}</td></tr>`;
    })
    .join("");

  const canAdd = hasPermission(user.role, "action_docs_upload");
  const docTypeOptions = getActiveDocumentTypes();
  return `
    <header class="page-header"><div><h1 class="header-title">Documents</h1><p class="subtitle">Licenses, reports and bills</p></div></header>
    <section class="card"><div class="table-wrap"><table><thead><tr><th>Type</th><th>Store</th><th>Owner</th><th>Expiry</th><th>Status</th><th>File</th><th>Uploaded</th></tr></thead><tbody>${rows || '<tr><td colspan="7">No documents yet.</td></tr>'}</tbody></table></div></section>
    ${canAdd ? `
      <section class="card" style="margin-top:12px">
        <div class="section-title">Add Document</div>
        <form id="docForm" class="form-grid three">
          <div><label>Document Type</label><select name="docType" required>${docTypeOptions.map((d) => `<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)}</option>`).join("")}</select></div>
          <div><label>Store</label><select name="storeId">${stores.map((s) => `<option value="${s.id}">${formatStore(s.id)}</option>`).join("")}</select></div>
          <div><label>Owner Team</label><select name="ownerTeam">${getRoleKeys().map((x) => `<option value="${x}">${teamLabel(x)}</option>`).join("")}</select></div>
          <div><label>Expiry Date</label><input name="expiryDate" type="date" /></div>
          <div><label>File</label><input name="file" type="file" required /></div>
          <div class="actions" style="grid-column:1/-1"><button class="primary" type="submit">Save Document</button></div>
        </form>
      </section>
    ` : ""}
  `;
}

function assetsHTML(user) {
  const stores = storesForUser(user);
  const storeIds = stores.map((s) => s.id);
  const rows = state.assets
    .filter((a) => storeIds.includes(a.storeId))
    .map((a) => `<tr><td>${a.type}</td><td>${a.itemName}</td><td>${formatStore(a.storeId)}</td><td>${a.serialNo || "-"}</td><td>${a.count || "-"}</td><td>${a.fillStatus || "-"}</td><td>${a.workingStatus || "-"}</td><td>${a.lastCheckedOn || "-"}</td><td>${a.nextDueOn || "-"}</td></tr>`)
    .join("");

  const canEdit = hasPermission(user.role, "action_asset_edit");
  const assetTypeOptions = getActiveAssetTypes();
  return `
    <header class="page-header"><div><h1 class="header-title">Asset Register</h1><p class="subtitle">Extinguishers, detectors, electrical and gas assets</p></div></header>
    <section class="card"><div class="table-wrap"><table><thead><tr><th>Type</th><th>Item</th><th>Store</th><th>Serial</th><th>Count</th><th>Fill</th><th>Working</th><th>Last Check</th><th>Next Due</th></tr></thead><tbody>${rows || '<tr><td colspan="9">No assets yet.</td></tr>'}</tbody></table></div></section>
    ${canEdit ? `
      <section class="card" style="margin-top:12px">
        <div class="section-title">Add Asset</div>
        <form id="assetForm" class="form-grid three">
          <div><label>Asset Type</label><select name="type">${assetTypeOptions.map((a) => `<option value="${escapeHtml(a.name)}">${escapeHtml(a.name)}</option>`).join("")}</select></div>
          <div><label>Item Name</label><input name="itemName" required /></div>
          <div><label>Store</label><select name="storeId">${stores.map((s) => `<option value="${s.id}">${formatStore(s.id)}</option>`).join("")}</select></div>
          <div><label>Serial No</label><input name="serialNo" /></div>
          <div><label>Location</label><input name="location" /></div>
          <div><label>Count</label><input name="count" type="number" min="1" value="1" /></div>
          <div><label>Fill Status</label><select name="fillStatus"><option>filled</option><option>not_filled</option><option>na</option></select></div>
          <div><label>Working Status</label><select name="workingStatus"><option>working</option><option>needs_service</option><option>not_working</option></select></div>
          <div><label>Last Checked On</label><input name="lastCheckedOn" type="date" /></div>
          <div><label>Next Due On</label><input name="nextDueOn" type="date" /></div>
          <div style="grid-column:1/-1"><label>Notes</label><textarea name="notes" rows="2"></textarea></div>
          <div class="actions" style="grid-column:1/-1"><button class="primary" type="submit">Save Asset</button></div>
        </form>
      </section>
    ` : ""}
  `;
}

function templatesHTML(user) {
  if (!hasPermission(user.role, "action_template_manage")) return `<section class="card">You do not have permission to manage templates.</section>`;
  const rows = state.templates
    .map(
      (t) =>
        `<tr><td>${escapeHtml(t.name)}</td><td>${categoryLabel(t.category)}</td><td>${escapeHtml(t.subcategory || "General")}</td><td>${teamLabel(t.team)}</td><td>${t.frequencyType === "one_time" ? "One-time" : `Every ${t.frequencyValue} days`}</td><td>${t.evidenceType}</td><td>${t.mandatory ? "Yes" : "No"}</td><td>${t.active ? "Active" : "Inactive"}</td><td><button class="secondary" data-edit-template="${t.id}">Edit</button> <button class="secondary" data-toggle-template="${t.id}">${t.active ? "Deactivate" : "Activate"}</button></td></tr>`
    )
    .join("");
  const docTypeRows = (state.documentTypes || [])
    .map(
      (d) =>
        `<tr><td>${escapeHtml(d.name)}</td><td>${escapeHtml(d.description || "-")}</td><td>${d.active ? "Active" : "Inactive"}</td><td><button class="secondary" data-edit-doc-type="${d.id}">Edit</button> <button class="secondary" data-toggle-doc-type="${d.id}">${d.active ? "Deactivate" : "Activate"}</button></td></tr>`
    )
    .join("");
  const assetTypeRows = (state.assetTypes || [])
    .map(
      (a) =>
        `<tr><td>${escapeHtml(a.name)}</td><td>${escapeHtml(a.description || "-")}</td><td>${a.active ? "Active" : "Inactive"}</td><td><button class="secondary" data-edit-asset-type="${a.id}">Edit</button> <button class="secondary" data-toggle-asset-type="${a.id}">${a.active ? "Deactivate" : "Activate"}</button></td></tr>`
    )
    .join("");

  return `
    <header class="page-header"><div><h1 class="header-title">Template Manager</h1><p class="subtitle">Add/remove and configure compliance items</p></div></header>
    <section class="card"><div class="table-wrap"><table><thead><tr><th>Item</th><th>Category</th><th>Subcategory</th><th>Team</th><th>Frequency</th><th>Evidence</th><th>Mandatory</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></section>
    <section class="card" style="margin-top:12px">
      <div class="section-title">Create / Edit Compliance Task Item Type</div>
      <form id="templateForm" class="form-grid three">
        <input type="hidden" name="templateId" />
        <div><label>Item Name</label><input name="name" required /></div>
        <div><label>Category</label><select name="category">${CATEGORY_OPTIONS.map((x) => `<option value="${x}">${categoryLabel(x)}</option>`).join("")}</select></div>
        <div><label>Subcategory</label><input name="subcategory" placeholder="e.g. LPG Detector" /></div>
        <div><label>Owner Team</label><select name="team">${getRoleKeys().map((x) => `<option value="${x}">${teamLabel(x)}</option>`).join("")}</select></div>
        <div><label>Frequency Type</label><select name="frequencyType" id="freqType"><option value="days">Every X days</option><option value="one_time">One-time</option></select></div>
        <div><label>Frequency Value</label><input name="frequencyValue" id="freqValue" type="number" min="1" value="90" /></div>
        <div><label>Evidence Type</label><select name="evidenceType"><option value="video">Video</option><option value="photo">Photo</option><option value="document">Document</option><option value="multiple">Multiple</option></select></div>
        <div><label>Mandatory</label><select name="mandatory"><option value="true">Yes</option><option value="false">No</option></select></div>
        <div><label>Scope</label><select name="scope"><option value="all">All Stores</option>${state.cities.map((c) => `<option value="city:${c.id}">City: ${c.name}</option>`).join("")}${state.stores.map((s) => `<option value="store:${s.id}">Store: ${formatStore(s.id)}</option>`).join("")}</select></div>
        <div><label>Alerts (days)</label><input name="alerts" placeholder="30,15,7" /></div>
        <div class="actions" style="grid-column:1/-1"><button class="primary" type="submit">Save Task Item Type</button><button class="secondary" type="button" id="templateFormReset">Reset</button></div>
      </form>
    </section>

    <section class="card" style="margin-top:12px">
      <div class="section-title">Document Types</div>
      <div class="table-wrap"><table><thead><tr><th>Name</th><th>Description</th><th>Status</th><th>Action</th></tr></thead><tbody>${docTypeRows || '<tr><td colspan="4">No document types.</td></tr>'}</tbody></table></div>
      <form id="docTypeForm" class="form-grid" style="margin-top:10px">
        <input type="hidden" name="docTypeId" />
        <div><label>Document Type Name</label><input name="name" required placeholder="e.g. Electrical Safety Certificate" /></div>
        <div><label>Description</label><input name="description" placeholder="Short description" /></div>
        <div class="actions" style="grid-column:1/-1"><button class="primary" type="submit">Save Document Type</button><button class="secondary" type="button" id="docTypeFormReset">Reset</button></div>
      </form>
    </section>

    <section class="card" style="margin-top:12px">
      <div class="section-title">Asset Types</div>
      <div class="table-wrap"><table><thead><tr><th>Name</th><th>Description</th><th>Status</th><th>Action</th></tr></thead><tbody>${assetTypeRows || '<tr><td colspan="4">No asset types.</td></tr>'}</tbody></table></div>
      <form id="assetTypeForm" class="form-grid" style="margin-top:10px">
        <input type="hidden" name="assetTypeId" />
        <div><label>Asset Type Name</label><input name="name" required placeholder="e.g. Fire Hose Reel" /></div>
        <div><label>Description</label><input name="description" placeholder="Short description" /></div>
        <div class="actions" style="grid-column:1/-1"><button class="primary" type="submit">Save Asset Type</button><button class="secondary" type="button" id="assetTypeFormReset">Reset</button></div>
      </form>
    </section>
  `;
}

function auditHTML(user) {
  if (!hasPermission(user.role, "page_audit")) {
    return `<section class="card">You do not have permission to view audit trail.</section>`;
  }
  const rows = (state.auditLogs || [])
    .slice()
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 300)
    .map(
      (log) =>
        `<tr><td>${log.createdAt ? log.createdAt.slice(0, 19).replace("T", " ") : "-"}</td><td>${escapeHtml(log.actorName || "-")}</td><td>${escapeHtml(log.actorEmail || "-")}</td><td>${escapeHtml(log.actionType || "-")}</td><td>${escapeHtml(log.entityType || "-")}</td><td>${escapeHtml(log.entityId || "-")}</td><td>${escapeHtml(JSON.stringify(log.details || {}))}</td></tr>`
    )
    .join("");
  return `
    <header class="page-header">
      <div>
        <h1 class="header-title">Audit Trail</h1>
        <p class="subtitle">All key updates with actor email and timestamp</p>
      </div>
    </header>
    <section class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Time</th><th>User</th><th>Email</th><th>Action</th><th>Entity</th><th>Entity ID</th><th>Details</th></tr></thead>
          <tbody>${rows || '<tr><td colspan="7">No audit entries yet.</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `;
}

function wireEvents(user) {
  const dashboardFilterForm = document.getElementById("dashboardFilterForm");
  if (dashboardFilterForm) {
    dashboardFilterForm.addEventListener("change", () => {
      const fd = new FormData(dashboardFilterForm);
      dashboardFilters.cityId = String(fd.get("cityId") || "all");
      dashboardFilters.storeId = String(fd.get("storeId") || "all");
      dashboardFilters.team = String(fd.get("team") || "all");
      dashboardFilters.status = String(fd.get("status") || "all");
      render();
    });
  }
  document.getElementById("dashboardFilterReset")?.addEventListener("click", () => {
    dashboardFilters = { cityId: "all", storeId: "all", team: "all", status: "all" };
    render();
  });

  const regen = document.getElementById("regenTasksBtn");
  if (regen) {
    regen.addEventListener("click", async () => {
      ensureRecurringTasks();
      addAuditLog(user, "GENERATE_DUE_TASKS", "tasks", null, { reason: "manual_regeneration" });
      await saveState();
      render();
    });
  }

  const fieldStoreForm = document.getElementById("fieldStoreForm");
  if (fieldStoreForm) {
    fieldStoreForm.addEventListener("change", () => {
      fieldStoreId = String(new FormData(fieldStoreForm).get("storeId"));
      render();
    });
  }

  document.querySelectorAll("[data-live-start]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await startLiveCapture(btn.dataset.liveStart);
    });
  });

  document.querySelectorAll("[data-live-stop]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await stopLiveCapture(btn.dataset.liveStop);
    });
  });

  document.querySelectorAll("[data-live-clear]").forEach((btn) => {
    btn.addEventListener("click", () => {
      clearLiveCapture(btn.dataset.liveClear);
    });
  });

  document.querySelectorAll("[data-field-submit]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const taskId = btn.dataset.fieldSubmit;
      const task = state.tasks.find((t) => t.id === taskId);
      if (!task) return;
      if (!hasPermission(user.role, "action_field_submit")) {
        return alert("Your role is not allowed to submit field uploads.");
      }
      if (!canAccessStore(user, task.storeId)) return alert("No access to this store.");
      if (task.assignedTeam !== user.role && !["admin", "auditor"].includes(user.role)) return alert("This task is assigned to another team.");
      if (task.status === "under_review") return alert("This task is already submitted and currently under admin review.");

      const note = document.getElementById(`field-note-${task.id}`)?.value?.trim() || "";
      const filesInput = document.getElementById(`field-file-${task.id}`);
      const audioInput = document.getElementById(`field-audio-${task.id}`);
      const allFiles = [];

      const draft = fieldDrafts[task.id];
      if (draft?.file) allFiles.push(draft.file);
      if (filesInput?.files?.length) allFiles.push(...Array.from(filesInput.files));
      if (audioInput?.files?.length) allFiles.push(...Array.from(audioInput.files));
      if (!allFiles.length && !note) return alert("Please add at least one file or note before submitting.");

      const uploaded = await uploadFiles(allFiles);
      const liveMeta = draft?.meta || null;
      if (liveMeta && draft.file) {
        const row = uploaded.find((x) => x.fileName === draft.file.name);
        if (row) row.liveMeta = liveMeta;
      }

      const reviewEntry = {
        id: uid("review"),
        taskId: task.id,
        templateId: task.templateId,
        itemNameSnapshot: task.itemNameSnapshot || state.templates.find((x) => x.id === task.templateId)?.name || "Unknown Task Item",
        storeId: task.storeId,
        evidence: uploaded,
        agendaNotes: mergeNoteWithMeta(note, liveMeta),
        fieldMeta: liveMeta,
        submittedAt: new Date().toISOString(),
        submittedBy: user.id,
        status: "under_review",
        adminComment: "",
        reviewedAt: null,
        reviewedBy: null,
      };
      state.reviewQueue.push(reviewEntry);
      task.status = "under_review";
      task.pendingReviewId = reviewEntry.id;
      task.submittedAt = reviewEntry.submittedAt;
      task.submittedBy = reviewEntry.submittedBy;

      await stopLiveCapture(task.id, true);
      clearLiveCapture(task.id);
      addAuditLog(user, "SUBMIT_FOR_REVIEW", "review_queue", reviewEntry.id, {
        taskId: task.id,
        storeId: task.storeId,
        files: uploaded.map((x) => x.fileName),
      });
      await saveState();
      render();
    });
  });

  document.querySelectorAll("[data-approve-review]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!hasPermission(user.role, "action_review_decide")) return;
      const reviewId = btn.dataset.approveReview;
      const review = state.reviewQueue.find((r) => r.id === reviewId);
      if (!review || review.status !== "under_review") return;
      const task = state.tasks.find((t) => t.id === review.taskId);
      if (!task) return;

      review.status = "approved";
      review.reviewedAt = new Date().toISOString();
      review.reviewedBy = user.id;
      review.adminComment = "";

      task.status = "completed";
      task.evidence = review.evidence || [];
      task.agendaNotes = review.agendaNotes || "";
      task.fieldMeta = review.fieldMeta || null;
      task.submittedAt = review.submittedAt;
      task.submittedBy = review.submittedBy;
      task.pendingReviewId = null;
      task.lastRejectionComment = "";
      task.approvedAt = review.reviewedAt;

      state.reviewQueue = state.reviewQueue.filter(
        (r) => r.id !== review.id && !(r.taskId === task.id && r.status === "rejected")
      );
      addAuditLog(user, "APPROVE_REVIEW", "review_queue", review.id, { taskId: task.id, storeId: task.storeId });
      ensureRecurringTasks();
      await saveState();
      render();
    });
  });

  document.querySelectorAll("[data-reject-review]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!hasPermission(user.role, "action_review_decide")) return;
      const reviewId = btn.dataset.rejectReview;
      const review = state.reviewQueue.find((r) => r.id === reviewId);
      if (!review || review.status !== "under_review") return;
      const commentEl = document.getElementById(`reject-comment-${review.id}`);
      const comment = String(commentEl?.value || "").trim();
      if (wordCount(comment) < 100) {
        alert("Rejection requires at least 100 words.");
        return;
      }
      const task = state.tasks.find((t) => t.id === review.taskId);
      if (!task) return;

      review.status = "rejected";
      review.reviewedAt = new Date().toISOString();
      review.reviewedBy = user.id;
      review.adminComment = comment;

      task.status = "pending";
      task.pendingReviewId = null;
      task.lastRejectionComment = comment;
      task.evidence = [];
      task.fieldMeta = null;

      addAuditLog(user, "REJECT_REVIEW", "review_queue", review.id, {
        taskId: task.id,
        storeId: task.storeId,
        commentWords: wordCount(comment),
      });
      await saveState();
      render();
    });
  });

  document.querySelectorAll("[data-toggle-user]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!hasPermission(user.role, "action_user_manage")) return;
      const target = state.users.find((u) => u.id === btn.dataset.toggleUser);
      if (!target) return;
      target.active = target.active === false;
      addAuditLog(user, "TOGGLE_USER_STATUS", "users", target.id, { active: target.active });
      await saveState();
      render();
    });
  });

  const userForm = document.getElementById("userForm");
  if (userForm) {
    userForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!hasPermission(user.role, "action_user_manage")) return;
      const fd = new FormData(userForm);
      const phone = normalizePhone(fd.get("phone"));
      const email = String(fd.get("email") || "").trim().toLowerCase();
      if (!/^\d{10}$/.test(phone)) {
        alert("Enter a valid 10-digit phone number.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Enter a valid email address.");
        return;
      }
      if (state.users.some((u) => normalizePhone(u.phone) === phone)) {
        alert("This phone number already exists.");
        return;
      }
      if (state.users.some((u) => String(u.email || "").toLowerCase() === email)) {
        alert("This email already exists.");
        return;
      }
      const preset = String(fd.get("scopePreset") || "all");
      const selectedCityIds = Array.from(userForm.querySelector('[name=\"cityIds\"]').selectedOptions).map((o) => o.value);
      const selectedStoreIds = Array.from(userForm.querySelector('[name=\"storeIds\"]').selectedOptions).map((o) => o.value);
      const cityIds = preset === "all" ? ["all"] : selectedCityIds;
      const storeIds = preset === "all" ? ["all"] : selectedStoreIds;
      if (preset === "custom" && (!cityIds.length || !storeIds.length)) {
        alert("For custom scope, select at least one city and one store.");
        return;
      }

      state.users.push({
        id: uid("u"),
        name: String(fd.get("name") || "").trim(),
        email,
        phone,
        role: String(fd.get("role") || "manager"),
        cityIds,
        storeIds,
        active: true,
      });
      addAuditLog(user, "CREATE_USER", "users", state.users[state.users.length - 1].id, {
        role: state.users[state.users.length - 1].role,
        cityIds,
        storeIds,
      });
      await saveState();
      render();
    });
  }

  const roleTypeForm = document.getElementById("roleTypeForm");
  if (roleTypeForm) {
    roleTypeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!hasPermission(user.role, "action_user_manage")) return;
      const fd = new FormData(roleTypeForm);
      const name = String(fd.get("roleName") || "").trim();
      const description = String(fd.get("roleDescription") || "").trim();
      let roleKey = String(fd.get("roleKey") || "").trim().toLowerCase();
      if (!name) return alert("Role name is required.");
      if (!roleKey) {
        roleKey = name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "_")
          .replace(/^_+|_+$/g, "");
      }
      if (!/^[a-z][a-z0-9_]{2,40}$/.test(roleKey)) {
        return alert("Role key must be 3-40 chars, lowercase letters/numbers/underscore, and start with a letter.");
      }
      if (state.roleMeta[roleKey]) {
        return alert("Role key already exists.");
      }

      state.roleMeta[roleKey] = { name, description };
      state.rolePermissions[roleKey] = Object.fromEntries(PERMISSION_DEFS.map((p) => [p.key, false]));
      addAuditLog(user, "CREATE_ROLE_TYPE", "role_meta", roleKey, { name, description });
      await saveState();
      render();
    });
  }

  document.querySelectorAll("[data-save-role-meta]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!hasPermission(user.role, "action_user_manage")) return;
      const role = btn.dataset.saveRoleMeta;
      if (!state.roleMeta[role]) return;
      const nameInput = document.querySelector(`[name="role-name-${role}"]`);
      const descInput = document.querySelector(`[name="role-desc-${role}"]`);
      const updatedName = String(nameInput?.value || "").trim();
      const updatedDesc = String(descInput?.value || "").trim();
      if (!updatedName) return alert("Role display name cannot be empty.");
      state.roleMeta[role].name = updatedName;
      state.roleMeta[role].description = updatedDesc;
      addAuditLog(user, "UPDATE_ROLE_TYPE", "role_meta", role, { name: updatedName, description: updatedDesc });
      await saveState();
      render();
    });
  });

  const permissionForm = document.getElementById("permissionForm");
  if (permissionForm) {
    permissionForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!hasPermission(user.role, "action_user_manage")) return;
      const updated = {};
      for (const role of getRoleKeys()) {
        updated[role] = {};
        for (const perm of PERMISSION_DEFS) {
          const key = `${role}__${perm.key}`;
          const input = permissionForm.querySelector(`[name="${key}"]`);
          updated[role][perm.key] = Boolean(input?.checked);
        }
      }

      // Hard safety guard to prevent permanent admin lockout.
      updated.admin.page_users = true;
      updated.admin.action_user_manage = true;
      updated.admin.page_dashboard = true;

      state.rolePermissions = mergeRolePermissions(updated, state.roleMeta);
      addAuditLog(user, "UPDATE_PERMISSION_MATRIX", "role_permissions", null, { roles: getRoleKeys() });
      await saveState();
      alert("Permission settings saved.");
      render();
    });
  }

  const docForm = document.getElementById("docForm");
  if (docForm) {
    docForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(docForm);
      const file = fd.get("file");
      if (!file || !file.name) return alert("Select a file.");
      const storeId = String(fd.get("storeId"));
      if (!canAccessStore(user, storeId)) return alert("No access to this store.");
      const uploaded = await uploadFiles([file]);
      state.documents.push({
        id: uid("doc"),
        docType: String(fd.get("docType") || "").trim(),
        storeId,
        ownerTeam: String(fd.get("ownerTeam") || "compliance"),
        expiryDate: String(fd.get("expiryDate") || "").trim() || null,
        fileName: uploaded[0]?.fileName || file.name,
        filePath: uploaded[0]?.filePath || null,
        mimeType: uploaded[0]?.mimeType || file.type || "application/octet-stream",
        uploadedAt: new Date().toISOString(),
        uploadedBy: user.id,
      });
      addAuditLog(user, "UPLOAD_DOCUMENT", "documents", state.documents[state.documents.length - 1].id, {
        docType: state.documents[state.documents.length - 1].docType,
        storeId,
      });
      await saveState();
      render();
    });
  }

  const assetForm = document.getElementById("assetForm");
  if (assetForm) {
    assetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = new FormData(assetForm);
      const storeId = String(fd.get("storeId"));
      if (!canAccessStore(user, storeId)) return alert("No access to this store.");
      state.assets.push({
        id: uid("asset"),
        type: String(fd.get("type") || "").trim(),
        itemName: String(fd.get("itemName") || "").trim(),
        storeId,
        serialNo: String(fd.get("serialNo") || "").trim(),
        location: String(fd.get("location") || "").trim(),
        count: Number(fd.get("count") || 1),
        fillStatus: String(fd.get("fillStatus") || "na"),
        workingStatus: String(fd.get("workingStatus") || "working"),
        lastCheckedOn: String(fd.get("lastCheckedOn") || ""),
        nextDueOn: String(fd.get("nextDueOn") || ""),
        notes: String(fd.get("notes") || "").trim(),
      });
      addAuditLog(user, "CREATE_ASSET_RECORD", "assets", state.assets[state.assets.length - 1].id, {
        storeId,
        type: state.assets[state.assets.length - 1].type,
      });
      await saveState();
      render();
    });
  }

  document.querySelectorAll("[data-toggle-template]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!hasPermission(user.role, "action_template_manage")) return;
      const t = state.templates.find((x) => x.id === btn.dataset.toggleTemplate);
      if (!t) return;
      t.active = !t.active;
      addAuditLog(user, "TOGGLE_TASK_ITEM_TYPE", "compliance_templates", t.id, { active: t.active });
      ensureRecurringTasks();
      await saveState();
      render();
    });
  });

  document.querySelectorAll("[data-edit-template]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const t = state.templates.find((x) => x.id === btn.dataset.editTemplate);
      const form = document.getElementById("templateForm");
      if (!t || !form) return;
      form.elements.templateId.value = t.id;
      form.elements.name.value = t.name || "";
      form.elements.category.value = t.category || "other";
      form.elements.subcategory.value = t.subcategory || "";
      form.elements.team.value = t.team || "maintenance";
      form.elements.frequencyType.value = t.frequencyType || "days";
      form.elements.frequencyValue.value = t.frequencyValue || 0;
      form.elements.evidenceType.value = t.evidenceType || "document";
      form.elements.mandatory.value = String(Boolean(t.mandatory));
      form.elements.scope.value = t.scope || "all";
      form.elements.alerts.value = t.alerts || "";
      const freqValue = document.getElementById("freqValue");
      if (freqValue) freqValue.disabled = form.elements.frequencyType.value === "one_time";
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  document.getElementById("templateFormReset")?.addEventListener("click", () => {
    const form = document.getElementById("templateForm");
    if (!form) return;
    form.reset();
    form.elements.templateId.value = "";
    const freqValue = document.getElementById("freqValue");
    if (freqValue) freqValue.disabled = false;
  });

  document.querySelectorAll("[data-edit-doc-type]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const d = state.documentTypes.find((x) => x.id === btn.dataset.editDocType);
      const form = document.getElementById("docTypeForm");
      if (!d || !form) return;
      form.elements.docTypeId.value = d.id;
      form.elements.name.value = d.name || "";
      form.elements.description.value = d.description || "";
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  document.querySelectorAll("[data-toggle-doc-type]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const d = state.documentTypes.find((x) => x.id === btn.dataset.toggleDocType);
      if (!d) return;
      d.active = !d.active;
      addAuditLog(user, "TOGGLE_DOCUMENT_TYPE", "document_types", d.id, { active: d.active });
      await saveState();
      render();
    });
  });

  document.getElementById("docTypeFormReset")?.addEventListener("click", () => {
    const form = document.getElementById("docTypeForm");
    if (!form) return;
    form.reset();
    form.elements.docTypeId.value = "";
  });

  document.querySelectorAll("[data-edit-asset-type]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const a = state.assetTypes.find((x) => x.id === btn.dataset.editAssetType);
      const form = document.getElementById("assetTypeForm");
      if (!a || !form) return;
      form.elements.assetTypeId.value = a.id;
      form.elements.name.value = a.name || "";
      form.elements.description.value = a.description || "";
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  document.querySelectorAll("[data-toggle-asset-type]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const a = state.assetTypes.find((x) => x.id === btn.dataset.toggleAssetType);
      if (!a) return;
      a.active = !a.active;
      addAuditLog(user, "TOGGLE_ASSET_TYPE", "asset_types", a.id, { active: a.active });
      await saveState();
      render();
    });
  });

  document.getElementById("assetTypeFormReset")?.addEventListener("click", () => {
    const form = document.getElementById("assetTypeForm");
    if (!form) return;
    form.reset();
    form.elements.assetTypeId.value = "";
  });

  const templateForm = document.getElementById("templateForm");
  if (templateForm) {
    const freqType = document.getElementById("freqType");
    const freqValue = document.getElementById("freqValue");
    freqType?.addEventListener("change", () => {
      freqValue.disabled = freqType.value === "one_time";
    });

    templateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!hasPermission(user.role, "action_template_manage")) return;
      const fd = new FormData(templateForm);
      const frequencyType = String(fd.get("frequencyType") || "days");
      const templateId = String(fd.get("templateId") || "").trim();
      const payload = {
        name: String(fd.get("name") || "").trim(),
        category: String(fd.get("category") || "other"),
        subcategory: String(fd.get("subcategory") || "General").trim() || "General",
        team: String(fd.get("team") || "maintenance"),
        frequencyType,
        frequencyValue: frequencyType === "one_time" ? 0 : Number(fd.get("frequencyValue") || 90),
        evidenceType: String(fd.get("evidenceType") || "document"),
        mandatory: String(fd.get("mandatory") || "true") === "true",
        scope: String(fd.get("scope") || "all"),
        alerts: String(fd.get("alerts") || "").trim(),
      };
      if (templateId) {
        const existing = state.templates.find((x) => x.id === templateId);
        if (existing) {
          Object.assign(existing, payload);
          addAuditLog(user, "UPDATE_TASK_ITEM_TYPE", "compliance_templates", existing.id, { name: existing.name });
        }
      } else {
        state.templates.push({
          id: uid("tpl"),
          ...payload,
          active: true,
        });
        addAuditLog(user, "CREATE_TASK_ITEM_TYPE", "compliance_templates", state.templates[state.templates.length - 1].id, {
          name: state.templates[state.templates.length - 1].name,
        });
      }
      ensureRecurringTasks();
      await saveState();
      templateForm.reset();
      templateForm.elements.templateId.value = "";
      render();
    });
  }

  const docTypeForm = document.getElementById("docTypeForm");
  if (docTypeForm) {
    docTypeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!hasPermission(user.role, "action_template_manage")) return;
      const fd = new FormData(docTypeForm);
      const id = String(fd.get("docTypeId") || "").trim();
      const name = String(fd.get("name") || "").trim();
      const description = String(fd.get("description") || "").trim();
      if (!name) return alert("Document type name is required.");
      const duplicate = state.documentTypes.find((x) => x.name.toLowerCase() === name.toLowerCase() && x.id !== id);
      if (duplicate) return alert("Document type name already exists.");
      if (id) {
        const existing = state.documentTypes.find((x) => x.id === id);
        if (existing) {
          existing.name = name;
          existing.description = description;
          addAuditLog(user, "UPDATE_DOCUMENT_TYPE", "document_types", existing.id, { name });
        }
      } else {
        state.documentTypes.push({ id: uid("dt"), name, description, active: true });
        addAuditLog(user, "CREATE_DOCUMENT_TYPE", "document_types", state.documentTypes[state.documentTypes.length - 1].id, { name });
      }
      await saveState();
      docTypeForm.reset();
      docTypeForm.elements.docTypeId.value = "";
      render();
    });
  }

  const assetTypeForm = document.getElementById("assetTypeForm");
  if (assetTypeForm) {
    assetTypeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!hasPermission(user.role, "action_template_manage")) return;
      const fd = new FormData(assetTypeForm);
      const id = String(fd.get("assetTypeId") || "").trim();
      const name = String(fd.get("name") || "").trim();
      const description = String(fd.get("description") || "").trim();
      if (!name) return alert("Asset type name is required.");
      const duplicate = state.assetTypes.find((x) => x.name.toLowerCase() === name.toLowerCase() && x.id !== id);
      if (duplicate) return alert("Asset type name already exists.");
      if (id) {
        const existing = state.assetTypes.find((x) => x.id === id);
        if (existing) {
          existing.name = name;
          existing.description = description;
          addAuditLog(user, "UPDATE_ASSET_TYPE", "asset_types", existing.id, { name });
        }
      } else {
        state.assetTypes.push({ id: uid("at"), name, description, active: true });
        addAuditLog(user, "CREATE_ASSET_TYPE", "asset_types", state.assetTypes[state.assetTypes.length - 1].id, { name });
      }
      await saveState();
      assetTypeForm.reset();
      assetTypeForm.elements.assetTypeId.value = "";
      render();
    });
  }
}

function mergeNoteWithMeta(note, meta) {
  if (!meta) return note;
  const loc = meta.geo ? ` | Location: ${meta.geo.lat.toFixed(5)}, ${meta.geo.lng.toFixed(5)}` : "";
  const ts = meta.capturedAt ? ` | Captured: ${meta.capturedAt}` : "";
  const suffix = `[Live Video${loc}${ts}]`;
  return note ? `${note}\n${suffix}` : suffix;
}

function wordCount(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

async function startLiveCapture(taskId) {
  if (!navigator.mediaDevices?.getUserMedia) {
    alert("Camera API is not supported on this browser/device.");
    return;
  }

  let draft = fieldDrafts[taskId];
  if (draft?.recorder && draft.recorder.state === "recording") {
    alert("Recording already in progress for this task.");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 640 },
        height: { ideal: 480 },
        frameRate: { ideal: 20, max: 24 },
      },
      audio: true,
    });

    const mimeType = chooseRecorderMimeType();
    const chunks = [];
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 600000,
      audioBitsPerSecond: 64000,
    });

    recorder.ondataavailable = (ev) => {
      if (ev.data && ev.data.size > 0) chunks.push(ev.data);
    };

    const preview = document.getElementById(`live-preview-${taskId}`);
    if (preview) {
      preview.srcObject = stream;
      preview.play().catch(() => {});
    }

    const capturedAt = new Date().toISOString();
    const geo = await getGeoSafe();

    fieldDrafts[taskId] = {
      recorder,
      stream,
      chunks,
      file: null,
      previewUrl: null,
      meta: {
        capturedAt,
        geo,
      },
    };

    updateLiveMetaText(taskId, `Recording started at ${capturedAt}${geo ? ` | ${geo.lat.toFixed(5)}, ${geo.lng.toFixed(5)}` : " | Location unavailable"}`);
    recorder.start(1000);
  } catch (err) {
    alert(`Unable to start camera recording: ${String(err.message || err)}`);
  }
}

async function stopLiveCapture(taskId, silent = false) {
  const draft = fieldDrafts[taskId];
  if (!draft?.recorder) return;

  const recorder = draft.recorder;
  if (recorder.state === "inactive") {
    stopStreamTracks(draft.stream);
    return;
  }

  await new Promise((resolve) => {
    recorder.onstop = resolve;
    recorder.stop();
  });

  const blob = new Blob(draft.chunks || [], { type: recorder.mimeType || "video/webm" });
  const extension = blob.type.includes("mp4") ? "mp4" : "webm";
  const fileName = `live-${taskId}-${Date.now()}.${extension}`;
  const file = new File([blob], fileName, { type: blob.type || "video/webm" });

  if (draft.previewUrl) URL.revokeObjectURL(draft.previewUrl);
  const previewUrl = URL.createObjectURL(blob);
  draft.file = file;
  draft.previewUrl = previewUrl;

  const preview = document.getElementById(`live-preview-${taskId}`);
  if (preview) {
    preview.srcObject = null;
    preview.src = previewUrl;
    preview.controls = true;
  }

  stopStreamTracks(draft.stream);
  draft.stream = null;
  draft.recorder = null;
  draft.chunks = [];

  const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
  updateLiveMetaText(taskId, `Live clip ready (${sizeMb} MB)${draft.meta?.geo ? ` | ${draft.meta.geo.lat.toFixed(5)}, ${draft.meta.geo.lng.toFixed(5)}` : ""}`);
  if (!silent) alert("Live video captured and attached to this task.");
}

function clearLiveCapture(taskId) {
  const draft = fieldDrafts[taskId];
  if (!draft) return;
  stopStreamTracks(draft.stream);
  if (draft.previewUrl) URL.revokeObjectURL(draft.previewUrl);
  delete fieldDrafts[taskId];

  const preview = document.getElementById(`live-preview-${taskId}`);
  if (preview) {
    preview.srcObject = null;
    preview.src = "";
    preview.controls = false;
  }
  updateLiveMetaText(taskId, "No live recording captured yet.");
}

function stopStreamTracks(stream) {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
}

function updateLiveMetaText(taskId, text) {
  const el = document.getElementById(`live-meta-${taskId}`);
  if (el) el.textContent = text;
}

function chooseRecorderMimeType() {
  const candidates = ["video/webm;codecs=vp8,opus", "video/webm;codecs=vp9,opus", "video/mp4"];
  for (const type of candidates) {
    if (window.MediaRecorder?.isTypeSupported?.(type)) return type;
  }
  return "video/webm";
}

async function getGeoSafe() {
  if (!navigator.geolocation) return null;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 180000 }
    );
  });
}

async function uploadFiles(files) {
  if (!files.length) return [];

  if (!serverSync) {
    const localRows = await Promise.all(
      files.map(async (file) => {
        const mime = file.type || "application/octet-stream";
        const canPreview = (mime.startsWith("image/") || mime.startsWith("video/") || mime.startsWith("audio/") || mime === "application/pdf") && file.size <= 8 * 1024 * 1024;
        return {
          fileName: file.name,
          mimeType: mime,
          fileSizeKb: Math.max(1, Math.round(file.size / 1024)),
          uploadedAt: new Date().toISOString(),
          filePath: null,
          previewDataUrl: canPreview ? await fileToDataUrl(file) : null,
        };
      })
    );
    return localRows;
  }

  try {
    const fd = new FormData();
    for (const file of files) fd.append("files", file);
    const res = await fetch(API_UPLOAD, { method: "POST", body: fd });
    if (!res.ok) throw new Error("upload failed");
    const data = await res.json();
    return data.files || [];
  } catch {
    return files.map((file) => ({
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      fileSizeKb: Math.max(1, Math.round(file.size / 1024)),
      uploadedAt: new Date().toISOString(),
      filePath: null,
      previewDataUrl: null,
    }));
  }
}

async function fileToDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}
