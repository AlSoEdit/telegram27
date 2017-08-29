'use strict';

import React from 'react';
import { PropTypes } from 'prop-types';

import './Container.css';

export default class ButtonsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                {this.props.components}
            </div>
        );
    }
}

ButtonsContainer.propTypes = {
    components: PropTypes.element
};