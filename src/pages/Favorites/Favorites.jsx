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
  const [charactersData, setCharactersData] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkRefresh, setBookmarkRefresh] = useState(false);

  //* Cookies management
  // Get comics cookies or empty tab if
  const comicBookmarks = Cookies.get("comicBookmarks")
    ? JSON.parse(Cookies.get("comicBookmarks"))
    : [];

  // Get characters cookies or empty tab if
  const characterBookmarks = Cookies.get("characterBookmarks")
    ? JSON.parse(Cookies.get("characterBookmarks"))
    : [];

  //* Request

  //useEffect to recover data from backend
  useEffect(() => {
    //
    const fetchData = async () => {
      //
      // URL constructor
      const comicUrls = comicBookmarks.map(
        (comicId) =>
          `https://site--marvel-backend--zs7p5ywqkq9f.code.run/comic/${comicId}`
      );

      const characterUrls = characterBookmarks.map(
        (characterId) =>
          `https://site--marvel-backend--zs7p5ywqkq9f.code.run/character/${characterId}`
      );

      try {
        // Axios request for each url
        const comicResponses = await Promise.all(
          comicUrls.map((url) => axios.get(url))
        );

        const characterResponses = await Promise.all(
          characterUrls.map((url) => axios.get(url))
        );

        // Get data from request
        const comicResults = comicResponses.map((response) => response.data);

        const characterResults = characterResponses.map(
          (response) => response.data
        );

        // update each state
        setComicsData(comicResults);
        setCharactersData(characterResults);

        //isLoading => false
        setIsLoading(false);

        //
      } catch (error) {
        console.log(error);
      }
    };

    //fetchData calling
    fetchData();
  }, [bookmarkRefresh]);

  // Return
  return (
    <>
      <main className="favorites-main">
        {/* Button */}
        <section className="favorites-header-section">
          <button
            onClick={() => {
              Cookies.remove("comicBookmarks");
              Cookies.remove("characterBookmarks");
              setBookmarkRefresh(!bookmarkRefresh);
            }}
          >
            Effacer mes favoris
          </button>
        </section>

        <section className="favorites-section">
          {isLoading ? (
            <p>En cours de chargement...</p>
          ) : (
            <>
              <h3>Comics</h3>
              {comicBookmarks.length === 0 ? (
                <p>Aucun comic favoris</p>
              ) : (
                <>
                  {/* Comics */}
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
                </>
              )}

              <h3>Personnages</h3>
              {characterBookmarks.length === 0 ? (
                <p>Aucun personnage favoris</p>
              ) : (
                <>
                  {/* Characters */}
                  <div className="favorites-list">
                    {charactersData.map((comic) => {
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
                            <h3>{comic.name}</h3>
                            <img src={imgSrc} alt="Comic image" />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default Favorites;
