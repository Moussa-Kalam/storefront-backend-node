CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    user_password TEXT NOT NULL
);