import React, { useState } from "react";
import { ArticleType } from "../../types/article";

type Props = ArticleType & { onClose(): void };

const ArticleForm = ({ onClose, ...initialState }: Props) => {
  const [state, setState] = useState<ArticleType>(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="article">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            autoFocus
          />
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={state.content}
            onChange={(e) => setState({ ...state, content: e.target.value })}
          />
        </div>
        <div className="right">
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
