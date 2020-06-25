import React from 'react';
import 'react-tippy/dist/tippy.css';

class UserCard extends React.Component {
    render() {
        return (
            <div className="user__card">
                <div className="user__photo">
                    <img src={this.props.photo} className="user__photo" alt="" />
                </div>
                <div className="user__name-wrapper">
                    <p className="user__name secondary-title">{this.props.name}</p>
                    <div className="tooltip">
                        {this.props.name}
                    </div>
                </div>
                <p className="user__post paragraph">{this.props.post}</p>
                <div className="user__email-wrapper">
                    <a href={"mailto:" + this.props.email} className="user__email paragraph" >
                        {this.props.email}
                    </a>
                    <div className="tooltip">
                        {this.props.email}
                    </div>
                </div>
                <a href={"tel:" + this.props.phone} className="user__phone paragraph">{this.props.phone}</a>
            </div>
        );
    }
}

export default UserCard;