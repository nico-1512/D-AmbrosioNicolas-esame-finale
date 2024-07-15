CREATE TABLE IF NOT EXISTS Student (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone_number VARCHAR(100) NOT NULL
);

INSERT INTO Student (first_name, last_name, birth_date, email, phone_number) VALUES ('Leola', 'Gislason', '2002-04-22', 'leola_gislason@yahoo.com', '343.414.9035');
INSERT INTO Student (first_name, last_name, birth_date, email, phone_number) VALUES ('Joanne', 'Friesen', '1999-10-12', 'joanne_friesen@gmail.com', '442-227-7032');
INSERT INTO Student (first_name, last_name, birth_date, email, phone_number) VALUES ('Ryley', 'Thompson', '2005-01-04', 'ryley_thompson@libero.it', '(480) 950-7041 x1586');
INSERT INTO Student (first_name, last_name, birth_date, email, phone_number) VALUES ('Elliot', 'Gottlieb', '2001-08-29', 'elliot_gottlieb@gmail.com', '406-833-7194 x989');

CREATE TABLE IF NOT EXISTS Professor (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  experience INT NOT NULL CHECK (experience IN (1, 2, 3, 4, 5)),
  teaching_dates TIMESTAMP[],
  meeting_type VARCHAR(100) CHECK (meeting_type IN ('presence', 'videocall')),
  meeting_dates TIMESTAMP[]
);

INSERT INTO Professor (first_name, last_name, experience, teaching_dates, meeting_type, meeting_dates) VALUES ('Geraldine', 'Mayer', 5, ARRAY[timestamp '2024-07-17 10:00:00',  timestamp '2024-07-19 12:00:00'], 'presence', ARRAY[ timestamp '2024-07-22 09:00:00',timestamp '2024-07-22 11:00:00']);
INSERT INTO Professor (first_name, last_name, experience, teaching_dates, meeting_type, meeting_dates) VALUES ('Nikolas', 'Upton', 5, ARRAY[timestamp '2024-07-19 08:00:00',timestamp '2024-07-23 12:00:00',timestamp '2024-07-24 12:00:00'], 'videocall', ARRAY[timestamp '2024-07-23 15:00:00']);
INSERT INTO Professor (first_name, last_name, experience, teaching_dates, meeting_type, meeting_dates) VALUES ('Jabari', 'Abshire', 5, ARRAY[timestamp '2024-07-17 15:00:00'], 'presence', ARRAY[timestamp '2024-07-22 09:00:00',timestamp '2024-07-22 11:00:00',timestamp '2024-07-23 10:00:00',timestamp '2024-07-23 11:00:00',timestamp '2024-07-23 15:00:00']);
INSERT INTO Professor (first_name, last_name, experience, teaching_dates, meeting_type, meeting_dates) VALUES ('Brando', 'Greenfelder', 5, ARRAY[timestamp '2024-07-16 10:00:00',timestamp '2024-07-16 12:00:00',timestamp '2024-07-19 17:00:00'], 'presence', ARRAY[timestamp '2024-07-24 09:00:00',timestamp '2024-07-24 10:00:00',timestamp '2024-07-25 11:00:00']);

CREATE TABLE IF NOT EXISTS Appointment (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  professor_id INT NOT NULL,
  student_id INT NOT NULL,
  date DATE NOT NULL,  
  Foreign Key (professor_id) REFERENCES Professor(id),
  Foreign Key (student_id) REFERENCES Student(id)
);


CREATE TABLE IF NOT EXISTS PendingAppointment (
  professor_id INT NOT NULL,
  appointment_id INT NOT NULL,
  date DATE NOT NULL, 
  pending BOOLEAN DEFAULT True, 
  state BOOLEAN, 
  PRIMARY KEY (professor_id, appointment_id),
  Foreign KEY (professor_id) REFERENCES Professor(id),
  Foreign KEY (appointment_id) REFERENCES Appointment(id)
);