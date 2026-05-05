import os

DB_CONFIG = {
    "host":     os.environ.get("DB_HOST", "localhost"),
    "port":     int(os.environ.get("DB_PORT", 3307)),
    "user":     os.environ.get("DB_USER", "roterdorn"),
    "password": os.environ.get("DB_PASSWORD", "roterdorn"),
    "database": os.environ.get("DB_NAME", "roterdorn"),
}

CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "http://localhost:4200")
DEBUG = os.environ.get("FLASK_DEBUG", "false").lower() == "true"
PORT = int(os.environ.get("PORT", 5000))
