import { useMutation } from 'react-query';
import axios from 'axios';

const useSignin = () => {
  return useMutation(
    values => axios.get('/auth/signout', values).then((res) => res.data)
  )
}

export default useSignin;