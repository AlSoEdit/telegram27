'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import Message from '../Message/Message';

import './Dialog.css';

import { authenticatedRoutes, fetchOptions } from '../../../constants/routes';

export default class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.bottom = null;
        this.state = {
            dialog: props.dialog
        };
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.dialog && this.props.dialog !== nextProps.dialog) {
            this.setState({
                dialog: nextProps.dialog
            });
        } else {
            const id = this.state.dialog.id;
            const method = 'get';
            const options = { ...fetchOptions, method};
            const res = await fetch(`/dialog/${id}`, options);
            const { text, user } = await res.json();
            this.setState({
                dialog: user.dialogs[0]
            });
        }
    }

    componentDidUpdate() {
        if (this.bottom) {
            this.bottom.scrollIntoView();
        }
    }

    render() {
        if (!this.state.dialog) {
            return null;
        }

        const { participants, messages, index, id } = this.state.dialog;
        const { user, showPreview } = this.props;
        const compMessages = messages.map(m => <Message message={m} user={user} showPreview={showPreview}/>);
        const dialogClassName = `dialog ${showPreview ? 'preview' : ''}`;

        const hiddenInputs = {
            id: id
        };

        return (
            <div className="dialog-wrapper" onClick={() => showPreview ? this.props.chooseDialog(index) : {}}>
                <p className="dialog-title">
                    {participants ? participants.map(p => p.login).join(', ') : ''}
                </p>

                <div className={dialogClassName}>
                    <div className={showPreview ? 'messages-container preview' : 'messages-container'}>
                        {
                            messages.length !== 0 && showPreview
                                ? compMessages[messages.length - 1]
                                : compMessages
                        }
                        <div className="container-bottom" ref={ref => this.bottom = ref}/>
                    </div>

                    {!showPreview && <Form
                        onSubmit={this.props.onSubmit}
                        formData={authenticatedRoutes.message}
                        hiddenInputs={hiddenInputs}
                    />}
                </div>
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
