import axios from "axios";
import { useQuery } from "react-query";
import { Profile } from "../../types/loginTypes";
import { apiUrl } from "../../url";

export const useQueryProfs = () => {
  const getProfs = async () => {
    const { data } = await axios.get<Profile[]>(`${apiUrl}api/profile/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return data;
  };
  return useQuery<Profile[], Error>({
    queryKey: "Profs",
    queryFn: getProfs,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
