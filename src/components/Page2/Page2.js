import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Page2.css';

class Page2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Page 2'
    };
  }

  componentDidMount() {
    this.props.setHeaderTitle('Page 2');
  }

  render() {
    return <div className="Page2">{this.state.text}</div>;
  }
}

export default withRouter(Page2);
