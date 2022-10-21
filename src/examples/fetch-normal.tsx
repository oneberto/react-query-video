import React, { useCallback, useEffect, useRef, useState } from "react";
import Article from "../components/article";
import { ArticleType } from "../types/article";

type Response = ArticleType[];

const AppNormal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState<Response>();

  const wasRequested = useRef(false);

  const request = useCallback(async () => {
    try {
      setLoading(true);

      const result = await fetch("http://localhost:8081/articles");

      const resultJson = await result.json();

      if (!resultJson) {
        throw new Error();
      }

      setResponse(resultJson);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!wasRequested.current) {
      wasRequested.current = true;
      request();
    }
  }, [request]);

  if (loading) {
    return <strong>Loading...</strong>;
  }

  if (error) {
    return <strong>Error!</strong>;
  }

  return (
    <div>
      {response?.map((article) => (
        <Article key={article.id} {...article} />
      ))}
    </div>
  );
};

export default AppNormal;
