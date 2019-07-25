import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../hoc/AuxFile/AuxFile';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   );
  // }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

// class Modal extends Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     return (
//       nextProps.show !== this.props.show ||
//       nextProps.children !== this.props.children
//     );
//   }

//   render() {
//     return (
//       <Aux>
//         <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
//         <div
//           className={classes.Modal}
//           style={{
//             transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
//             opacity: this.props.show ? "1" : "0"
//           }}
//         >
//           {this.props.children}
//         </div>
//       </Aux>
//     );
//   }
// }

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
