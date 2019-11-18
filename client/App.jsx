import React, { Component } from 'react';
import MainContainer from './Components/MainContainer';

import { connect } from 'react-redux';
import * as actions from './actions/action'

const mapDispatchToProps = dispatch => ({
  getTodo: () => dispatch(actions.getTodo())
})

class App extends Component {
  constructor(props) {
    super(props)
  }

  // onload - make a fetch request to the server to grab existing data from db
  componentDidMount() {
    this.props.getTodo();
  }

  render() { 
    return ( 
      <MainContainer />
     );
  }
}
 
export default connect(null, mapDispatchToProps)(App);