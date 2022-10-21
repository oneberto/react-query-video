import React, { useState } from "react";
import ListArticles from "./components/list";
import "./app.scss";

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="app">
      <button className="toggle" type="button" onClick={() => setShow(!show)}>
        {show ? "Fechar" : "Abrir"}
      </button>

      {show && <ListArticles />}
    </div>
  );
}

export default App;
