import { useMutation } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface Props {
  scan: string;
}

const scanPallet = async (data: Props) => {
  const res: TServerResponse = await request({
    url: apiUrls.dispatch.SCAN_PALLET_FOR_DISPATCH,
    method: "POST",
    data,
  });
  return res;
};

export const useScanPallet = () => {
  return useMutation(scanPallet);
};
