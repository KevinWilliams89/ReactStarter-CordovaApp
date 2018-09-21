import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Page1.css';

class Page1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Page 1'
    };
  }

  componentDidMount() {
    this.props.setHeaderTitle('Page 1');
  }

  render() {
    return <div className="Page1">{this.state.text}</div>;
  }
}

export default withRouter(Page1);
