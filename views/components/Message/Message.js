'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import dateformat from 'dateformat';

import Text from '../Text/Text';

import './Message.css';

export default class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chosen: false
        };
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
    message: PropTypes.shape({
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
    }).isRequired
};