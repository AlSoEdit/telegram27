'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { notAuthenticatedRoutes, authenticatedRoutes } from '../../../constants/routes';

import Profile from '../Profile/Profile';
import Form from '../Form/Form';
import ErrorMessage from '../Text/Text';
import ConditionRoute from '../ConditionRoute/ConditionRoute';
import Dialogs from '../DialogsContainer/DialogsContainer';

import './PageContent.css';

export default class PageContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, errorText, onSubmit } = this.props;
        const isAuthenticated = user !== null;
        const notAuthRoutes = Object.keys(notAuthenticatedRoutes).map(k => notAuthenticatedRoutes[k]);

        return (
            <div className="page-content">
                {isAuthenticated && <Form
                    onSubmit={onSubmit}
                    formData={Object.assign({}, authenticatedRoutes.signout, {fields: []})}
                />}

                <ErrorMessage text={errorText}/>
                <ConditionRoute condition={isAuthenticated} component={<Profile/>} path="/profile" redirectPath="/signin"/>
                <ConditionRoute condition={isAuthenticated} component={null} path="/signout" redirectPath="/signin"/>
                <ConditionRoute condition={isAuthenticated} component={<Dialogs onSubmit={onSubmit} user={user}/>} path="/dialogs" redirectPath="/signin"/>

                {notAuthRoutes.map(l =>
                    <ConditionRoute
                        condition={!isAuthenticated}
                        component={
                            <Form
                                onSubmit={onSubmit}
                                formData={l}
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
    onSubmit: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    errorText: PropTypes.string
};