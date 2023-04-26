import React, { useState } from "react";
import ListArticles from "./components/list";
import "./app.scss";
import TotalArticles from "./components/total";
import ArticleForm from "./components/article/form";
import { ArticleType } from "./types/article";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const [show, setShow] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const client = useQueryClient()

  const { isLoading, mutate } = useMutation(
    (body: ArticleType) =>
      fetch(`http://localhost:8081/articles`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    {
      onSuccess: () => {
        setShowCreateForm(false);
        client.invalidateQueries(["articles"])
        client.invalidateQueries(["articles-total"])
      },
    }
  );

  const hendleSubmitCreate = (data: ArticleType) => {
    mutate(data);
  };

  return (
    <div className="app">
      <TotalArticles />

      <div style={{ display: "flex" }}>
        <button
          style={{ marginRight: "auto" }}
          className="toggle"
          type="button"
          onClick={() => setShow(!show)}
        >
          {show ? "Fechar" : "Abrir"}
        </button>

        <button
          style={{ margin: 0 }}
          className="toggle"
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancelar" : "Criar"}
        </button>
      </div>
      {isLoading && <p>Criando artigo</p>}
      {showCreateForm && (
        <ArticleForm
          id=""
          title=""
          content=""
          onSubmit={hendleSubmitCreate}
          onClose={() => setShowCreateForm(false)}
        />
      )}

      {show && <ListArticles />}
    </div>
  );
}

export default App;
