import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../common/UI/Button/Button';
import Spinner from '../../common/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../common/UI/Input/Input';
import withErrorHandler from '../../common/hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
import { updateObject, checkValidity } from '../../../utils';

const contactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your E-Mail'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

// class ContactData extends Component {
//   state = {
//     orderForm: {
//       name: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Your Name"
//         },
//         value: "",
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },
//       street: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Street"
//         },
//         value: "",
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },
//       zipCode: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "ZIP Code"
//         },
//         value: "",
//         validation: {
//           required: true,
//           minLength: 5,
//           maxLength: 5,
//           isNumeric: true
//         },
//         valid: false,
//         touched: false
//       },
//       country: {
//         elementType: "input",
//         elementConfig: {
//           type: "text",
//           placeholder: "Country"
//         },
//         value: "",
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },
//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "email",
//           placeholder: "Your E-Mail"
//         },
//         value: "",
//         validation: {
//           required: true,
//           isEmail: true
//         },
//         valid: false,
//         touched: false
//       },
//       deliveryMethod: {
//         elementType: "select",
//         elementConfig: {
//           options: [
//             { value: "fastest", displayValue: "Fastest" },
//             { value: "cheapest", displayValue: "Cheapest" }
//           ]
//         },
//         value: "fastest",
//         validation: {},
//         valid: true
//       }
//     },
//     formIsValid: false
//   };

//   orderHandler = event => {
//     event.preventDefault();

//     const formData = {};
//     for (let formElementIdentifier in this.state.orderForm) {
//       formData[formElementIdentifier] = this.state.orderForm[
//         formElementIdentifier
//       ].value;
//     }
//     const order = {
//       ingredients: this.props.ings,
//       price: this.props.price,
//       orderData: formData,
//       userId: this.props.userId
//     };

//     this.props.onOrderBurger(order, this.props.token);
//   };

//   inputChangedHandler = (event, inputIdentifier) => {
//     const updatedFormElement = updateObject(
//       this.state.orderForm[inputIdentifier],
//       {
//         value: event.target.value,
//         valid: checkValidity(
//           event.target.value,
//           this.state.orderForm[inputIdentifier].validation
//         ),
//         touched: true
//       }
//     );
//     const updatedOrderForm = updateObject(this.state.orderForm, {
//       [inputIdentifier]: updatedFormElement
//     });

//     let formIsValid = true;
//     for (let inputIdentifier in updatedOrderForm) {
//       formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
//     }
//     this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
//   };

//   render() {
//     const formElementsArray = [];
//     for (let key in this.state.orderForm) {
//       formElementsArray.push({
//         id: key,
//         config: this.state.orderForm[key]
//       });
//     }
//     let form = (
//       <form onSubmit={this.orderHandler}>
//         {formElementsArray.map(formElement => (
//           <Input
//             key={formElement.id}
//             elementType={formElement.config.elementType}
//             elementConfig={formElement.config.elementConfig}
//             value={formElement.config.value}
//             invalid={!formElement.config.valid}
//             shouldValidate={formElement.config.validation}
//             touched={formElement.config.touched}
//             changed={event => this.inputChangedHandler(event, formElement.id)}
//           />
//         ))}
//         <Button btnType="Success" disabled={!this.state.formIsValid}>
//           ORDER
//         </Button>
//       </form>
//     );
//     if (this.props.loading) {
//       form = <Spinner />;
//     }
//     return (
//       <div className={classes.ContactData}>
//         <h4>Enter your Contact Data</h4>
//         {form}
//       </div>
//     );
//   }
// }

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
