CREATE TABLE weather_data (
    id SERIAL PRIMARY KEY,
    temperature DECIMAL(5, 2) NOT NULL,
    wind DECIMAL(5, 2) NOT NULL,
    humidity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
