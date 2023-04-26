import React from "react";
import { ArticleType } from "../../types/article";
import Article from "../article";
import { useQuery } from "@tanstack/react-query";

type Response = ArticleType[];

const ListArticles = () => {

  const key = ["articles"]

  const {isLoading, error, data} = useQuery<Response>(key, ()=> fetch("http://localhost:8081/articles").then(data => data.json()));

if(isLoading){
  return <p>Carregando Artigos ...</p>
}
if(error){
  return <p>Erro ao carregar artigos !!!</p>
}

  return (
    <div style={{ border: "1px solid #ccc" }}>
      {data?.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
};

export default ListArticles;
