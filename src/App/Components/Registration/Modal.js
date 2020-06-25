import React from 'react';
import './ModalStyle.css';

class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.showModal === true) {
            return (
                <div className="modal">
                    <div className="modal__inner">
                        <div className="modal__inner-top">
                            {this.props.isRegistrationSuccessfull ?
                            <div className="modal__inner-title secondary-title">
                                    Congratulations
                            </div> :
                            <div className="modal__inner-title secondary-title">
                                    Error
                            </div>}
                            <button
                                className="modal__inner-close"
                                onClick={this.props.closeModal}>
                                <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                    <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal__inner-main">
                            <p className="paragraph">
                                {this.props.message}
                            </p>
                        </div>
                        <div className="modal__inner-bottom">
                            <button
                                className="primary-btn"
                                onClick={this.props.closeModal}>Great</button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return false;
        }
    }
}

export default Modal;