import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="shadow-lg bg-gradient-to-r from-[#8B0000] via-[#C0392B] to-[#E74C3C] text-white p-1 items-center">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-3xl font-serif">
          Celicando
        </Link>
        <nav className="flex flex-1 items-center justify-end">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link
                to="/receitas"
                className="text-base text-white hover:text-gray-200"
              >
                Receitas
              </Link>
            </li>
            <li>
              <Link
                to="/locais"
                className="text-base text-white hover:text-gray-200"
              >
                Locais
              </Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-base text-white hover:text-gray-200"
                  >
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-base text-white hover:text-gray-200"
                  >
                    Registrar
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="text-base text-white">Olá, {user.nome}</li>
                <li>
                  <button
                    onClick={logout}
                    className="text-base text-white hover:text-gray-200"
                  >
                    Sair
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
