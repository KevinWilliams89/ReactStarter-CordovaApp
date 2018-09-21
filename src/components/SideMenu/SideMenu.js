import React, { Component } from 'react';
import './SideMenu.css';

export default class SideMenu extends Component {
  static defaultProps = {
    menuOpen: false,
    background: '#fff'
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    this.props.setMenuOpen(!this.props.menuOpen);
  }

  render() {
    let openClass = '';
    if (this.props.menuOpen) {
      openClass = 'open';
    }

    return (
      <div className={openClass}>
        <div className="container" style={{ background: this.props.background }}>
          {this.props.children}
        </div>
        <div className="overlay" onClick={this.toggle} />
      </div>
    );
  }
}
