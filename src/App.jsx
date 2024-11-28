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

//! Components import
import Header from "./components/Header/Header";

//! Hooks import

//* APP FUNCTION
function App() {
  //
  // Shared states

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
