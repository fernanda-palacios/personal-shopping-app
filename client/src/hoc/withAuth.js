import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';


const withAuth = (WrappedComponent) => props => {
  
  const username = Cookies.get('username');

  if (username) {
    return <WrappedComponent {...props} />;
  } else {
    return <Redirect to='/'/>;
  }

}
 
export default withAuth;