import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient

load_dotenv()  # Carrega as variáveis do .env

app = Flask(__name__)
CORS(app)

# Pasta de uploads
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Usa a string do .env
MONGODB_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGODB_URI)
db = client["celiaco"]
receitas_collection = db["receitas"]
locais_collection = db["locais"]


# Serve os arquivos estáticos do React
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    root_dir = os.path.join(os.path.dirname(__file__), "../frontend/build")
    if path != "" and os.path.exists(os.path.join(root_dir, path)):
        return send_from_directory(root_dir, path)
    else:
        return send_from_directory(root_dir, "index.html")


@app.route("/api/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    filename = file.filename
    file.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
    # Retorna a URL para acessar a imagem
    return jsonify({"url": f"/uploads/{filename}"})


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


@app.route("/api/receitas", methods=["GET"])
def listar_receitas():
    receitas = list(receitas_collection.find({}, {"_id": 0}))
    return jsonify(receitas)


@app.route("/api/receitas", methods=["POST"])
def adicionar_receita():
    data = request.json
    receitas_collection.insert_one(data)
    return jsonify({"message": "Receita adicionada!", "slug": data.get("slug")}), 201


@app.route("/api/receitas/<slug>", methods=["GET"])
def detalhe_receita(slug):
    receita = receitas_collection.find_one({"slug": slug}, {"_id": 0})
    if receita:
        return jsonify(receita)
    return jsonify({"error": "Receita não encontrada"}), 404


@app.route("/api/locais", methods=["POST"])
def adicionar_local():
    data = request.json
    locais_collection.insert_one(data)
    return jsonify({"message": "Local adicionado!"}), 201


@app.route("/api/locais", methods=["GET"])
def listar_locais():
    locais = list(locais_collection.find({}, {"_id": 0}))
    return jsonify(locais)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
