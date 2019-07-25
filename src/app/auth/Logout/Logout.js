import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

const logout = props => {
  // componentDidMount() {
  useEffect(() => {
    props.onLogout();
  }, []);
  // }

  return <Redirect to="/" />;
};

// class Logout extends Component {
//   componentDidMount() {
//     this.props.onLogout();
//   }

//   render() {
//     return <Redirect to="/" />;
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(logout);
