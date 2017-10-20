import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
    componentDidMount() {
        this.props.fetchMessage();
    }
    render() {
        return (
            <div>
                Feature
                {this.props.message &&
                    <p>
                        {this.props.message}
                    </p>}
            </div>
        );
    }
}

function mapStateToProps({ feature }) {
    return { message: feature };
}

export default connect(mapStateToProps, {
    fetchMessage: actions.fetchMessage
})(Feature);
