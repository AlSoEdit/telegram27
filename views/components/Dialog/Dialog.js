'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text/Text';
import Form from '../Form/Form';

import './Dialog.css';

import { authenticatedRoutes } from '../../../constants/routes';
import Message from '../Message/Message';

export default class Dialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { participants, messages, index, id } = this.props.dialog;
        const { showPreview } = this.props;
        const compMessages = messages ? messages.map(m => <Message message={m}/>) : [];
        const hiddenInputs = [{
            name: 'id',
            value: id
        }];

        return (
            <div className="dialog" onClick={() => this.props.chooseDialog(index)}>
                <Text text={participants ? participants.map(p => p.login).join(' ') : ''}/>

                {
                    showPreview
                        ? compMessages[compMessages.length - 1]
                        : compMessages
                }

                {!showPreview && <Form
                    onSubmit={this.props.onSubmit}
                    formData={authenticatedRoutes.message}
                    hiddenInputs={hiddenInputs}
                />}
            </div>
        );
    }
}

Dialog.propTypes = {
    onSubmit: PropTypes.func,
    chooseDialog: PropTypes.func,
    showPreview: PropTypes.bool,
    dialog: PropTypes.shape({
        index: PropTypes.number,
        id: PropTypes.string,
        participants: PropTypes.arrayOf(
            PropTypes.shape({
                login: PropTypes.string.isRequired
            })
        ).isRequired,

        messages: PropTypes.arrayOf(PropTypes.string).isRequired
    })
};
