/*

* MARVEL - Backend

* Characters page

*/

//! Style import
import "./character.css";

//! Libraries import
import axios from "axios";
import { useLocation } from "react-router-dom";

//! Hooks import
import { useState, useEffect } from "react";

function Character() {
  //
  // Location destructuring
  const location = useLocation();
  const { characterId, characterDescription, characterName, characterImg } =
    location.state;

  //States
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // URL constructor
  const url = `https://site--marvel-backend--zs7p5ywqkq9f.code.run/comics/${characterId}`;

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

        //isLoading => false
        setIsLoading(false);

        //
      } catch (error) {
        console.log(error);
      }
    };

    //fetchData calling
    fetchData();
  }, []);

  // Return
  return (
    <>
      <main>
        {/* HEADER */}
        <section className="character-header-section">
          {/* Character image */}
          <div>
            <img
              className="character-img"
              src={characterImg}
              alt={characterName}
            />
          </div>

          {/* Character description */}
          <div className="character-description">
            <h2>{characterName}</h2>
            <p>{characterDescription}</p>
          </div>
        </section>

        {/* COMICS */}

        {isLoading ? (
          <p>En cours de chargement...</p>
        ) : (
          <section className="character-section">
            <div className="character-list">
              {data.comics.map((comic) => {
                //
                // Img URL constructor ; size = standard_fantastic
                const imgSrc =
                  comic.thumbnail.path +
                  "/" +
                  "standard_fantastic" +
                  "." +
                  comic.thumbnail.extension;

                //Return
                return (
                  <>
                    <div className="character-bloc">
                      <img src={imgSrc} alt="Character image" />
                      <h3>{comic.title}</h3>
                      {comic.description && <p>{comic.description}</p>}
                    </div>
                  </>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default Character;
