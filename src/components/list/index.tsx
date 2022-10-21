import React from "react";
import { ArticleType } from "../../types/article";
import Article from "../article";

let articles: ArticleType[] = [
  {
    id: "fb20005e-7244-4573-b758-efa9225a5f17",
    title: "Title 1",
    content: "Content 1",
  },
  {
    id: "a6670985-77c6-4af8-8033-3fd77c53cd3c",
    title: "Title 2",
    content: "Content 2",
  },
  {
    id: "1ac3fc37-145b-4cda-a809-aaca7ee431c5",
    title: "Title 3",
    content: "Content 3",
  },
  {
    id: "2a8bb3f2-db39-4dc3-aa72-63e83ee02ff7",
    title: "Title 4",
    content: "Content 4",
  },
];

const ListArticles = () => {
  return (
    <div>
      {articles?.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
};

export default ListArticles;
