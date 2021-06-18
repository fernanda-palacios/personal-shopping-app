import { useMutation } from 'react-query';
import axios from 'axios';

const useSignup = () => {


  return useMutation(
    values => axios.post('/auth/signup', values).then((res) => res.data)
  )
}

export default useSignup;