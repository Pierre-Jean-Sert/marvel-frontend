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
        <h1>Welcome to the Marvel website</h1>
        <p>Find your favorite comics and characters</p>
      </div>

      <Link to="/comics">
        <section className="comics-home-section">
          <h2>COMICS</h2>
        </section>
      </Link>

      <Link to="/characters">
        <section className="characters-home-section">
          <h2>CHARACTERS</h2>
        </section>{" "}
      </Link>

      <Link to="/">
        <section className="favorites-home-section">
          <h2>FAVORITES</h2>
        </section>{" "}
      </Link>
    </main>
  );
}

export default Home;
