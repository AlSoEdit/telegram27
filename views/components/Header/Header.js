'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        const { buttons } = this.props;
        this.state = {
            buttons
        };
    }

    render() {
        return null;
    }
}

Header.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            onClick: PropTypes.func
        })
    )
};
