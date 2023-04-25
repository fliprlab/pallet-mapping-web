import { useQuery } from "@tanstack/react-query";
import { request } from "../../../services/axios.service";
import { apiUrls } from "../../api-urls";

interface IData {
  locations: string[];
}

const get = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.GET_PICK_UP_ITEMS,
    method: "POST",
    data,
  });
  return res;
};

export const useGetPickUpItemsQuery = (data: IData) => {
  return useQuery(["user", "get-pick-up-items", data.locations], () =>
    get(data)
  );
};
