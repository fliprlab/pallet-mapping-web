import { useMutation } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface Props {
  scan: string;
  pallet: string;
}

const scanLocation = async (data: Props) => {
  const res: TServerResponse = await request({
    url: apiUrls.dispatch.SCAN_LOCATION_FOR_DISPATCH,
    method: "POST",
    data,
  });
  return res;
};

export const useScanLocation = () => {
  return useMutation(scanLocation);
};
