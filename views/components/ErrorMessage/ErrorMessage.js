'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorMessage extends React.Component {
    constructor(props) {
        super(props);

        const { errorText } = props;
        this.state = { errorText };
    }

    componentWillReceiveProps(nextProps) {
        return this.state.errorText !== nextProps.errorText;
    }

    render() {
        return <p>{this.state.errorText}</p>;
    }
}

ErrorMessage.propTypes = {
    errorText: PropTypes.string
};
