import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from './OrdersComponent';
import axios from '../../axios-orders';
import withErrorHandler from '../common/hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../common/UI/Spinner/Spinner';

const orders = props => {
  useEffect(() => {
    props.onFetchOrders(props.token, props.userId);
  }, []);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

// class Orders extends Component {
//   componentDidMount() {
//     this.props.onFetchOrders(this.props.token, this.props.userId);
//   }

//   render() {
//     let orders = <Spinner />;
//     if (!this.props.loading) {
//       orders = this.props.orders.map(order => (
//         <Order
//           key={order.id}
//           ingredients={order.ingredients}
//           price={order.price}
//         />
//       ));
//     }
//     return <div>{orders}</div>;
//   }
// }

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
