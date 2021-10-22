import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import { ReadBook } from "../../types/bookTypes";
import { apiUrl } from "../../url";

export const useMutationBooks = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteBookMutation = useMutation(
    (id: string) =>
      axios.delete(`${apiUrl}api/book/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        const previousBooks = queryClient.getQueryData<ReadBook[]>("books");
        if (previousBooks) {
          queryClient.setQueryData<ReadBook[]>(
            "books",
            previousBooks.filter((book) => book.id !== variables)
          );
        }
      },
      onError: () => {
        navigate("login/");
      },
    }
  );
  return { deleteBookMutation };
};
