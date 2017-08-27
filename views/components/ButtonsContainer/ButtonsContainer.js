'use strict';

import React from 'react';
import { PropTypes } from 'prop-types';

import './ButtonsContainer.css';

export default class ButtonsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="buttons-container">
                {this.props.buttons}
            </div>
        );
    }
}

ButtonsContainer.propTypes = {
    buttons: PropTypes.element
};