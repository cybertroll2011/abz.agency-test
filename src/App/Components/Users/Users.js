import React from 'react';
import './UsersStyle.css';

import UserCard from './UserCard';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            currUsersPage: 1,
            totalUserPages: "",
            usersArr: []
        }
        this.loadMoreUsers = this.loadMoreUsers.bind(this);
    }

    async componentDidMount() {
        let mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
        let dataArr = {};
        await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.success) {
                    dataArr = data;
                    console.log(data);
                } else {
                    console.log(data.message);
                }
            });
        this.setState({
            usersArr: dataArr.users,
            totalUserPages: dataArr.total_pages,
            isLoaded: true
        });
    }

    async loadMoreUsers() {
        this.setState({ isLoaded: false });
        let usersArr = this.state.usersArr;
        let currPage = this.state.currUsersPage;
        currPage++;
        await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currPage}&count=6`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.success) {
                    data.users.map(el => usersArr.push(el));
                } else {
                    console.log(data.message);
                }
            });
        this.setState({
            usersArr,
            currUsersPage: currPage,
            isLoaded: true
        });
    }

    render() {
        let users = this.state.usersArr.map((el) => (
            <UserCard
                key={el.id}
                photo={el.photo}
                name={el.name}
                post={el.position}
                email={el.email}
                phone={el.phone} />
        ));
        return (
            <section className="users">
                <div className="container">
                    <div className="users__inner">
                        <h2 className="title users__title">
                            Our cheerful users
                        </h2>
                        <p className="paragraph user__subtitle">
                            Attention! Sorting users by registration date
                        </p>

                        {/* users cards */}
                        {this.state.isLoaded ? <div className="users__items">{users}</div> : <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}

                        {/* button show more  */}
                        {this.state.currUsersPage !== this.state.totalUserPages ? <button className="primary-btn users__btn" onClick={this.loadMoreUsers}>Show more</button> : <button className="primary-btn primary-btn-disabled users__btn">No more users</button>}
                    </div>
                </div>
            </section>
        );
    }
}

export default Users;