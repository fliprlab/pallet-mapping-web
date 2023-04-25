import { useMutation } from "@tanstack/react-query";
import { request } from "../../services/axios.service";
import { apiUrls } from "../api-urls";

interface IData {
  palletId: string;
  location: string;
}

const validate = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.GRID_CHECK_VALID_PALLET,
    method: "POST",
    data,
  });
  return res;
};

export const useGridCheckValidPalletMutation = () => {
  return useMutation(validate);
};
