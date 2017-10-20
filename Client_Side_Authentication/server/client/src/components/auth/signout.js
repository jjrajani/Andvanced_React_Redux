import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    componentWillMount() {
        this.props.signOut();
    }

    render() {
        return <div>Sorry to see you go...</div>;
    }
}

export default connect(null, {
    signOut: actions.signOut
})(Signout);
