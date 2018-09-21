import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import cloudURL from '../../services/cloud';
import { alert as Alert } from '../../services/dialogs';
import NRLogo from '../../images/nr_white.png';
import './Login.css';

class Login extends Component {
  static defaultProps = {
    background: 'red'
  };

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userPassword: ''
    };

    if (window.ga) {
      window.ga.trackView('Login');
    }
  }

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.login();
    }
  };

  onSubmit = event => {
    event.preventDefault();
  };

  login = async () => {
    if (window.cordova) {
      window.cordova.plugins.Keyboard.close();
    }

    if (!this.validForm()) {
      Alert('Please enter your username and password.', { title: 'Login' });
      return;
    }

    this.props.setLoading(true, 'Logging in...');

    try {
      const resp = await axios({
        method: 'POST',
        url: `${cloudURL()}/login`,
        data: {
          userName: this.state.userName,
          userPassword: this.state.userPassword
        }
      });

      axios.defaults.headers.common['X-FH-Session-Token'] = resp.data.SessionToken;

      console.log('Response body:');
      console.log(JSON.stringify(resp.data.body));
      localStorage.setItem('sessionID', resp.data.SessionToken);
      localStorage.setItem('authenticated', true);
      localStorage.setItem('user', JSON.stringify(resp.data.body));

      this.props.setAuthenticated(true);
      this.props.history.push({
        pathname: '/',
        state: { transition: 'pageSlideDown', duration: 600 }
      });
      this.props.setLoading(false);
    } catch (e) {
      console.log('err: ', e);
      this.props.setLoading(false);
      Alert(
        'Unable to log in. Please check you are online and have entered the correct username and password combination.',
        { title: 'Error' }
      );
    }
  };

  validForm = () => this.state.userName !== '' && this.state.userPassword !== '';

  render() {
    return (
      <div className="Login">
        <div className="background-svg" />
        <div className="login-svg">
          <svg height="1250" width="1250">
            <polygon points="0,300 1250,0 0,500" fill="#00374c" />
            <polygon points="0,1400 1250,0 0,2100" fill="#00374c" />
            <polygon points="1100,1250 1250,0 1250,1250" fill="#00374c" />
          </svg>
        </div>
        <div className="container-flex">
          <div className="login-title">App</div>
          <form className="login-box" onSubmit={this.onSubmit}>
            <div className="login-inputs">
              <div className="login-input">
                <input
                  type="text"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.onInputChange}
                  onKeyPress={this.onKeyPress}
                  placeholder="Username"
                  autoCapitalize="off"
                />
                <i className="fa fa-user" />
              </div>
              <div className="split" />
              <div className="login-input">
                <input
                  type="password"
                  name="userPassword"
                  value={this.state.userPassword}
                  onChange={this.onInputChange}
                  onKeyPress={this.onKeyPress}
                  placeholder="Password"
                />
                <i className="fa fa-lock" />
              </div>
            </div>
            <button type="button" onClick={this.login}>
              Login
            </button>
          </form>
          <img className="login-logo" src={NRLogo} alt="logo" />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
