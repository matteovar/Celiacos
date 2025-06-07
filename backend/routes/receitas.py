import os

from bson import ObjectId
from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from models import receitas_collection, user_collection

receitas_bp = Blueprint("receitas", __name__)


# POST - adicionar nova receita (protegido)
@receitas_bp.route("", methods=["POST"])
def adicionar_receita():
    user_id = get_jwt_identity()
    user = user_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"msg": "Usuário inválido"}), 403

    data = request.json
    data["autor_id"] = user_id
    data["autor_nome"] = user["nome"]  # opcional: mostrar no frontend

    receitas_collection.insert_one(data)
    return (
        jsonify({"message": "Receita criada com sucesso!", "slug": data.get("slug")}),
        201,
    )


# GET - listar todas as receitas
@receitas_bp.route("", methods=["GET"])
def listar_receitas():
    receitas = list(receitas_collection.find({}, {"_id": 0}))
    return jsonify(receitas)


# ✅ GET - detalhes de uma receita por slug
@receitas_bp.route("/<slug>", methods=["GET"])
def detalhe_receita(slug):
    receita = receitas_collection.find_one({"slug": slug}, {"_id": 0})
    if receita:
        return jsonify(receita)
    return jsonify({"error": "Receita não encontrada"}), 404


# PUT - editar receita (somente autor ou admin)
@receitas_bp.route("/<slug>", methods=["PUT"])
def editar_receita(slug):
    user_id = get_jwt_identity()
    receita = receitas_collection.find_one({"slug": slug})
    if not receita:
        return jsonify({"msg": "Receita não encontrada"}), 404

    user = user_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"msg": "Usuário inválido"}), 403

    is_author = receita.get("autor_id") == user_id
    is_admin = user.get("role") == "admin"

    if not (is_author or is_admin):
        return jsonify({"msg": "Acesso negado"}), 403

    receitas_collection.update_one({"slug": slug}, {"$set": request.json})
    return jsonify({"msg": "Receita atualizada com sucesso"})


# POST - upload de imagem
@receitas_bp.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    filename = file.filename
    file.save(os.path.join(current_app.config["UPLOAD_FOLDER"], filename))
    return jsonify({"url": f"/uploads/{filename}"})
