import {useMutation} from '@tanstack/react-query';
import {request} from '../../services/axios.service';
import {apiUrls} from '../api-urls';

interface IData {
  palletId: string;
  location: string;
  gridId: string;
}
const mapped = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.MAPPED_GRID,
    method: 'POST',
    data,
  });
  return res;
};

export const useMappedGridMutation = () => {
  return useMutation(mapped);
};
