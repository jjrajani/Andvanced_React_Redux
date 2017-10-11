import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class UserList extends Component {
    componentWillMount() {
        this.props.fetchUsers();
    }
    renderUser(user, i) {
        return (
            <div className="card card-block" key={i}>
                <h4 className="card-title">
                    {user.name}
                </h4>
                <p className="card-text">
                    {user.company.name}
                </p>
                <a href={user.website} className="btn btn-primary">
                    Webiste
                </a>
            </div>
        );
    }
    render() {
        return (
            <div className="row user-list">
                {this.props.users.map(this.renderUser)}
            </div>
        );
    }
}

function mapStateToProps({ users }) {
    return { users };
}

export default connect(mapStateToProps, {
    fetchUsers: actions.fetchUsers
})(UserList);
