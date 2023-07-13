import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IData {
  pallet: string;
}

const get = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.GET_PALLET_ITEMS,
    method: "POST",
    data,
  });
  return res;
};

export const useGetPalletItemsQuery = (data: IData) => {
  return useQuery(["user", "pallets/items", data.pallet], () => get(data));
};
