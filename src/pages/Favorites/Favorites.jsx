/*

* MARVEL - Backend

* Favorites page

*/

//! Style import
import "./favorite.css";

//! Libraries import
import axios from "axios";
import Cookies from "js-cookie";

//! Hooks import
import { useState, useEffect } from "react";

//* FAVORITES FUNCTION
function Favorites() {
  //

  //* States
  const [comicsData, setComicsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkRefresh, setBookmarkRefresh] = useState(false);

  //* Cookies management
  // Get cookies or empty tab if
  const comicBookmarks = Cookies.get("comicBookmarks")
    ? JSON.parse(Cookies.get("comicBookmarks"))
    : [];

  console.log("Cookies des comics =>", comicBookmarks);

  //* Request

  //useEffect to recover data from backend
  useEffect(() => {
    //
    const fetchData = async () => {
      //
      // URL constructor
      const urls = comicBookmarks.map(
        (comicId) =>
          `https://site--marvel-backend--zs7p5ywqkq9f.code.run/comic/${comicId}`
      );

      try {
        // Effectuer une requête pour chaque URL
        const responses = await Promise.all(urls.map((url) => axios.get(url)));

        // Extraire les données des réponses
        const results = responses.map((response) => response.data);

        // Mettre à jour votre state avec les données récupérées
        setComicsData(results);

        // Désactiver le chargement
        setIsLoading(false);

        //
      } catch (error) {
        console.log(error);
      }
    };

    //fetchData calling
    fetchData();
    console.log("State comicsData ===>", comicsData);
  }, [bookmarkRefresh]);

  // Return
  return (
    <>
      <main className="favorites-main">
        {/* Title */}
        <section className="favorites-header-section">
          <h2>MES FAVORIS</h2>
          <button
            onClick={() => {
              Cookies.remove("comicBookmarks");
              setBookmarkRefresh(!bookmarkRefresh);
            }}
          >
            Effacer mes favoris
          </button>
        </section>

        <section className="favorites-section">
          <h3>Comics</h3>
          {isLoading ? (
            <p>En cours de chargement...</p>
          ) : (
            <div className="favorites-list">
              {comicsData.map((comic) => {
                //
                // Img URL constructor ; size = standard_medium
                const imgSrc =
                  comic.thumbnail.path +
                  "/" +
                  "standard_xlarge" +
                  "." +
                  comic.thumbnail.extension;

                //Return
                return (
                  <>
                    <div className="favorites-bloc">
                      <h3>{comic.title}</h3>
                      <img src={imgSrc} alt="Comic image" />
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Favorites;
