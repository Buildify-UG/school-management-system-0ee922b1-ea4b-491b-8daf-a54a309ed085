CREATE TABLE IF NOT EXISTS classes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('Elementary', 'Primary')),
  teacher_name TEXT,
  academic_year INT NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS students (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  enrollment_number TEXT UNIQUE NOT NULL,
  date_of_birth DATE,
  current_class_id BIGINT REFERENCES classes(id),
  academic_year INT NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Graduated')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS class_promotions (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES students(id),
  from_class_id BIGINT NOT NULL REFERENCES classes(id),
  to_class_id BIGINT NOT NULL REFERENCES classes(id),
  from_academic_year INT NOT NULL,
  to_academic_year INT NOT NULL,
  promotion_date TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS teachers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  subjects TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on classes" ON classes FOR SELECT USING (true);
CREATE POLICY "Allow public read on students" ON students FOR SELECT USING (true);
CREATE POLICY "Allow public read on promotions" ON class_promotions FOR SELECT USING (true);
CREATE POLICY "Allow public read on teachers" ON teachers FOR SELECT USING (true);