import React from "react";
import ReactModal from "react-modal";
import classes from "./Modal.module.scss";

const modal = props => {
  return (
    <ReactModal
      className={classes.Modal}
      isOpen={props.isOpen}
      onRequestClose={props.handleCloseModal}
      ariaHideApp={false}>
      {props.children}
    </ReactModal>
  );
};

export default modal;
