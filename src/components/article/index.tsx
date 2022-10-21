import React, { useState } from "react";
import { ArticleType } from "../../types/article";
import ArticleForm from "./form";

import "./styles.scss";
import { useDeleteArticle } from "./useDelete";

const Article = (article: ArticleType) => {
  const { title, content, id } = article;
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleClickEdit = () => setIsFormVisible(true);

  const { requestDelete } = useDeleteArticle();

  const handleClickRemove = () => {
    requestDelete(id);
  };

  if (isFormVisible) {
    return <ArticleForm onClose={() => setIsFormVisible(false)} {...article} />;
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
