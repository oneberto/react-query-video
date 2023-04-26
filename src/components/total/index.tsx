import React from "react";
import "./styles.scss";
import { useQuery } from "@tanstack/react-query";


type Response = {total: number};

const TotalArticles = () => {
  const key =["articles-total"];

  const {isLoading, error, data} = useQuery<Response>(key, () => fetch("http://localhost:8081/articles-total").then((data) => data.json()));

if(isLoading){
  return <p>Carregando ...</p>
}
if(error){
  return <p>Error!!!</p>
}

  return (
    <div className="total">
      <strong>{data?.total}</strong>
      <p>Articles</p>
    </div>
  );
};

export default TotalArticles;
