"""
app.py — RoterDorn Flask Entry Point
Startet mit: python app.py
API läuft auf: http://localhost:5000
"""

from flask import Flask
from flask_cors import CORS
from config import CORS_ORIGINS, DEBUG, PORT
from routes.reviews import reviews_bp
from routes.authors import authors_bp

app = Flask(__name__)
CORS(app, origins=CORS_ORIGINS)

app.register_blueprint(reviews_bp)
app.register_blueprint(authors_bp)

if __name__ == "__main__":
    print(f"RoterDorn API läuft auf http://localhost:{PORT}")
    app.run(debug=DEBUG, port=PORT, host="0.0.0.0")
