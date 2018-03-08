DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS event CASCADE;
DROP TABLE IF EXISTS slots CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;

-- Create table:
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(100) NOT NULL);

CREATE TABLE events(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  event_title VARCHAR(100) NOT NULL,
  event_description VARCHAR(255) NOT NULL,
  event_meeting VARCHAR(100) NOT NULL,
  event_url VARCHAR(100) NOT NULL);

CREATE TABLE slots(
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id),
  slot_date DATE NOT NULL,
  slot_start VARCHAR(10) NOT NULL,
  slot_end VARCHAR(10) NOT NULL);

 CREATE TABLE attendance(
  id SERIAL PRIMARY KEY,
  slot_id INTEGER REFERENCES slots(id),
  user_id INTEGER REFERENCES users(id),
  avalible BOOLEAN NOT NULL);




