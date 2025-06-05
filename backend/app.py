import os

from dotenv import load_dotenv
from flask import Flask, send_from_directory
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from routes.locais import locais_bp
from routes.receitas import receitas_bp
from routes.user import user_bp

app = Flask(__name__)
CORS(app)

load_dotenv()

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Configuração de pasta para uploads
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")


# Registro dos blueprints
app.register_blueprint(receitas_bp, url_prefix="/api/receitas")
app.register_blueprint(locais_bp, url_prefix="/api/locais")
app.register_blueprint(user_bp, url_prefix="/api/usuarios")
# Configuração do JWT


# Rota para servir arquivos enviados
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


if __name__ == "__main__":
    app.run(debug=True)
