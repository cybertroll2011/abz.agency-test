import React from 'react';
import './RegistrationStyle.css';

import Modal from './Modal';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            positions: [],
            name: "",
            email: "",
            number: "",
            image: "",
            position_id: "",
            popupMessage: "",
            isRegistrationSuccessfull: false,
            showModal: false,
            bodyClasslist: []
        }
        this.handleInputName = this.handleInputName.bind(this);
        this.handleInputMail = this.handleInputMail.bind(this);
        this.handleInputNumber = this.handleInputNumber.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        this.handleInputFile = this.handleInputFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    async componentDidMount() {
        await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    this.setState({ token: data.token });
                }
            })
        await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    this.setState({ positions: data.positions });
                }
            })
    }

    handleInputName(event) {
        let length = event.target.value.length;
        String.prototype.capitalize = function (allWords) {
            return (allWords) ? // if all words
                this.split(' ').map(word => word.capitalize()).join(' ') : //break down phrase to words then  recursive calls until capitalizing all words
                this.charAt(0).toUpperCase() + this.slice(1); // if allWords is undefined , capitalize only the first word , mean the first char of the whole string
        }
        let value = event.target.value.capitalize(true);
        event.target.value = value;
        this.setState({
            name: event.target.value
        });
        if (length >= 2 && length <= 60) {
            event.target.classList = ["form__input"];
        } else {
            event.target.classList = ["form__input form__input-error"];
        }
    }

    handleInputMail(event) {
        let value = event.target.value;
        let length = value.length;
        this.setState({
            email: value
        });
        if (length >= 2 && length <= 60 && value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            event.target.classList = ["form__input"];
        } else {
            event.target.classList = ["form__input form__input-error"];
        }
    }

    handleInputNumber(event) {
        let value = event.target.value;
        this.setState({
            number: value
        });
        if (value.match(/^[\+]{0,1}380([0-9]{9})$/)) {
            event.target.classList = ["form__input"];
        } else {
            event.target.classList = ["form__input form__input-error"];
        }
    }

    handleRadio(event) {
        let positionData = {
            name: event.target.value,
            id: event.target.getAttribute("data-postid")
        }
        if (positionData.name !== "" && positionData.id !== "") {
            this.setState({
                position_id: positionData.id
            });
        }
    }

    handleInputFile(event) {
        let text = document.querySelector(".form__upload-photo input[type='text']");
        text.value = event.target.files[0].name;
        let imgWidth = 0;
        let imgHeight = 0;

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (e) {
            let image = new Image();
            image.src = e.target.result;

            image.onload = function () {
                imgHeight = this.height;
                imgWidth = this.width;
            }
        }

        if (event.target.files[0].size <= 5242880 && event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/jpg" && imgWidth >= 70 && imgHeight >= 70) {
            event.target.classList = ["form__input"];
            this.setState({
                image: event.target.value
            });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        let token = this.state.token;
        let message = "";
        let isRegistrationSuccessfull = this.state.isRegistrationSuccessfull;
        let fileField = document.querySelector('input[type="file"]');

        let formData = new FormData();
        formData.append("position_id", parseInt(this.state.position_id));
        formData.append("name", this.state.name);
        formData.append("email", this.state.email);
        formData.append("phone", this.state.number);
        formData.append("photo", fileField.files[0]);

        await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
            method: 'POST',
            body: formData,
            headers: {
                'Token': token, // get token with GET api/v1/token method
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                message = data.message;
                isRegistrationSuccessfull = data.success;
                if (data.success) {
                    // process success response 
                } else {
                    // proccess server errors 
                }
            })
            .catch(function (error) {
                // proccess network errors 
                console.log(error);
            });
        this.setState({
            popupMessage: message,
            isRegistrationSuccessfull,
            showModal: true,
        }, () => {
            document.querySelector("body").classList = ["body__no-scroll"];
        });
    }

    closeModal() {
        this.setState({
            showModal: false,
            bodyClasslist: [""]
        }, () => {
            document.querySelector("body").classList = [""];
        });
    }

    render() {
        let positionButtons = this.state.positions.map((el) => (
            <div className="form__radio-wrapper" key={el.name} onClick={this.handleRadio}>
                {el.id === 1 ?
                    <input type="radio"
                        value={el.name}
                        data-postid={el.id}
                        defaultChecked
                        name="form-radio"
                        className="form__radio-btn"
                        id={"form__radio-" + el.name} /> :
                    <input type="radio"
                        value={el.name}
                        data-postid={el.id}
                        name="form-radio"
                        className="form__radio-btn"
                        id={"form__radio-" + el.name} />}
                <label htmlFor={"form__radio-" + el.name} className="form__radio-label">
                    {el.name}
                </label>
            </div>
        ));
        return (
            <section className="registration-form">
                <div className="container">
                    <div className="registration-form__inner">
                        <h2 className="title registration-form__title">
                            Register to get a work
                        </h2>
                        <p className="paragraph registration-form__subtitle">
                            Attention! After successful registration and alert, update the list of users in the block from the top
                        </p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form__inputs">
                                <div className="form__input-wrapper">
                                    <label htmlFor="form__input-name" className="form__label">
                                        Name
                                    </label>
                                    <input type="name" className="form__input" id="form__input-name" placeholder="Your name" required onChange={this.handleInputName} value={this.state.name} />
                                </div>
                                <div className="form__input-wrapper">
                                    <label htmlFor="form__input-email" className="form__label">
                                        Email
                                    </label>
                                    <input type="email" className="form__input" id="form__input-email" placeholder="Your email" required onChange={this.handleInputMail} value={this.state.email} />
                                </div>
                                <div className="form__input-wrapper">
                                    <label htmlFor="form__input-email" className="form__label">
                                        Phone number
                                    </label>
                                    <input type="text" className="form__input" id="form__input-number" placeholder="+380 XX XXX XX XX" required onChange={this.handleInputNumber} value={this.state.number} />
                                    <span className="form__input-assistive-text">
                                        Еnter phone number in open format
                                    </span>
                                </div>
                            </div>  {/* <--- form inputs ---> */}

                            <div className="form__select-position">
                                <p className="form__label">
                                    Select your position
                                </p>
                                {positionButtons}
                            </div>
                            <div className="form__upload-photo">
                                <p className="form__label">
                                    Photo
                                </p>
                                <div className="form__upload-wrapper">
                                    <input type="file" onChange={this.handleInputFile} required />
                                    <input type="text" placeholder="Upload your photo" />
                                    <input type="button" value="Browse" />

                                    <div className="tooltip">
                                        Minimum size of photo 70x70px. The photo format must be jpeg/jpg type. The photo size must not be greater than 5 Mb.
                                    </div>
                                </div>
                            </div>
                            {/* submit button */}
                            {this.state.name !== "" && this.state.email !== "" && this.state.number !== "" && this.state.image !== "" && this.state.position_id !== "" ?
                                <input type="submit"
                                    className="primary-btn form__submit"
                                    value="Sign up now"
                                    onClick={this.handleSubmit} /> :
                                <input type="button"
                                    className="primary-btn primary-btn-disabled form__submit"
                                    value="Sign up now" />
                            }
                        </form>
                    </div>
                </div>
                <Modal message={this.state.popupMessage}
                    showModal={this.state.showModal}
                    isRegistrationSuccessfull={this.state.isRegistrationSuccessfull}
                    closeModal={this.closeModal} />
            </section>
        );
    }
}

export default RegistrationForm;