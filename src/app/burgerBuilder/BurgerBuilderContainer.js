import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../common/hoc/AuxFile/AuxFile';
import Burger from './Burger/Burger';
import BuildControls from './Burger/BuildControls/BuildControls';
import Modal from '../common/UI/Modal/Modal';
import OrderSummary from '../orders/OrderSummary/OrderSummary';
import Spinner from '../common/UI/Spinner/Spinner';
import withErrorHandler from '../common/hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import axios from '../../axios-orders';

const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...props.ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
          price={props.price}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

// export class BurgerBuilder extends Component {
//   // constructor(props) {
//   //     super(props);
//   //     this.state = {...}
//   // }

//   state = {
//     purchasing: false
//   };

//   componentDidMount() {
//     this.props.onInitIngredients();
//   }

//   updatePurchaseState(ingredients) {
//     const sum = Object.keys(ingredients)
//       .map(igKey => {
//         return ingredients[igKey];
//       })
//       .reduce((sum, el) => {
//         return sum + el;
//       }, 0);
//     return sum > 0;
//   }

//   purchaseHandler = () => {
//     if (this.props.isAuthenticated) {
//       this.setState({ purchasing: true });
//     } else {
//       this.props.onSetAuthRedirectPath("/checkout");
//       this.props.history.push("/auth");
//     }
//   };

//   purchaseCancelHandler = () => {
//     this.setState({ purchasing: false });
//   };

//   purchaseContinueHandler = () => {
//     this.props.onInitPurchase();
//     this.props.history.push("/checkout");
//   };

//   render() {
//     const disabledInfo = {
//       ...this.props.ings
//     };
//     for (let key in disabledInfo) {
//       disabledInfo[key] = disabledInfo[key] <= 0;
//     }
//     let orderSummary = null;
//     let burger = this.props.error ? (
//       <p>Ingredients can't be loaded!</p>
//     ) : (
//       <Spinner />
//     );

//     if (this.props.ings) {
//       burger = (
//         <Aux>
//           <Burger ingredients={this.props.ings} />
//           <BuildControls
//             ingredientAdded={this.props.onIngredientAdded}
//             ingredientRemoved={this.props.onIngredientRemoved}
//             disabled={disabledInfo}
//             purchasable={this.updatePurchaseState(this.props.ings)}
//             ordered={this.purchaseHandler}
//             isAuth={this.props.isAuthenticated}
//             price={this.props.price}
//           />
//         </Aux>
//       );
//       orderSummary = (
//         <OrderSummary
//           ingredients={this.props.ings}
//           price={this.props.price}
//           purchaseCancelled={this.purchaseCancelHandler}
//           purchaseContinued={this.purchaseContinueHandler}
//         />
//       );
//     }
//     // {salad: true, meat: false, ...}
//     return (
//       <Aux>
//         <Modal
//           show={this.state.purchasing}
//           modalClosed={this.purchaseCancelHandler}
//         >
//           {orderSummary}
//         </Modal>
//         {burger}
//       </Aux>
//     );
//   }
// }

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(burgerBuilder, axios));
