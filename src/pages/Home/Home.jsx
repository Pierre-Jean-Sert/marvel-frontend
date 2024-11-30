/*

* MARVEL - Backend

* Home page

*/
//! Style import
import "./home.css";

//! Libraries import
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-main">
      <div className="home-title">
        <h1>Bienvenue sur le site de Marvel</h1>
        <p>Vous retrouverez ici vos comics et personnages préférés !</p>
      </div>

      <Link to="/comics">
        <section className="comics-home-section">
          <h2>COMICS</h2>
        </section>
      </Link>

      <Link to="/characters">
        <section className="characters-home-section">
          <h2>PERSONNAGES</h2>
        </section>{" "}
      </Link>

      <Link to="/favorites">
        <section className="favorites-home-section">
          <h2>MES FAVORIS</h2>
        </section>{" "}
      </Link>
    </main>
  );
}

export default Home;
