'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

import './Message.css';

export default class Message extends Component {
    constructor(props) {
        super(props);

        this.state = { chosen: false };
    }

    render() {
        const { author, text, date} = this.props.message;
        const { login } = this.props.user;
        const formattedDate = dateformat(new Date(date), 'h:MM');
        const side = login === author ? 'right-side' : 'left-side';
        const previewClass = this.props.showPreview ? 'preview' : '';
        const messagesClassName = `message ${side} ${previewClass}`;

        return (
            <div className={messagesClassName}>
                <p className="message-date">{formattedDate}</p>
                <p className="message-text">{text}</p>
            </div>
        );
    }
}

Message.propTypes = {
    showPreview: PropTypes.bool.isRequired,

    user: PropTypes.shape({
        login: PropTypes.string.isRequired
    }).isRequired,

    message: PropTypes.shape({
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
    }).isRequired
};