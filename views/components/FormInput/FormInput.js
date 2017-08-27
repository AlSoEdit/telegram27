'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import './FormInput.css';

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { value } = e.target;
        this.setState({ value });
        this.props.onChange(e);
    }

    render() {
        const { valueName } = this.props;

        return (
            <input
                className="form-input"
                name={valueName}
                placeholder={valueName}
                value={this.state[valueName]}
                type={valueName}
                onChange={this.handleChange}
            />
        );
    }
}

FormInput.propTypes = {
    valueName: PropTypes.string.isRequired,
    onChange: PropTypes.func
};
