INSERT INTO classes (name, section, teacher_name, academic_year) VALUES
('Baby', 'Elementary', 'Mrs. Nakabugo', 2025),
('Middle', 'Elementary', 'Mr. Kyeyune', 2025),
('Top', 'Elementary', 'Miss Nambi', 2025),
('P.1', 'Primary', 'Mr. Okiror', 2025),
('P.2', 'Primary', 'Mrs. Nankunda', 2025),
('P.3', 'Primary', 'Mr. Kasozi', 2025),
('P.4', 'Primary', 'Mrs. Akello', 2025),
('P.5', 'Primary', 'Mr. Ssemanda', 2025),
('P.6', 'Primary', 'Miss Katende', 2025),
('P.7', 'Primary', 'Mr. Mukasa', 2025)
ON CONFLICT DO NOTHING;