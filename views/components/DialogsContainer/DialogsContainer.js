'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Form from '../Form/Form';
import Text from '../Text/Text';
import Dialog from '../Dialog/Dialog';

import { authenticatedRoutes } from '../../../constants/routes';


export default class Dialogs extends React.Component {
    constructor(props) {
        super(props);
        this.chooseDialog = this.chooseDialog.bind(this);

        this.state = {
            chosenDialog: null
        };
    }

    async componentDidMount() {
        this.props.onSubmit({
            url: '/dialogs',
            method: 'get',
            inputValues: []
        });
    }

    chooseDialog(chosenDialog) {
        this.setState({
            chosenDialog
        });
    }

    render() {
        let { user, onSubmit } = this.props;
        let dialogs = user.dialogs || [];
        const { chosenDialog } = this.state;

        dialogs = chosenDialog !== null
            ? [dialogs[chosenDialog]]
            : dialogs;

        dialogs = dialogs.map((d, index) => {
            d = Object.assign({} , d, { index: index });

            return <Dialog
                dialog={d}
                showPreview={chosenDialog === null}
                chooseDialog={this.chooseDialog}
                onSubmit={this.props.onSubmit}
            />;
        });

        return (
            <div>
                <Form
                    onSubmit={onSubmit}
                    formData={authenticatedRoutes.friend}
                />
                <div>
                    {chosenDialog === null && <Text text={`Dialogs count: ${dialogs.length}`}/>}
                    {dialogs}
                </div>
            </div>
        );
    }
}

Dialogs.propTypes = {
    chosenDialog: PropTypes.number,
    onSubmit: PropTypes.func,
    user: PropTypes.shape({
        login: PropTypes.string.isRequired,

        dialogs: PropTypes.arrayOf(
            PropTypes.shape({
                participants: PropTypes.arrayOf(
                    PropTypes.shape({
                        login: PropTypes.string.isRequired
                    })
                ).isRequired,

                messages: PropTypes.arrayOf(PropTypes.string).isRequired
            })
        ),
    }).isRequired,
};