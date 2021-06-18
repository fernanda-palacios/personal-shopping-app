import { useMutation } from 'react-query';
import axios from 'axios';

const useAddWishlistItem = () => {

  return useMutation(
    async data => {
      return axios.post(`/api/wishlist/${data.listId}/item`, data.values).then((res) => res.data)}
  )
}

export default useAddWishlistItem;