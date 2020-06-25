import React from 'react';
import './IntroStyle.css';

class Intro extends React.Component {
    render() {
        return (
            <section className="intro">
                <div className="container">
                    <div className="intro__inner">
                        <h1 className="title intro__title">
                            Test assignment for Frontend Developer position
                        </h1>
                        <p className="paragraph intro__text">
                            We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck! The photo has to scale in the banner area on the different screens.
                        </p>
                        <p className="paragraph intro__text intro__text-mobile">
                            We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository.
                        </p>
                        <button className="primary-btn intro__btn">Sign up now</button>
                    </div>
                </div>
            </section>
        );
    }
}

export default Intro;