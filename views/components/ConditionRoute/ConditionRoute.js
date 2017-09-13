'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default class ConditionRoute extends Component {
    render() {
        const { condition, component, path, redirectPath } = this.props;

        return (
            <Route
                exact
                path={path}
                render={() =>
                    condition
                        ? component
                        : <Redirect to={redirectPath}/>
                }
            />
        );
    }
}

ConditionRoute.propTypes = {
    condition: PropTypes.bool.isRequired,
    component: PropTypes.element,
    path: PropTypes.string.isRequired,
    redirectPath: PropTypes.string.isRequired
};
