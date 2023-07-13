import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IData {
  _id: string;
}

const get = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.REMOVE_PALLET_ITEM,
    method: "POST",
    data,
  });
  return res;
};

export const useRemovePalletItemMutation = (pallet: string) => {
  const queryClient = useQueryClient();
  return useMutation(get, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "pallets/items", pallet]);
    },
  });
};
