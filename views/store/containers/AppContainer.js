'use strict';

import { connect } from 'react-redux';
import { makeRequest } from '../actions/request';
import App from '../../components/App/App';

import { notAuthenticatedRoutes } from '../../../constants/routes';
const { authState } = notAuthenticatedRoutes;

function mapStateToProps(state) {
    const { user, responseText } = state;

    return {
        user,
        responseText
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onMount: () => dispatch(makeRequest(authState))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
