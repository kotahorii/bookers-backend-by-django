import { apiUrl } from "../../url";
import axios from "axios";
import { useQuery } from "react-query";
import { Profile } from "../../types/loginTypes";

export const useQueryMyProf = () => {
  const getMyProf = async () => {
    const { data } = await axios.get<Profile[]>(`${apiUrl}api/myprofile/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return data[0];
  };
  return useQuery<Profile, Error>({
    queryKey: "myprof",
    queryFn: getMyProf,
    staleTime: 0,
  });
};
