'use strict';

import Dialogs from '../../components/Dialogs/Dialogs';
import { connect } from 'react-redux';
import { makeRequest } from '../actions/request';
import { authenticatedRoutes } from '../../../constants/routes';

const { dialogs, dialog } = authenticatedRoutes;

function mapStateToProps(state) {
    const { user, dialogs } = state;

    return { user, dialogs };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDialogs: () => dispatch(makeRequest(dialogs)),

        fetchDialogById: (id) => {
            let { url, method, additionalAction } = dialog;
            url += `/${id}`;

            dispatch(makeRequest({ url, method, additionalAction }));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dialogs);