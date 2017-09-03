'use strict';

import React from 'react';
import PropTypes from 'prop-types';

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
        const { message } = this.props;

        return (
            <div className="message">
                <Text text={message.date}/>
                <Text text={message.text}/>
            </div>
        );
    }
}

Message.propTypes = {
    message: PropTypes.shape({
        date: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};