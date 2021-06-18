import { useMutation } from 'react-query';
import axios from 'axios';

const useSignin = () => {
  return useMutation(
    values => axios.post('/auth/signin', values).then((res) => res.data)
  )
}

export default useSignin;