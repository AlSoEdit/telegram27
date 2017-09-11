'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Profile.css';

export default class Profile extends Component {
    render() {
        const { user } = this.props;

        return (
            <p className="login">
                {user ? `Login: ${user.login}` : null}
            </p>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.shape({
        login: PropTypes.string.isRequired
    }).isRequired
};
