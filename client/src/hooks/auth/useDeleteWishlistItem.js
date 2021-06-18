import { useMutation } from 'react-query';
import axios from 'axios';

const useDeleteWishlistItem = () => {

  return useMutation(
    async item_id => {
      return axios.delete(`/api/wishlist/item/${item_id}`).then((res) => res.data)}
  )
}

export default useDeleteWishlistItem;
