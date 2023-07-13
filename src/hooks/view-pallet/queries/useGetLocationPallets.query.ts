import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IData {
  destination: string;
}

const get = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.VIEW_LOCATION_PALLET,
    method: "POST",
    data,
  });
  return res;
};

export const useGetLocationPalletsQuery = (data: IData) => {
  return useQuery(["user", "location-pallets", data.destination], () =>
    get(data)
  );
};
