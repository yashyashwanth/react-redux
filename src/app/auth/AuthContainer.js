import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../common/UI/Input/Input';
import Button from '../common/UI/Button/Button';
import Spinner from '../common/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions';
import { updateObject, checkValidity } from '../../utils';

const auth = props => {
  const [controls, setcontrols] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    }
  });
  const [isSignup, setIsSignup] = useState(true);

  // componentDidMount() {
  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath();
    }
  }, []);
  // }

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true
      })
    });
    setcontrols(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
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
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button clicked={switchAuthModeHandler} btnType="Danger">
        SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
};

// class Auth extends Component {
//   state = {
//     controls: {
//       email: {
//         elementType: "input",
//         elementConfig: {
//           type: "email",
//           placeholder: "Mail Address"
//         },
//         value: "",
//         validation: {
//           required: true,
//           isEmail: true
//         },
//         valid: false,
//         touched: false
//       },
//       password: {
//         elementType: "input",
//         elementConfig: {
//           type: "password",
//           placeholder: "Password"
//         },
//         value: "",
//         validation: {
//           required: true,
//           minLength: 6
//         },
//         valid: false,
//         touched: false
//       }
//     },
//     isSignup: true
//   };

//   componentDidMount() {
//     if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
//       this.props.onSetAuthRedirectPath();
//     }
//   }

//   inputChangedHandler = (event, controlName) => {
//     const updatedControls = updateObject(this.state.controls, {
//       [controlName]: updateObject(this.state.controls[controlName], {
//         value: event.target.value,
//         valid: checkValidity(
//           event.target.value,
//           this.state.controls[controlName].validation
//         ),
//         touched: true
//       })
//     });
//     this.setState({ controls: updatedControls });
//   };

//   submitHandler = event => {
//     event.preventDefault();
//     this.props.onAuth(
//       this.state.controls.email.value,
//       this.state.controls.password.value,
//       this.state.isSignup
//     );
//   };

//   switchAuthModeHandler = () => {
//     this.setState(prevState => {
//       return { isSignup: !prevState.isSignup };
//     });
//   };

//   render() {
//     const formElementsArray = [];
//     for (let key in this.state.controls) {
//       formElementsArray.push({
//         id: key,
//         config: this.state.controls[key]
//       });
//     }

//     let form = formElementsArray.map(formElement => (
//       <Input
//         key={formElement.id}
//         elementType={formElement.config.elementType}
//         elementConfig={formElement.config.elementConfig}
//         value={formElement.config.value}
//         invalid={!formElement.config.valid}
//         shouldValidate={formElement.config.validation}
//         touched={formElement.config.touched}
//         changed={event => this.inputChangedHandler(event, formElement.id)}
//       />
//     ));

//     if (this.props.loading) {
//       form = <Spinner />;
//     }

//     let errorMessage = null;

//     if (this.props.error) {
//       errorMessage = <p>{this.props.error.message}</p>;
//     }

//     let authRedirect = null;
//     if (this.props.isAuthenticated) {
//       authRedirect = <Redirect to={this.props.authRedirectPath} />;
//     }

//     return (
//       <div className={classes.Auth}>
//         {authRedirect}
//         {errorMessage}
//         <form onSubmit={this.submitHandler}>
//           {form}
//           <Button btnType="Success">SUBMIT</Button>
//         </form>
//         <Button clicked={this.switchAuthModeHandler} btnType="Danger">
//           SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
//         </Button>
//       </div>
//     );
//   }
// }

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(auth);
