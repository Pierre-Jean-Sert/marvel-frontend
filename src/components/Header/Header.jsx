/*

* MARVEL - Backend

* Header component

*/

//! Img import
import logo from "../../assets/marvel-logo.png";

//! Style import
import "./header.css";

//! Libraries import
import { Link } from "react-router-dom";

//! Hooks import

function Header() {
  //

  // Return
  return (
    <header>
      {/* Home */}
      <Link to="/">
        <div className="special">
          <p>Accueil</p>
        </div>
      </Link>

      {/* Comics */}
      <Link to="/comics">
        <div className="special">
          <p>Comics</p>
        </div>
      </Link>

      {/* Characters */}
      <Link to="/characters">
        <div className="special">
          <p>Personnages</p>
        </div>
      </Link>

      {/* Logo */}
      <div>
        <img src={logo} alt="Marvel logo" />
      </div>

      {/* Favorites */}
      <Link to="/favorites">
        <div className="special">
          <p>Mes favoris</p>
        </div>
      </Link>

      {/* Signup and Login */}
      <div className="connection">
        <button>S'inscrire</button>
        <button>Se connecter</button>
      </div>
    </header>
  );
}

export default Header;
