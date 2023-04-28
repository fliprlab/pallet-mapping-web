import {useMutation} from '@tanstack/react-query';
import {request} from '../../services/axios.service';
import {apiUrls} from '../api-urls';

interface IData {
  palletId: string;
}

const status = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.CHECK_PALLET_STATUS,
    method: 'POST',
    data,
  });

  return res;
};

export const useCheckPalletStatusMutation = () => {
  return useMutation(status);
};
