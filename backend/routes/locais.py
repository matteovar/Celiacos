from flask import Blueprint, jsonify, request
from models import locais_collection

locais_bp = Blueprint("locais", __name__)


@locais_bp.route("", methods=["GET"])
def listar_locais():
    locais = list(locais_collection.find({}, {"_id": 0}))
    return jsonify(locais)


@locais_bp.route("", methods=["POST"])
def adicionar_local():
    data = request.json
    locais_collection.insert_one(data)
    return jsonify({"message": "Local adicionado!"}), 201
