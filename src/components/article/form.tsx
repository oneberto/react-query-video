import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getArticlesKey } from "../../keys";
import { ArticleType } from "../../types/article";

type Props = ArticleType & { onClose(): void };

const ArticleForm = ({ onClose, ...initialState }: Props) => {
  const queryClient = useQueryClient();

  const [state, setState] = useState<ArticleType>(initialState);

  const request = (body: ArticleType) =>
    fetch(`http://localhost:8081/articles/${initialState.id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

  const { isLoading, error, mutate } = useMutation(request, {
    onSuccess: () => {
      queryClient.invalidateQueries(getArticlesKey);
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(state);
  };

  if (error) {
    return (
      <div className="article">
        <div className="left">
          <strong>Desculpe, tivemos um problema...</strong>
        </div>
        <button type="button" onClick={() => mutate(state)}>
          Tente novamente
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <strong>Carregando...</strong>;
  }

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
