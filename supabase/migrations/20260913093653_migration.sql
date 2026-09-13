CREATE OR REPLACE FUNCTION promote_students_to_next_class(from_year INT, to_year INT)
RETURNS TABLE(student_id BIGINT, student_name TEXT, from_class TEXT, to_class TEXT, status TEXT) AS $$
DECLARE
  v_student RECORD;
  v_current_class RECORD;
  v_next_class RECORD;
BEGIN
  -- Loop through all active students from previous academic year
  FOR v_student IN 
    SELECT s.id, s.name, s.current_class_id
    FROM students s
    WHERE s.academic_year = from_year AND s.status = 'Active'
  LOOP
    -- Get current class details
    SELECT id, name, section FROM classes WHERE id = v_student.current_class_id INTO v_current_class;
    
    -- Determine next class based on promotion logic
    IF v_current_class.section = 'Elementary' THEN
      IF v_current_class.name = 'Baby' THEN
        SELECT id, name INTO v_next_class FROM classes WHERE name = 'Middle' AND section = 'Elementary';
      ELSIF v_current_class.name = 'Middle' THEN
        SELECT id, name INTO v_next_class FROM classes WHERE name = 'Top' AND section = 'Elementary';
      ELSIF v_current_class.name = 'Top' THEN
        SELECT id, name INTO v_next_class FROM classes WHERE name = 'P.1' AND section = 'Primary';
      END IF;
    ELSIF v_current_class.section = 'Primary' THEN
      IF v_current_class.name = 'P.1' THEN
        SELECT id, name INTO v_next_class FROM classes WHERE name = 'P.2' AND section = 'Primary';
      ELSIF v_current_class.name = 'P.2' THEN
        SELECT id, name INTO v_next_class FROM classes WHERE name = 'P.3' AND section = 'Primary';
      ELSIF v_current_class.name = 'P.3' THEN
        SELECT id, name INTO v_next_class FROM classes WHERE name = 'P.4' AND section = 'Primary';
      ELSIF v_current_class.name = 'P.4' THEN
        SELECT id, name INTO v_next_class FROM classes WHERE name = 'P.5' AND section = 'Primary';
      ELSIF v_current_class.name = 'P.5' THEN
        SELECT id, name INTO v_next_class FROM classes WHERE name = 'P.6' AND section = 'Primary';
      ELSIF v_current_class.name = 'P.6' THEN
        SELECT id, name INTO v_next_class FROM classes WHERE name = 'P.7' AND section = 'Primary';
      ELSIF v_current_class.name = 'P.7' THEN
        -- P.7 students graduate
        UPDATE students SET status = 'Graduated', academic_year = to_year WHERE id = v_student.id;
        RETURN QUERY SELECT v_student.id, v_student.name, v_current_class.name, 'GRADUATED'::TEXT, 'Graduated'::TEXT;
        CONTINUE;
      END IF;
    END IF;
    
    -- Record promotion
    INSERT INTO class_promotions (student_id, from_class_id, to_class_id, from_academic_year, to_academic_year)
    VALUES (v_student.id, v_current_class.id, v_next_class.id, from_year, to_year);
    
    -- Update student's current class and academic year
    UPDATE students SET current_class_id = v_next_class.id, academic_year = to_year WHERE id = v_student.id;
    
    RETURN QUERY SELECT v_student.id, v_student.name, v_current_class.name, v_next_class.name, 'Promoted'::TEXT;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;