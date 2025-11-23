-- 1. ÖNCE KULLANICI OLUŞTURALIM
-- Not: password_hash normalde backend'de BCrypt ile oluşturulur. Buraya temsili yazdım.
INSERT INTO users (username, password_hash) 
VALUES 
('umay_samli', '$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIIrOaLZFnCN2');

-- 2. ENTITY'LERİ (KİŞİLER/KURUMLAR) GİRELİM
-- Level kolonu otomatik hesaplanacağı için yazmıyoruz.
INSERT INTO entities (user_id, name, current_ep) 
VALUES 
(1, 'Ahmet Yılmaz', 60),  -- Level 3 olarak başlar
(1, 'X Şirketi', 45),     -- Level 4 olarak başlar
(1, 'Canan Hoca', 95);    -- Level 1 olarak başlar

-- 3. HEDEFLERİ (OBJECTIVES) GİRELİM
INSERT INTO objectives (title, description, is_completed) 
VALUES 
('Kendi şirketimi kurmak', 'SaaS projesini canlıya alma süreci', FALSE),
('Yüksek Lisans', 'Yapay Zeka üzerine tez yazımı', TRUE);

-- 4. ETİKETLERİ (TAGS) GİRELİM
INSERT INTO tags (name, color_code) 
VALUES 
('#Kariyer', '#0000FF'),
('#Finans', '#008000'),
('#Akademik', '#FF0000');

-- 5. GÖREVLERİ (TASKS - Recursive Yapı) GİRELİM
-- Önce Parent (Ana) Tasklar
INSERT INTO tasks (title, required_time, importance_level, ideal_deadline, status) 
VALUES 
('PF-D Projesini Bitir', 0, 1, '2025-12-31 23:59:00', 'IN_PROGRESS'); 
-- Varsayalım ki bu Task ID = 1 oldu.

-- Şimdi Subtask'ler (Parent ID = 1 veriyoruz)
INSERT INTO tasks (parent_id, title, required_time, importance_level, status) 
VALUES 
(1, 'Backend Geliştirme', 10, 1, 'PENDING'),  -- ID: 2 olacak
(1, 'Frontend Tasarım', 5, 2, 'COMPLETED');   -- ID: 3 olacak

-- Backend'in de altına subtask ekleyelim (Parent ID = 2)
INSERT INTO tasks (parent_id, title, required_time, importance_level, status) 
VALUES 
(2, 'Database Şeması Kurulumu', 2, 1, 'COMPLETED'), -- ID: 4 olacak
(2, 'API Kodlaması', 8, 1, 'PENDING');              -- ID: 5 olacak

-- 6. TASK BAĞIMLILIKLARI (DEPENDENCIES)
-- Kural: "API Kodlaması" (ID:5) başlamadan önce "Database" (ID:4) bitmeli.
INSERT INTO task_dependencies (task_id, prerequisite_id) 
VALUES 
(5, 4);

-- 7. İLİŞKİ TABLOLARI (Objectives <-> Tags & Entities)
-- Hedef 1 (#Kariyer ve #Finans ile ilgili)
INSERT INTO objective_tags (objective_id, tag_id) VALUES (1, 1), (1, 2);

-- Hedef 1 (Ahmet Yılmaz ve X Şirketi ile ilgili)
INSERT INTO objective_entities (objective_id, entity_id) VALUES (1, 1), (1, 2);

-- 8. GÖZLEM VE PUAN ETKİSİ (OBSERVATIONS)
-- Gözlemi girelim
INSERT INTO observations (content, is_processed) 
VALUES 
('Ahmet, projem sıkıştığında bana karşılıksız yardım teklif etti.', TRUE); -- ID: 1

-- Etkisini işleyelim (Ahmet'e +15 puan)
INSERT INTO observation_impacts (observation_id, entity_id, score_delta) 
VALUES 
(1, 1, 15);

-- 9. SONUÇ KONTROLÜ İÇİN UPDATE (Opsiyonel Test)
-- Observation işlendiği için Ahmet'in puanını manuel update edelim (Backend bunu otomatik yapacak)
UPDATE entities SET current_ep = current_ep + 15 WHERE id = 1;