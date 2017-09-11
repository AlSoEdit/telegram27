'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shouldNotBeEmpty } from '../../../constants/errors';
import { notAuthenticatedRoutes, authenticatedRoutes } from '../../../constants/routes';

import ConditionRoute from '../ConditionRoute/ConditionRoute';
import Profile from '../Profile/Profile';
import FormContainer from '../../store/containers/FormContainer';
import DialogsContainer from '../../store/containers/DialogsContainer';

import './PageContent.css';

export default class PageContent extends Component {
    render() {
        const { user, errorText } = this.props;
        const isAuthenticated = user !== null;
        const { signup, signin } = notAuthenticatedRoutes;

        return (
            <div className="page-content">
                {isAuthenticated && <FormContainer formData={authenticatedRoutes.signout} />}

                <p className="error-text">{errorText || ''}</p>

                <ConditionRoute
                    condition={isAuthenticated}
                    component={<Profile user={user}/>}
                    path="/profile"
                    redirectPath="/signin"
                />

                <ConditionRoute
                    condition={isAuthenticated}
                    component={null}
                    path="/signout"
                    redirectPath="/signin"
                />

                <ConditionRoute
                    condition={isAuthenticated}
                    component={<DialogsContainer />}
                    path="/dialogs"
                    redirectPath="/signin"
                />

                <ConditionRoute
                    condition={isAuthenticated}
                    component={null}
                    path="/"
                    redirectPath="/signin"
                />

                {[signup, signin].map(l =>
                    <ConditionRoute
                        condition={!isAuthenticated}
                        component={
                            <FormContainer
                                formData={l}
                                inputsValidator={({ login, password }) => {
                                    if (login.length === 0) {
                                        throw new Error(shouldNotBeEmpty('login'));
                                    } else if (password === 0) {
                                        throw new Error(shouldNotBeEmpty('password'));
                                    }

                                    return true;
                                }}
                            />
                        }
                        path={l.url}
                        redirectPath="/dialogs"
                    />
                )}
            </div>
        );
    }
}

PageContent.propTypes = {
    errorText: PropTypes.string,
    user: PropTypes.shape({
        login: PropTypes.string.isRequired
    }).isRequired
};