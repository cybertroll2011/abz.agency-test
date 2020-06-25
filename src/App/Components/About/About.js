import React from 'react';
import './AboutStyle.css';

import manPic from '../../Assets/Images/man-laptop-v1.svg';

class About extends React.Component {
    render() {
        return (
            <section className="about">
                <div className="container">
                    <div className="about__inner">
                        <h2 className="title about__title">
                            Let's get acquainted
                        </h2>
                        <div className="about__items-wrapper">
                            <div className="about__item-left">
                                <img src={manPic} alt="" />
                            </div>
                            <div className="about__item-right">
                                <p className="secondary-title">
                                    I am cool frontend developer.
                                </p>
                                <p className="paragraph">
                                    We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.
                                </p>
                                <p className="paragraph">
                                    If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3.
                                </p>
                                <button className="secondary-btn">Sign up now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;