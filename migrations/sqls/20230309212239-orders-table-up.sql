CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL DEFAULT 'active',
    CHECK (status IN ('active', 'complete'))
);