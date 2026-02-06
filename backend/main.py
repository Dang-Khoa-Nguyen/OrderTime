# The file that handle the connection between backend and frontend
# Necessary imports
from flask import Flask
from flask_cors import CORS

# Created the app
app = Flask(__name__)

CORS(app)

if __name__ == "__main__":
    app.run(debug=True)