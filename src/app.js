import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { confirm as Confirm } from './services/dialogs';
import { checkAuthenticated, logout } from './services/session';
import Routes from './routes';
import BaseView from './views/BaseView';

class App extends Component {
  constructor(props) {
    super(props);

    const auth = checkAuthenticated();
    const user = JSON.parse(localStorage.getItem('user'));

    this.state = {
      authenticated: auth.authenticated,
      user,
      title: 'Home',
      loading: false,
      loadingText: 'Loading...',
      menuOpen: false
    };

    document.addEventListener('deviceready', this.cordovaStarted, false);
  }

  componentWillReceiveProps() {
    window.previousLocation = this.props.location.pathname;
  }

  onAuthenticated = authenticated => {
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      authenticated,
      user
    });
  };

  onLogout = async () => {
    this.onSetLoading(true, 'Logging out...');
    await logout();
    this.onSetLoading(false);
    this.props.history.push({
      pathname: '/login',
      state: { transition: 'pageSlideUp', duration: 600 }
    });
    this.onAuthenticated(false);
  };

  onPromptLogout = () => {
    Confirm('Are you sure you want to log out? Please note any unsubmitted work will be lost', {
      title: 'Log out',
      confirmCallback: index => {
        if (index === 1) {
          this.onLogout();
        }
      }
    });
  };

  onSetHeaderTitle = title => {
    if (window.ga) {
      window.ga.trackView(title);
    }
    this.setState({ title });
  };

  onSetLoading = (loading, loadingText = 'Loading...') => {
    this.setState({
      loading,
      loadingText
    });
  };

  onSetMenuOpen = menuOpen => {
    this.setState({ menuOpen });
  };

  cordovaStarted = () => {
    if (window.cordova) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }

    /*
     * Initialise Google Analytics 
     */
    if (window.ga) {
      window.ga.setAnonymizeIp(true);
      window.ga.startTrackerWithId('UA-116084195-5', 30);
      window.ga.trackEvent('App', 'Start/Resume');
    } else {
      console.log('No Google Analytics plugin... must be running in browser.');
    }
  };

  render() {
    return (
      <div onClick={() => {}}>
        <BaseView
          title={this.state.title}
          loading={this.state.loading}
          loadingText={this.state.loadingText}
          menuOpen={this.state.menuOpen}
          setMenuOpen={this.onSetMenuOpen}
          logout={this.onLogout}
          promptLogout={this.onPromptLogout}
          user={this.state.user}
        >
          <Routes
            authenticated={this.state.authenticated}
            setAuthenticated={this.onAuthenticated}
            setHeaderTitle={this.onSetHeaderTitle}
            setLoading={this.onSetLoading}
          />
        </BaseView>
      </div>
    );
  }
}

export default withRouter(App);
