import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IData {
  scan: string;
}

const get = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.GET_DISPATCH_ITEMS,
    method: "POST",
    data,
  });
  return res;
};

export const useDispatchPalletItemsQuery = (data: IData) => {
  return useQuery(["user", "dispatch-items", data.scan], () => get(data), {
    enabled: false,
  });
};
