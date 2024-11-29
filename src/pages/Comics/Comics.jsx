/*

* MARVEL - Backend

* Comics page

*/

//! Style import
import "./comics.css";

//! Libraries import
import axios from "axios";

//! Hooks import
import { useState, useEffect } from "react";

function Comics({ comicsFav, setComicsFav }) {
  //

  //States
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState([1, 0, 0, 100]); // [page ; maxpage ; skip ; limit]

  // URL constructor
  const url = `https://site--marvel-backend--zs7p5ywqkq9f.code.run/comics?limit=${page[3]}&skip=${page[2]}&title=${search}`;

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
      <main className="comics-main">
        {/* Title and search bar */}
        <section className="comics-header-section">
          <h2>COMICS</h2>
        </section>

        {/* A TRAITER */}

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
                    placeholder="SEARCH"
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
                        setPage(newTab);
                      }
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Comics */}
              <div className="comics-list">
                {data.results.map((comic, index) => {
                  //
                  // Img URL constructor ; size = standard_xlarge
                  const imgSrc =
                    comic.thumbnail.path +
                    "/" +
                    "standard_xlarge" +
                    "." +
                    comic.thumbnail.extension;

                  //Return
                  return (
                    <>
                      <div className="comics-bloc">
                        <img src={imgSrc} alt="Comic image" />
                        {/* Bookmarks TODO */}
                        <div className="bookmarks" onClick={() => {}}>
                          <i className="fa-regular fa-bookmark"></i>
                        </div>
                        <h3>{comic.title}</h3>
                        {comic.description && <p>{comic.description}</p>}
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

export default Comics;
