import { useMutation } from 'react-query';
import axios from 'axios';

const useCreateNewList = () => {

  return useMutation(
    async values => {
      return axios.post(`/api/wishlist`, values).then((res) => res.data)}
  )
}

export default useCreateNewList;