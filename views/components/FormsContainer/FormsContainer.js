'use strict';

import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import PropTypes from 'prop-types';

export default class FormsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.setAuthStatus = this.setAuthStatus.bind(this);

        this.state = { isAuthenticated: false };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isAuthenticated !== nextState.isAuthenticated;
    }

    setAuthStatus(isAuthenticated) {
        this.setState({ isAuthenticated });
    }

    render() {
        return (
            <div>
                {['/signin', '/signup'].map(url =>
                    <AuthForm
                        isAuthenticated={this.state.isAuthenticated}
                        setAuthStatus={this.setAuthStatus}
                        actionUrl={url}
                    />
                )}
            </div>
        );
    }
}

FormsContainer.propTypes = {
    isAuthenticated: PropTypes.bool
};