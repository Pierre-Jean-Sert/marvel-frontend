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
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Characters/Character";
import Comics from "./pages/Comics/Comics";

//! Components import
import Header from "./components/Header/Header";

//! Hooks import

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

          {/* CHARACTERS */}
          <Route path="/characters" element={<Characters></Characters>}></Route>

          {/* CHARACTER */}
          <Route path="/character" element={<Character></Character>}></Route>

          {/* COMICS */}
          <Route path="/comics" element={<Comics></Comics>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
