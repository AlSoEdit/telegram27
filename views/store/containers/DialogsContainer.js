'use strict';

import Dialogs from '../../components/Dialogs/Dialogs';
import { connect } from 'react-redux';
import { addMessage, ADD_MESSAGE } from '../actions/dialog';
import { makeRequest, wsSendMessage, wsOnOpen, wsOnMessage, wsOnClose } from '../actions/request';
import { authenticatedRoutes } from '../../../constants/routes';

const { dialogs, dialog } = authenticatedRoutes;

function mapStateToProps(state) {
    const { user, dialogs, wsConnected } = state;

    return { user, dialogs, wsConnected };
}

function mapDispatchToProps(dispatch) {
    let sock = null;

    return {
        fetchDialogs: () => {
            dispatch(makeRequest(dialogs));
        },

        fetchDialogById: (id) => {
            let { url, method, additionalAction } = dialog;
            url += `/${id}`;

            dispatch(makeRequest({ url, method, additionalAction }));
        },

        wsOpenConnection: () => {
            sock = new WebSocket(`${process.env.SOCKET_TYPE}://${process.env.APP_NAME}`);
            sock.onopen = () => dispatch(wsOnOpen());
            sock.onmessage = (message) => dispatch(wsOnMessage(message));
            sock.onclose = () => dispatch(wsOnClose());
        },

        wsCloseConnection: () => {
            sock.close();
            sock = null;

            dispatch(wsOnClose());
        },

        wsSendChatMessage: ({ id, author, text }) => {
            const type = ADD_MESSAGE;
            const date = Date.now();
            const payload = {
                id,
                message: {
                    text,
                    author,
                    date
                }
            };

            dispatch(wsSendMessage(sock, addMessage, { type, payload }));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dialogs);