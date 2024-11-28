/*

* MARVEL - Backend

* Characters page

*/

//! Style import
import "./characters.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useEffect } from "react";

function Characters() {
  //

  //States
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState([1, 0, 0, 100]); // [page ; maxpage ; skip ; limit]

  // URL constructor
  const url = `http://localhost:3000/characters?limit=${page[3]}&skip=${page[2]}&name=${search}`;

  //useEffect to recover data from backend
  useEffect(() => {
    const fetchData = async () => {
      //

      try {
        // Axios request
        const response = await axios.get(url);

        //Response.data stocked in data state
        setData(response.data);

        // Paging constructor
        const pageNumber = Math.ceil(data.count / 100);
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
      {isLoading ? (
        <p>En cours de chargement...</p>
      ) : (
        <main>
          <div className="container">
            {/* Title and search bar */}
            <section className="header-section">
              <h2>Characters</h2>
              <div className="search">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  id="search"
                  type="text"
                  placeholder="SEARCH"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  value={search}
                ></input>
              </div>
            </section>

            <section className="result-section">
              {/* Paging */}
              <div className="page-buttons">
                <button
                  onClick={() => {
                    if (page[0] > 1) {
                      // setPage
                      const newTab = [...page];
                      newTab[0] = newTab[0] - 1;
                      newTab[2] = (newTab[0] - 1) * 100;
                      console.log(newTab[2]);

                      setPage(newTab);
                    }
                  }}
                >
                  Previous
                </button>
                <p>Page {page[0]}</p>
                <button
                  onClick={() => {
                    if (page[0] < page[1]) {
                      // setPage
                      const newTab = [...page];
                      newTab[0] = newTab[0] + 1;
                      newTab[2] = (newTab[0] - 1) * 100;
                      console.log(newTab[2]);
                      setPage(newTab);
                    }
                  }}
                >
                  Next
                </button>
              </div>

              {/* Characters */}
              <div className="character-list">
                {data.results.map((character, index) => {
                  //
                  // Img URL constructor ; size = portrait_fantastic
                  const imgSrc =
                    character.thumbnail.path +
                    "/" +
                    "portrait_fantastic" +
                    "." +
                    character.thumbnail.extension;

                  //Return
                  return (
                    <>
                      <div className="character-sheet" key={index}>
                        <img key={imgSrc} src={imgSrc} alt={character.name} />
                        <div className="character-description">
                          <p className="character-name" key={character.name}>
                            {character.name}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}

export default Characters;
