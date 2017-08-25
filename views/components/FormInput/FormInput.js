'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState({ value });

        this.props.parentHandler(e);
    }

    render() {
        const { valueName } = this.props;

        return (
            <div>
                <input
                    name={valueName}
                    className="form-element"
                    placeholder={valueName}
                    value={this.state[valueName]}
                    type={valueName}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

FormInput.propTypes = {
    valueName: PropTypes.string.isRequired,
    parentHandler: PropTypes.func, // TODO: Remove parentHandler
};
