import { useMutation } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IData {
  palletId: string;
  location: string;
  itemId: string;
}

const get = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.MAP_PALLET_ITEM,
    method: "POST",
    data,
  });
  return res;
};

export const useMapItemPalletMutation = () => {
  return useMutation(get);
};
