import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import asyncComponent from "./common/hoc/asyncComponent/asyncComponent";
import Layout from './common/hoc/Layout/Layout';
import BurgerBuilder from './burgerBuilder/BurgerBuilderContainer';
import Logout from './auth/Logout/Logout';
import * as actions from '../store/actions';

const Checkout = React.lazy(() => {
  return import('./checkout/CheckoutContainer');
});

const Orders = React.lazy(() => {
  return import('./orders/OrdersContainer');
});

const Auth = React.lazy(() => {
  return import('./auth/AuthContainer');
});

const app = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

// class App extends Component {
//   componentDidMount() {
//     this.props.onTryAutoSignup();
//   }

//   render() {
//     let routes = (
//       <Switch>
//         <Route path="/auth" render={() => <Auth />} />
//         <Route path="/" exact component={BurgerBuilder} />
//         <Redirect to="/" />
//       </Switch>
//     );

//     if (this.props.isAuthenticated) {
//       routes = (
//         <Switch>
//           <Route path="/checkout" render={() => <Checkout></Checkout>} />
//           <Route path="/orders" render={() => <Orders></Orders>} />
//           <Route path="/logout" component={Logout} />
//           <Route path="/auth" render={() => <Auth />} />
//           <Route path="/" exact component={BurgerBuilder} />
//           <Redirect to="/" />
//         </Switch>
//       );
//     }

//     return (
//       <div>
//         <Layout>
//           <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
//         </Layout>
//       </div>
//     );
//   }
// }

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(app)
);
