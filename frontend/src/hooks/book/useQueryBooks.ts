import axios from "axios";
import { useQuery } from "react-query";
import { ReadBook } from "../../types/bookTypes";
import { apiUrl } from "../../url";
export const useQueryBooks = () => {
  const getBooks = async () => {
    const { data } = await axios.get<ReadBook[]>(`${apiUrl}api/book/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return data;
  };
  return useQuery<ReadBook[], Error>({
    queryKey: "books",
    queryFn: getBooks,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
