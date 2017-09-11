'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { authenticatedRoutes } from '../../../constants/routes';

import FormContainer from '../../store/containers/FormContainer';
import Dialog from '../Dialog/Dialog';
import './Dialogs.css';

const { friend } = authenticatedRoutes;

export default class Dialogs extends Component {
    constructor(props) {
        super(props);
        this.chooseDialog = this.chooseDialog.bind(this);

        this.state = { chosenDialogId: null };
    }

    componentDidMount() {
        this.props.fetchDialogs();
    }

    chooseDialog(chosenDialogId) {
        this.props.fetchDialogById(chosenDialogId);
        this.setState({ chosenDialogId });
    }

    render() {
        const { user, dialogs } = this.props;
        const { chosenDialogId } = this.state;
        const friendFormData = Object.assign({}, friend, { additionalAction: this.props.fetchDialogs });
        const chosenDialog = chosenDialogId
            ? dialogs.filter(d => d.id === chosenDialogId)[0]
            : null;

        const dialogsPreviews = dialogs.map(d =>
            <Dialog
                key={d.title}
                dialog={d}
                user={user}
                showPreview={true}
                chooseDialog={this.chooseDialog}
            />
        );

        return (
            <div className="dialogs-container">
                <FormContainer formData={friendFormData} />

                <div className="dialogs-window">
                    <div className="dialogs-preview">
                        {
                            dialogsPreviews.length > 0
                                ? dialogsPreviews
                                : <p className="action-message">Dialogs are empty, add friend to create one</p>
                        }
                    </div>

                    <div className="active-dialog">
                        {
                            chosenDialog
                            ? <Dialog
                                    fetchDialogById={this.props.fetchDialogById}
                                    dialog={chosenDialog}
                                    user={user}
                                    showPreview={false}
                                    chooseDialog={this.chooseDialog}
                                />
                            : <p className="action-message">Choose dialog</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Dialogs.propTypes = {
    fetchDialogById: PropTypes.func.isRequired,
    fetchDialogs: PropTypes.func.isRequired,

    user: PropTypes.shape({
        login: PropTypes.string.isRequired,
    }).isRequired,

    dialogs: PropTypes.arrayOf(
        PropTypes.shape({
            participants: PropTypes.arrayOf(
                PropTypes.shape({
                    login: PropTypes.string.isRequired
                })
            ).isRequired,

            messages: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                author: PropTypes.string.isRequired
            })).isRequired
        })
    ),
};
