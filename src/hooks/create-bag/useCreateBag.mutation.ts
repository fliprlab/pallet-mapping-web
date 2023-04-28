import {useMutation} from '@tanstack/react-query';
import {request} from '../../services/axios.service';
import {apiUrls} from '../api-urls';

interface IData {
  palletId: string;
  items: string[];
  location: string;
}

const create = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.CREATE_BAG,
    method: 'POST',
    data,
  });
  return res;
};

export const useCreateBagMutation = () => {
  return useMutation(create);
};
