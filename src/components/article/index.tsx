import React, { useState } from "react";
import { ArticleType } from "../../types/article";
import ArticleForm from "./form";

import "./styles.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Article = (article: ArticleType) => {
  const { title, content } = article;
  const [isFormVisible, setIsFormVisible] = useState(false);

  const client = useQueryClient();

  const handleClickEdit = () => setIsFormVisible(true);

  const deleteMutation = useMutation(
    (id: string) =>
      fetch(`http://localhost:8081/articles/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => {
        client.invalidateQueries(["articles"]);
        client.invalidateQueries(["articles-total"]);
      },
      onError: () => {
        console.log("Error!");
      },
    }
  );

  const editMutation = useMutation(
    (body: ArticleType) =>
      fetch(`http://localhost:8081/articles/${body.id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    {
      onSuccess: () => {
        setIsFormVisible(false);
        client.invalidateQueries(["articles"]);
      },
    }
  );

  const handleClickRemove = () => {
    deleteMutation.mutate(article.id);
  };

  const handleSubmitEdit = (data: ArticleType) => {
    console.log({ data });

    editMutation.mutate(data);
  };

  if (deleteMutation?.isLoading) {
    return <p>Apagando artigo ...</p>;
  }

  if (isFormVisible) {
    return (
      <ArticleForm
        onSubmit={handleSubmitEdit}
        onClose={() => setIsFormVisible(false)}
        {...article}
      />
    );
  }

  return (
    <div className="article">
      <div className="left">
        <strong>{title}</strong>
        <p>{content}</p>
      </div>

      <div className="right">
        <button type="button" onClick={handleClickEdit}>
          Editar
        </button>
        <button type="button" onClick={handleClickRemove}>
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Article;
