import {useMutation} from '@tanstack/react-query';
import {request} from '../../../services/axios.service';
import {apiUrls} from '../../api-urls';

interface IData {
  shipmentId: string;
  gridId: string;
}

const pickUp = async (data: IData) => {
  const res: TServerResponse = await request({
    url: apiUrls.PICK_UP_ITEM,
    method: 'POST',
    data,
  });
  return res;
};

export const usePickUpItemMutation = () => {
  return useMutation(pickUp);
};
