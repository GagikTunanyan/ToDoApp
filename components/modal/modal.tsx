import React from "react";
import { Dialog } from "@reach/dialog";
import styles from "./modal.module.scss";

interface PropTypes {
    children?: JSX.Element | JSX.Element[];
    open: boolean,
    close: CallableFunction 
}

const Modal: React.FC<PropTypes> = (props) => {
    const { open, close, children } = props;
    return (
        <Dialog
            isOpen={open}
            onDismiss={(e) => close(e)}
            className={styles.Modal}
            aria-label="modal"
        >
            {children}
        </Dialog>
    )
};

export default Modal;