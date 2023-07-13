import { useMutation } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IData {
  scan: string;
}

const pickUp = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.SCAN_LOCATION,
    method: "POST",
    data,
  });
  return res;
};

export const useScanLocationMutation = () => {
  return useMutation(pickUp);
};
