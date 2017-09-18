'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { authenticatedRoutes } from '../../../constants/routes';

import FormContainer from '../../store/containers/FormContainer';
import Message from '../Message/Message';
import './Dialog.css';

export default class Dialog extends Component {
    constructor(props) {
        super(props);
        this.bottom = null;
    }

    componentDidUpdate() {
        if (this.bottom) {
            this.bottom.scrollIntoView();
        }
    }

    render() {
        const { user, dialog, showPreview, sendMessage } = this.props;
        const { id, title, messages } = dialog;
        const hiddenInputs = { id, author: user.login };

        let compMessages = showPreview ? messages.slice(-1) : messages;
        compMessages = compMessages.map((m, index) =>
            <Message
                key={index}
                message={m}
                user={user}
                showPreview={showPreview}
            />
        );

        return (
            <div
                className="dialog"
                onClick={() => showPreview ? this.props.chooseDialog(id) : {}}
            >
                <p className="dialog-title">{title}</p>

                <div className={showPreview ? 'messages-container--style-preview' : 'messages-container'}>
                    {
                        compMessages.length === 0
                            ? !showPreview && <p className="action-message">Dialog is empty</p>
                            : compMessages
                    }
                    <div className="container-bottom" ref={ref => this.bottom = ref}/>
                </div>

                {
                    showPreview
                        ? null
                        : <FormContainer
                            formData={authenticatedRoutes.message}
                            hiddenInputs={hiddenInputs}
                            inputsValidator={({ text }) => text.length > 0}
                            onActionSubmit={sendMessage}
                        />
                }
            </div>
        );
    }
}

Dialog.propTypes = {
    sendMessage: PropTypes.func,
    chooseDialog: PropTypes.func.isRequired,
    showPreview: PropTypes.bool,

    user: PropTypes.shape({
        login: PropTypes.string
    }).isRequired,

    dialog: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        participants: PropTypes.arrayOf(
            PropTypes.shape({
                login: PropTypes.string.isRequired
            })
        ).isRequired,

        messages: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string.isRequired,
            date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            author: PropTypes.string.isRequired
        })).isRequired
    })
};

Dialog.defaultValues = {
    showPreview: true
};