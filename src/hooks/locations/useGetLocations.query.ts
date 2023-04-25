import { useQuery } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { apiUrls } from "../api-urls";

const get = async () => {
  const res: TServerResponse = await request({
    url: apiUrls.GET_LOCATIONS,
    method: "GET",
  });
  return res;
};

export const useGetLocationsQuery = () => {
  return useQuery(["user", "get-locations"], get);
};
