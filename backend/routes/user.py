from bson import ObjectId
from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from models import user_collection

bcrypt = Bcrypt()

user_bp = Blueprint("user", __name__)


@user_bp.route("/register", methods=["POST"])
def registrar_usuario():
    data = request.json
    if user_collection.find_one({"email": data["email"]}):
        return jsonify({"msg": "E-mail já registrado"}), 409

    hashed = bcrypt.generate_password_hash(data["senha"]).decode("utf-8")
    user_collection.insert_one(
        {"nome": data["nome"], "email": data["email"], "senha": hashed}
    )
    return jsonify({"msg": "Usuário criado com sucesso"}), 201


@user_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = user_collection.find_one({"email": data["email"]})
    if user and bcrypt.check_password_hash(user["senha"], data["senha"]):
        access_token = create_access_token(identity=str(user["_id"]))
        return (
            jsonify(
                {
                    "token": access_token,
                    "user": {
                        "id": str(user["_id"]),
                        "nome": user["nome"],
                        "email": user["email"],
                        "role": user.get("role", "user"),  # padrão: 'user'
                    },
                }
            ),
            200,
        )
    return jsonify({"msg": "Credenciais inválidas"}), 401


@user_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = user_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        return jsonify({"msg": "Usuário não encontrado"}), 404
    return jsonify(
        {
            "id": str(user["_id"]),
            "nome": user["nome"],
            "email": user["email"],
            "role": user.get("role", "user"),
        }
    )

@user_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get('email')
    senha_atual = data.get('senhaAtual')
    nova_senha = data.get('novaSenha')

    if not email or not senha_atual or not nova_senha:
        return jsonify({"msg": "Email, senha atual e nova senha são obrigatórios"}), 400

    user = user_collection.find_one({"email": email})
    if not user:
        return jsonify({"msg": "Usuário não encontrado"}), 404

    # Verifica se senha atual bate
    if not bcrypt.check_password_hash(user['senha'], senha_atual):
        return jsonify({"msg": "Senha atual incorreta"}), 401

    # Gera hash da nova senha
    hashed = bcrypt.generate_password_hash(nova_senha).decode('utf-8')

    # Atualiza a senha
    result = user_collection.update_one(
        {"email": email},
        {"$set": {"senha": hashed}}
    )

    if result.modified_count == 1:
        return jsonify({"msg": "Senha alterada com sucesso!"}), 200
    else:
        return jsonify({"msg": "Nenhuma alteração feita"}), 400


