import axios from 'axios';
import moment from 'moment';
import cloudURL from './cloud';

export function checkAuthenticated() {
  const authenticated = localStorage.getItem('authenticated');
  if (authenticated !== 'true') {
    console.log('User not authenticated');
    return {
      authenticated: false,
      sessionExpired: false
    };
  }
  // Check session hasn't expired
  let tokenExpiry = null;
  try {
    tokenExpiry = new Date(JSON.parse(localStorage.getItem('user')).tokenExpiry);

    if (!tokenExpiry || !moment().isBefore(tokenExpiry)) {
      // Session has expired, not authenticated
      localStorage.setItem('authenticated', false);
      return {
        authenticated: false,
        sessionExpired: true
      };
    }
    // User is authenticated
    axios.defaults.headers.common['X-FH-Session-Token'] = localStorage.getItem('sessionID');

    return {
      authenticated: true,
      sessionExpired: false
    };
  } catch (err) {
    console.log('Error getting tokenExpiry ', err);
    return {
      authenticated: false,
      sessionExpired: false
    };
  }
}

export async function logout() {
  localStorage.removeItem('sessionID');
  localStorage.removeItem('authenticated');
  localStorage.removeItem('user');

  try {
    const resp = await axios({
      method: 'POST',
      url: `${cloudURL()}/login/clear`
    });

    console.log('Response body:');
    console.log(JSON.stringify(resp.data));
  } catch (e) {
    console.log('err: ', e);
  }
}
