'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default class ConditionRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { condition, component, path, redirectPath } = this.props;

        return (
            <Route
                exact
                path={path}
                render={() => condition
                    ? component
                    : <Redirect to={redirectPath}/>
                }
            />
        );
    }
}

ConditionRoute.propTypes = {
    condition: PropTypes.bool,
    component: PropTypes.element,
    path: PropTypes.string,
    redirectPath: PropTypes.string
};
