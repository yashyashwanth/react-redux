import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from './CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        {/* <Suspense fallback={<p>Loading...</p>}> */}
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
        {/* </Suspense> */}
      </div>
    );
  }

  return summary;
};

// class Checkout extends Component {
//   checkoutCancelledHandler = () => {
//     props.history.goBack();
//   };

//   checkoutContinuedHandler = () => {
//     props.history.replace("/checkout/contact-data");
//   };

//   render() {
//     let summary = <Redirect to="/" />;
//     if (props.ings) {
//       const purchasedRedirect = props.purchased ? (
//         <Redirect to="/" />
//       ) : null;
//       summary = (
//         <div>
//           {purchasedRedirect}
//           <CheckoutSummary
//             ingredients={props.ings}
//             checkoutCancelled={this.checkoutCancelledHandler}
//             checkoutContinued={this.checkoutContinuedHandler}
//           />
//           {/* <Suspense fallback={<p>Loading...</p>}> */}
//           <Route
//             path={props.match.path + "/contact-data"}
//             component={ContactData}
//           />
//           {/* </Suspense> */}
//         </div>
//       );
//     }

//     return summary;
//   }
// }

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(checkout);
