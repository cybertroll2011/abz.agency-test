import React from 'react';
import { Swipeable } from 'react-swipeable';
import './HeaderStyle.css';
import logo from '../../Assets/Images/logo.svg';
import burgerMenu from '../../Assets/Images/menu icon.svg';


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.handleMenuSwipe = this.handleMenuSwipe.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.moveToTop = this.moveToTop.bind(this);
    }

    componentDidMount() {
        let links = Array.from(document.querySelectorAll(".nav__link"));
        let sections = Array.from(document.querySelectorAll("section"));
        links.map(el => {
            let section = el.getAttribute("data-section");
            if (section === null) {
                // console.log(true);
            } else {
                // console.log(section);
            }
        })
    }

    handleLinkClick(event) {
        event.preventDefault();
        let sections = Array.from(document.querySelectorAll("section"));
        let linkTarget = event.target.getAttribute("data-section");
        let formOffset = document.querySelector(".registration-form").offsetTop;
        sections.map(el => {
            if (el.classList[0] === linkTarget) {
                window.scrollTo(0, el.offsetTop);
            } else if (linkTarget === null) {
                window.scrollTo(0, formOffset);
            }
        });
    }

    handleMobileLinkClick(event){
        event.preventDefault();
        let sections = Array.from(document.querySelectorAll("section"));
        let linkTarget = event.target.getAttribute("data-section");
        let formOffset = document.querySelector(".registration-form").offsetTop;
        sections.map(el => {
            if (el.classList[0] === linkTarget) {
                window.scrollTo(0, el.offsetTop);
            } else if (linkTarget === null) {
                window.scrollTo(0, formOffset);
            }
        });
        document.querySelector(".mobile-menu").classList = ["mobile-menu"];
        document.querySelector("body").classList = [""];
    }

    showMenu() {
        document.querySelector(".mobile-menu").classList = ["mobile-menu mobile-menu-active"];
        document.querySelector("body").classList = ["body__no-scroll"];
    }

    closeMenu(event) {
        if (event.target === document.querySelector(".mobile-menu-swipeable")) {
            document.querySelector(".mobile-menu").classList = ["mobile-menu"];
            document.querySelector("body").classList = [""];
        }
    }

    handleMenuSwipe(event) {
        if (event.dir === "Left") {
            document.querySelector(".mobile-menu").classList = ["mobile-menu"];
        }
    }

    moveToTop() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header__inner">
                        <div className="header__logo" onClick={this.moveToTop}>
                            <img src={logo} alt="logo" />
                        </div>
                        <nav className="nav">
                            <div className="desktop__links-wrapper">
                                <a href="/" className="nav__link" data-section="about" onClick={this.handleLinkClick}>About me</a>
                                <a href="/" className="nav__link" onClick={this.handleLinkClick}>Relationships</a>
                                <a href="/" className="nav__link" onClick={this.handleLinkClick}>Requirements</a>
                                <a href="/" className="nav__link" data-section="users" onClick={this.handleLinkClick}>Users</a>
                                <a href="/" className="nav__link" onClick={this.handleLinkClick}>Sign Up</a>
                            </div>
                        </nav>
                        <button className="show__nav" onClick={this.showMenu}>
                            <img src={burgerMenu} alt="" />
                        </button>
                    </div>
                </div>
                <div className="mobile-menu">
                    <Swipeable onSwiped={this.handleMenuSwipe}>
                        <div className="mobile-menu-swipeable" onClick={this.closeMenu}>
                            <div className="header__mobile-logo">
                                <img src={logo} alt="logo" />
                            </div>
                            <div className="mobile__links-wrapper">
                                <div className="mobile__links-group">
                                    <a href="/" className="nav__link" data-section="about" onClick={this.handleMobileLinkClick}>About me</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Relationships</a>
                                    <a href="/" className="nav__link" data-section="users" onClick={this.handleMobileLinkClick}>Users</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Sign Up</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Terms and Conditions</a>
                                </div>
                                <div className="mobile__links-group">
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>How it works</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Partnership</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Help</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Leave testimonial</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Contact us</a>
                                </div>
                                <div className="mobile__links-group">
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Articles</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Our news</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Testimonials</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Licenses</a>
                                    <a href="/" className="nav__link" onClick={this.handleMobileLinkClick}>Privacy Policy</a>
                                </div>
                            </div>
                        </div>
                    </Swipeable>
                </div>
            </header>
        );
    }
}

export default Header;