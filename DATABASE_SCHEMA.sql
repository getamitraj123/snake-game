-- Fire Compliance Portal - PostgreSQL Schema (v1)

-- 1) Reference
CREATE TABLE cities (
  id UUID PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE stores (
  id UUID PRIMARY KEY,
  code VARCHAR(40) NOT NULL UNIQUE,
  name VARCHAR(180) NOT NULL,
  city_id UUID NOT NULL REFERENCES cities(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2) Users / Auth / Access
CREATE TYPE user_role AS ENUM ('admin', 'auditor', 'maintenance', 'compliance', 'accounts', 'manager');

CREATE TABLE users (
  id UUID PRIMARY KEY,
  full_name VARCHAR(160) NOT NULL,
  phone_e164 VARCHAR(20) NOT NULL UNIQUE,
  role user_role NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_city_access (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  city_id UUID NOT NULL REFERENCES cities(id) ON DELETE CASCADE,
  UNIQUE(user_id, city_id)
);

CREATE TABLE user_store_access (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  UNIQUE(user_id, store_id)
);

-- 3) Compliance Templates
CREATE TYPE frequency_type AS ENUM ('one_time', 'days');
CREATE TYPE evidence_type AS ENUM ('video', 'photo', 'document', 'multiple');

CREATE TABLE compliance_templates (
  id UUID PRIMARY KEY,
  name VARCHAR(220) NOT NULL,
  category VARCHAR(80) NOT NULL,
  subcategory VARCHAR(120) NOT NULL DEFAULT 'General',
  owner_team user_role NOT NULL,
  frequency_type frequency_type NOT NULL,
  frequency_value_days INTEGER NOT NULL DEFAULT 0,
  evidence_type evidence_type NOT NULL,
  is_mandatory BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  scope_type VARCHAR(20) NOT NULL DEFAULT 'all', -- all/city/store
  scope_city_id UUID NULL REFERENCES cities(id),
  scope_store_id UUID NULL REFERENCES stores(id),
  alerts_csv VARCHAR(120) NULL, -- e.g. '90,60,30'
  version_no INTEGER NOT NULL DEFAULT 1,
  created_by UUID NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4) Tasks / Execution
CREATE TYPE task_status AS ENUM ('pending', 'under_review', 'completed');

CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  template_id UUID NOT NULL REFERENCES compliance_templates(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  assigned_team user_role NOT NULL,
  category VARCHAR(80) NOT NULL,
  subcategory VARCHAR(120) NOT NULL,
  due_date DATE NOT NULL,
  status task_status NOT NULL DEFAULT 'pending',
  agenda_notes TEXT NULL,
  submitted_at TIMESTAMPTZ NULL,
  submitted_by UUID NULL REFERENCES users(id),
  approved_at TIMESTAMPTZ NULL,
  approved_by UUID NULL REFERENCES users(id),
  last_rejection_comment TEXT NULL,
  field_meta JSONB NULL, -- geolocation/time/device etc.
  pending_review_id UUID NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tasks_store_status_due ON tasks(store_id, status, due_date);
CREATE INDEX idx_tasks_template_store ON tasks(template_id, store_id);

-- 5) Review Queue (temporary review table)
CREATE TYPE review_status AS ENUM ('under_review', 'approved', 'rejected');

CREATE TABLE review_queue (
  id UUID PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES compliance_templates(id),
  store_id UUID NOT NULL REFERENCES stores(id),
  status review_status NOT NULL DEFAULT 'under_review',
  agenda_notes TEXT NULL,
  field_meta JSONB NULL,
  submitted_at TIMESTAMPTZ NOT NULL,
  submitted_by UUID NOT NULL REFERENCES users(id),
  reviewed_at TIMESTAMPTZ NULL,
  reviewed_by UUID NULL REFERENCES users(id),
  admin_comment TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_review_status_submitted_at ON review_queue(status, submitted_at DESC);
CREATE INDEX idx_review_task ON review_queue(task_id);

-- 6) Evidence Files (for task/review)
CREATE TABLE evidence_files (
  id UUID PRIMARY KEY,
  review_id UUID NULL REFERENCES review_queue(id) ON DELETE CASCADE,
  task_id UUID NULL REFERENCES tasks(id) ON DELETE CASCADE,
  store_id UUID NOT NULL REFERENCES stores(id),
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  file_size_kb INTEGER NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL,
  uploader_id UUID NULL REFERENCES users(id),
  live_meta JSONB NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (review_id IS NOT NULL OR task_id IS NOT NULL)
);

CREATE INDEX idx_evidence_review ON evidence_files(review_id);
CREATE INDEX idx_evidence_task ON evidence_files(task_id);
CREATE INDEX idx_evidence_mime_uploaded_at ON evidence_files(mime_type, uploaded_at);

-- 7) Documents Vault
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  store_id UUID NOT NULL REFERENCES stores(id),
  doc_type VARCHAR(180) NOT NULL,
  owner_team user_role NOT NULL,
  expiry_date DATE NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  file_size_kb INTEGER NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL,
  uploaded_by UUID NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_documents_store_expiry ON documents(store_id, expiry_date);

-- 8) Asset Register
CREATE TYPE working_status AS ENUM ('working', 'needs_service', 'not_working');

CREATE TABLE assets (
  id UUID PRIMARY KEY,
  store_id UUID NOT NULL REFERENCES stores(id),
  asset_type VARCHAR(120) NOT NULL,
  item_name VARCHAR(220) NOT NULL,
  serial_no VARCHAR(120) NULL,
  location_text VARCHAR(180) NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  fill_status VARCHAR(50) NULL,
  working_status working_status NOT NULL DEFAULT 'working',
  last_checked_on DATE NULL,
  next_due_on DATE NULL,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assets_store_working_due ON assets(store_id, working_status, next_due_on);

-- 9) OTP (if persisted)
CREATE TABLE otp_sessions (
  id UUID PRIMARY KEY,
  phone_e164 VARCHAR(20) NOT NULL,
  otp_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  consumed_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_otp_phone_expires ON otp_sessions(phone_e164, expires_at DESC);

-- 10) Audit Trail
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  actor_user_id UUID NULL REFERENCES users(id),
  action_type VARCHAR(80) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id UUID NULL,
  before_data JSONB NULL,
  after_data JSONB NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id, created_at DESC);

-- 11) Retention policy helper (video > 365 days)
-- Enforce in app job / cron:
-- DELETE FROM evidence_files
-- WHERE mime_type LIKE 'video/%' AND uploaded_at < NOW() - INTERVAL '365 days';

