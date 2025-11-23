-- 1. USER (Sistemin sahibi)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- BCrypt hash buraya
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. ENTITIES (Diamond System'deki kişiler/kurumlar)
CREATE TABLE entities (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id), -- Multi-user desteği için (opsiyonel)
    name VARCHAR(100) NOT NULL,
    current_ep INTEGER DEFAULT 50, -- Base EP Score
    level INTEGER GENERATED ALWAYS AS ( -- Postgres 12+ özelliği (Sanal Kolon)
        CASE 
            WHEN current_ep >= 90 THEN 1
            WHEN current_ep >= 75 THEN 2
            WHEN current_ep >= 50 THEN 3
            WHEN current_ep >= 20 THEN 4
            ELSE 5
        END
    ) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. OBJECTIVES (Hedefler)
CREATE TABLE objectives (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE
);

-- 4. TAGS (Etiketler)
CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    color_code VARCHAR(7) -- Frontend için (#FF0000 gibi)
);

-- 5. TASKS (Görevler & Alt Görevler)
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    parent_id BIGINT REFERENCES tasks(id), -- Recursive ilişki (Subtask için)
    title VARCHAR(200) NOT NULL,
    required_time FLOAT DEFAULT 0, -- RT (Saat cinsinden)
    importance_level INTEGER CHECK (importance_level BETWEEN 1 AND 4), -- IL
    ideal_deadline TIMESTAMP, -- IDL (Main taskler için dolu, subtask için NULL olabilir)
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, COMPLETED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. TASK DEPENDENCIES (Bir görev diğerini bekler)
-- task_id: Bekleyen görev
-- prerequisite_id: Önce bitmesi gereken görev
CREATE TABLE task_dependencies (
    task_id BIGINT REFERENCES tasks(id),
    prerequisite_id BIGINT REFERENCES tasks(id),
    PRIMARY KEY (task_id, prerequisite_id),
    CHECK (task_id != prerequisite_id) -- Kendini bekleyemez
);

-- 7. OBJECTIVE <-> TAGS (N to N)
CREATE TABLE objective_tags (
    objective_id BIGINT REFERENCES objectives(id),
    tag_id BIGINT REFERENCES tags(id),
    PRIMARY KEY (objective_id, tag_id)
);

-- 8. OBJECTIVE <-> ENTITIES (N to N)
CREATE TABLE objective_entities (
    objective_id BIGINT REFERENCES objectives(id),
    entity_id BIGINT REFERENCES entities(id),
    PRIMARY KEY (objective_id, entity_id)
);

-- 9. OBSERVATIONS (Gözlemler)
CREATE TABLE observations (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_processed BOOLEAN DEFAULT FALSE -- 2 gün bekleme kuralı için flag
);

-- 10. OBSERVATION IMPACTS (Hangi gözlem, kime, kaç puan vurdu?)
-- Bu tablo observation ile entity'i bağlar ve etkiyi tutar.
CREATE TABLE observation_impacts (
    id BIGSERIAL PRIMARY KEY,
    observation_id BIGINT REFERENCES observations(id),
    entity_id BIGINT REFERENCES entities(id),
    score_delta INTEGER NOT NULL, -- Örn: -5, +10 (Puan değişimi)
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);