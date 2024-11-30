/*

* MARVEL - Backend

* Characters page

*/

//! Style import
import "./characters.css";

//! Libraries import
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

//! Hooks import
import { useState, useEffect } from "react";

function Characters() {
  //

  //States
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState([1, 0, 0, 100]); // [page ; maxpage ; skip ; limit]
  const [bookmarkRefresh, setBookmarkRefresh] = useState(false);

  //* Cookies management
  // Get cookies or empty tab if
  const characterBookmarks = Cookies.get("characterBookmarks")
    ? JSON.parse(Cookies.get("characterBookmarks"))
    : [];

  console.log(characterBookmarks);

  //addToFavorites sub-function (for comics)
  function addToFavorites(characterId) {
    // Check if comic is already in cookies
    if (!characterBookmarks.includes(characterId)) {
      characterBookmarks.push(characterId);
      Cookies.set("characterBookmarks", JSON.stringify(characterBookmarks));
      setBookmarkRefresh(!bookmarkRefresh); // used to refresh page and therefore change the bookmarg image
    }
  }

  // URL constructor
  const url = `https://site--marvel-backend--zs7p5ywqkq9f.code.run/characters?limit=${page[3]}&skip=${page[2]}&name=${search}`;

  //useEffect to recover data from backend
  useEffect(() => {
    //
    const fetchData = async () => {
      //
      try {
        // Axios request
        const response = await axios.get(url);

        //Response.data stocked in data state
        setData(response.data);

        // Paging constructor
        const pageNumber = Math.ceil(response.data.count / 100);
        const newTab = [...page];
        newTab[1] = pageNumber;
        setPage(newTab);

        //isLoading => false
        setIsLoading(false);

        //
      } catch (error) {
        console.log(error);
      }
    };

    //fetchData calling
    fetchData();
  }, [url]);

  // Return
  return (
    <>
      <main className="characters-main">
        {/* Title */}
        <section className="characters-header-section">
          <h2>PERSONNAGES</h2>
        </section>

        {isLoading ? (
          <p>En cours de chargement...</p>
        ) : (
          <div className="container">
            <section className="characters-result-section">
              {/* Paging and search */}
              <div className="characters-paging">
                <div className="characters-search">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    id="search"
                    type="text"
                    placeholder="RECHERCHER..."
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    value={search}
                  ></input>
                </div>

                <div className="characters-buttons">
                  <button
                    onClick={() => {
                      if (page[0] > 1) {
                        // setPage
                        const newTab = [...page];
                        newTab[0] = newTab[0] - 1;
                        newTab[2] = (newTab[0] - 1) * 100;
                        setPage(newTab);
                      }
                    }}
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <p>Page {page[0]}</p>
                  <button
                    onClick={() => {
                      if (page[0] < page[1]) {
                        // setPage
                        const newTab = [...page];
                        newTab[0] = newTab[0] + 1;
                        newTab[2] = (newTab[0] - 1) * 100;
                        setPage(newTab);
                      }
                    }}
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              {/* Characters */}
              <div className="characters-list">
                {data.results.map((character, index) => {
                  //
                  // Img URL constructor ; size = portrait_fantastic
                  const imgSrc =
                    character.thumbnail.path +
                    "/" +
                    "portrait_fantastic" +
                    "." +
                    character.thumbnail.extension;

                  const imgSrc2 =
                    character.thumbnail.path +
                    "/" +
                    "standard_fantastic" +
                    "." +
                    character.thumbnail.extension;

                  //Return
                  return (
                    <>
                      <div className="characters-sheet" key={index}>
                        <img key={imgSrc} src={imgSrc} alt={character.name} />

                        {/* Bookmarks */}
                        <div
                          className="characters-bookmarks"
                          onClick={() => {
                            addToFavorites(character._id);
                          }}
                        >
                          {characterBookmarks.includes(character._id) ? (
                            <i className="fa-solid fa-bookmark"></i>
                          ) : (
                            <i className="fa-regular fa-bookmark"></i>
                          )}
                        </div>

                        <Link
                          to="/character"
                          state={{
                            characterId: character._id,
                            characterDescription: character.description,
                            characterName: character.name,
                            characterImg: imgSrc2,
                          }}
                        >
                          <div className="characters-description">
                            <p className="characters-name" key={character.name}>
                              {character.name}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
}

export default Characters;
