import { useMutation } from 'react-query';
import axios from 'axios';

const useDeleteList = () => {

  return useMutation(
    async listId => {
      return axios.delete(`/api/wishlist/${listId}`).then((res) => res.data)}
  )
}

export default useDeleteList;
