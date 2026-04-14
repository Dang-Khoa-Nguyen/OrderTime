# The file that handle the connection between backend and frontend
# Necessary imports
from flask import Flask
from flask_cors import CORS
from api import register_blueprints

# Created the app
app = Flask(__name__)

CORS(app)
CORS(app,
    origins=["http://localhost:3000", "http://127.0.0.1:3000"], 
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],          
    allow_headers=["Content-Type", "Authorization"]
)
register_blueprints(app)

if __name__ == "__main__":
    app.run(debug=True)