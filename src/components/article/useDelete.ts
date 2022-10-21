import { useMutation, useQueryClient } from "react-query";
import { getArticlesKey } from "../../keys";

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  const request = (id: string) =>
    fetch(`http://localhost:8081/articles/${id}`, {
      method: "DELETE",
    });

  const {
    isLoading: isLoadingDelete,
    error: errorDelete,
    mutate: requestDelete,
  } = useMutation(request, {
    onSuccess: () => {
      queryClient.invalidateQueries(getArticlesKey);
    },
  });

  return { isLoadingDelete, errorDelete, requestDelete };
};
