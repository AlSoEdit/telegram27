'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './Text.css';

export default class Text extends React.Component {
    render() {
        return <p className="text">{this.props.text || ''}</p>;
    }
}

Text.propTypes = {
    text: PropTypes.string
};
