/*

* MARVEL - Backend

* App function

*/

//! Style import
import "./App.css";

//! Libraries import
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//! Pages import
import Home from "./pages/Home/Home";
import Comics from "./pages/Comics/Comics";
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Characters/Character";
import Favorites from "./pages/Favorites/Favorites";

//! Components import
import Header from "./components/Header/Header";

//* APP FUNCTION
function App() {
  //

  // Return
  return (
    <>
      <Router>
        {/* HEADER */}
        <Header></Header>

        {/* ROUTES */}
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home></Home>}></Route>

          {/* COMICS */}
          <Route path="/comics" element={<Comics></Comics>}></Route>

          {/* CHARACTERS */}
          <Route path="/characters" element={<Characters></Characters>}></Route>

          {/* CHARACTER */}
          <Route path="/character" element={<Character></Character>}></Route>

          {/* FAVORITES */}
          <Route path="/favorites" element={<Favorites></Favorites>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
