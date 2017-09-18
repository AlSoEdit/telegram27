'use strict';

import Form from '../../components/Form/Form';
import { connect } from 'react-redux';
import { makeRequest } from '../actions/request';
import { setResponseText } from '../actions/response-text';

function mapDispatchToProps(dispatch) {
    return {
        onSubmit: ({ ...args }) => dispatch(makeRequest(args)),
        onValidationFail: (errorMessage) => dispatch(setResponseText(errorMessage))
    };
}

export default connect(
    () => { return {}; },
    mapDispatchToProps
)(Form);
