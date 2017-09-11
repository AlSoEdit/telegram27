'use strict';

import Form from '../../components/Form/Form';
import { connect } from 'react-redux';
import { makeRequest } from '../actions/request';
import { setError } from '../actions/error';

function mapDispatchToProps(dispatch) {
    return {
        onSubmit: ({ ...args }) => dispatch(makeRequest(args)),
        onValidationFail: (errorMessage) => dispatch(setError(errorMessage))
    };
}

export default connect(
    () => { return {}; },
    mapDispatchToProps
)(Form);
