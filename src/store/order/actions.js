import * as types from "./types";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: types.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: types.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: types.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: types.INIT_PURCHASE_BURGER,
    orderData: orderData,
    token: token
  };
};

export const purchaseInit = () => {
  return {
    type: types.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: types.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: types.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: types.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: types.INIT_FETCH_ORDERS,
    token: token,
    userId: userId
  };
};
