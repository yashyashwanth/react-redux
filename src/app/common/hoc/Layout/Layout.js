import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../AuxFile/AuxFile';
import classes from './Layout.css';
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

// class Layout extends Component {
//   state = {
//     showSideDrawer: false
//   };

//   sideDrawerClosedHandler = () => {
//     this.setState({ showSideDrawer: false });
//   };

//   sideDrawerToggleHandler = () => {
//     this.setState(prevState => {
//       return { showSideDrawer: !prevState.showSideDrawer };
//     });
//   };

//   render() {
//     return (
//       <Aux>
//         <Toolbar
//           isAuth={this.props.isAuthenticated}
//           drawerToggleClicked={this.sideDrawerToggleHandler}
//         />
//         <SideDrawer
//           isAuth={this.props.isAuthenticated}
//           open={this.state.showSideDrawer}
//           closed={this.sideDrawerClosedHandler}
//         />
//         <main className={classes.Content}>{this.props.children}</main>
//       </Aux>
//     );
//   }
// }

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);
