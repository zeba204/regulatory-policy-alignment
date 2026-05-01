CREATE TABLE audit_log (
    id              BIGSERIAL PRIMARY KEY,
    action          VARCHAR(50)     NOT NULL,
    entity_name     VARCHAR(100)    NOT NULL,
    entity_id       BIGINT,
    performed_by    VARCHAR(100),
    performed_at    TIMESTAMP       NOT NULL DEFAULT now(),
    details         TEXT
);

CREATE INDEX idx_audit_entity_id    ON audit_log (entity_id);
CREATE INDEX idx_audit_performed_at ON audit_log (performed_at);
CREATE INDEX idx_audit_action       ON audit_log (action);