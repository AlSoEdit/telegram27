'use strict';

import { connect } from 'react-redux';
import { makeRequest } from '../actions/request';
import App from '../../components/App/App';

const requestData = {
    url: '/authState',
    method: 'get'
};

function mapStateToProps(state) {
    return {
        user: state.user,
        errorText: state.errorText
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onMount: () => dispatch(makeRequest(requestData))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
