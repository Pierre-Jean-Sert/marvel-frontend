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

  const [page, setPage] = useState([]); // []

  // URL Builder
  const url = "http://localhost:3000/characters?limit=&skip=&name=";

  //useEffect to recover data from backend
  useEffect(() => {
    const fetchData = async () => {
      //

      try {
        // Axios request
        const response = await axios.get(url);

        //Response.data stocked in data state
        setData(response.data);

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
    <main className="container">
      {/* Title and search bar */}
      <section className="header-section">
        <h2>Characters</h2>
        <div>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input></input>
        </div>
      </section>

      {/* Characters */}
      {isLoading ? (
        <p>En cours de chargement...</p>
      ) : (
        <section className="result-section">
          <div className="page-buttons">
            <button>Previous</button>
            <p>Page</p>
            <button>Next</button>
          </div>

          <div className="character-list">
            {data.results.map((character, index) => {
              //
              // Img URL Builder ; size = portrait_fantastic
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
      )}
    </main>
  );
}

export default Characters;
