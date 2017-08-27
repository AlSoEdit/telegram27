'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './ErrorMessage.css';

export default class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);

        const { errorText } = props;
        this.state = { errorText };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.errorText !== nextProps.errorText) {
            this.setState({
                errorText: nextProps.errorText
            });
        }
    }

    render() {
        return <p className="error-message">{this.state.errorText || ''}</p>;
    }
}

ErrorMessage.propTypes = {
    errorText: PropTypes.string
};
