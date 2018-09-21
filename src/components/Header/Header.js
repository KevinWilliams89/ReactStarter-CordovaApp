import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  getTitle() {
    return <h1 className="title">{this.props.title}</h1>;
  }

  getHeader() {
    const { pathname } = this.props.location;

    if (/^\/page3\/.+$/i.test(pathname)) {
      // match /page3/:id route
      return (
        <div>
          <i className="fa fa-chevron-left" onClick={this.handleBackClick} />
          {this.getTitle()}
        </div>
      );
    }
    return (
      <div>
        <i className="fa fa-bars" onClick={() => this.props.setMenuOpen(true)} />
        {this.getTitle()}
        <i className="fa fa-sign-out" onClick={() => this.props.promptLogout()} />
      </div>
    );
  }

  handleBackClick = () => {
    this.props.history.push({
      pathname: window.previousLocation,
      state: { transition: 'pageSliderLeft', duration: 600 }
    });
  };

  render() {
    return <header>{this.getHeader()}</header>;
  }
}

export default withRouter(Header);
