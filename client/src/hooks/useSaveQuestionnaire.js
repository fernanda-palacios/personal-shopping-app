import { useMutation } from 'react-query';
import axios from 'axios';

const useSaveQuestionnaire = () => {
  return useMutation(
    values => axios.post('/api/onboarding', values).then((res) => res.data)
  )
}

export default useSaveQuestionnaire;