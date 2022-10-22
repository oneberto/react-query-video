import React, { useState } from "react";
import ListArticles from "./components/list";
import "./app.scss";
import TotalArticles from "./components/total";

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="app">
      <TotalArticles />

      <button className="toggle" type="button" onClick={() => setShow(!show)}>
        {show ? "Fechar" : "Abrir"}
      </button>

      {show && <ListArticles />}
    </div>
  );
}

export default App;
