'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './Text.css';

export default class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <p className="error-message">{this.props.text || ''}</p>;
    }
}

ErrorMessage.propTypes = {
    text: PropTypes.string
};
