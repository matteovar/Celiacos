import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Conta_usuario = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [receitas, setReceitas] = useState([]);

    useEffect(() => {
        if (!user) return;

        fetch("http://124.81.96.70:5000/api/receitas")
            .then((res) => res.json())
            .then((data) => {
                const minhas = data.filter((r) => r.autor_id === user.id);
                setReceitas(minhas);
            })
            .catch((err) => console.error("Erro ao carregar receitas:", err));
    }, [user]);

    if (!user) return <p className="text-center mt-10">Carregando usuário...</p>;

    return (
        <div className="p-6 max-w-4xl w-full mx-auto mt-6 ">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Minha Conta</h1>
                <button
                    onClick={() => navigate("/editar-conta")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Editar Conta
                </button>
            </div>




            <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
                    {user.nome?.charAt(0).toUpperCase()}
                </div>

                <div>
                    <p className="text-xl font-semibold">{user.nome}</p>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Minhas Receitas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {receitas.map(({ nome, slug, image, descricao, categoria }) => {
                    const titulo = nome;
                    const maxLength = 100;
                    const descricaoCurta =
                        descricao?.length > maxLength
                            ? descricao.slice(0, maxLength) + "… "
                            : descricao || "";

                    return (
                        <Link
                            to={`/receitas/${slug}`}
                            key={slug}
                            className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer bg-white"
                        >
                            <img
                                src={image}
                                alt={titulo}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{titulo}</h3>
                                <p className="text-gray-600 text-sm mb-1">
                                    Categoria: {categoria || "Não informada"}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    {descricaoCurta}
                                    {descricao?.length > maxLength && (
                                        <span className="text-red-700 hover:underline">
                                            ver mais
                                        </span>
                                    )}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>



        </div>
    );
};

export default Conta_usuario;
