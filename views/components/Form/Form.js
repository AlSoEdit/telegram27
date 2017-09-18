'use strict';

import React, { Component }  from 'react';
import PropTypes from 'prop-types';

import './Form.css';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        const inputValues = this.getInitialValues();
        this.state = { inputValues };
    }

    getInitialValues() {
        const { formData, hiddenInputs } = this.props;

        return formData.fields
            .reduce((acc, v) => {
                acc[v] = '';

                return acc;
            }, Object.assign({}, hiddenInputs));
    }

    async onSubmit(e) {
        e.preventDefault();

        let { inputValues } = this.state;
        const { inputsValidator, onSubmit, onActionSubmit, onValidationFail, formData } = this.props;

        const submitFunc = onActionSubmit ? onActionSubmit : onSubmit;
        const submitArgs = onActionSubmit ? inputValues : Object.assign({}, formData, { inputValues });

        try {
            if (inputsValidator(inputValues)) {
                submitFunc(submitArgs);
            }
        } catch (err) {
            onValidationFail(err.message);
        }

        inputValues = this.getInitialValues();
        this.setState({ inputValues });
    }

    onChange(e) {
        const { name, value } = e.target;
        const inputValues = Object.assign({}, this.state.inputValues, { [name]: value });

        this.setState({ inputValues });
    }

    render() {
        const { url, fields, method, text } = this.props.formData;
        const inputs = fields.map(valueName => (
            <input
                className="form__input"
                name={valueName}
                placeholder={valueName}
                value={this.state.inputValues[valueName]}
                type={valueName}
                onChange={this.onChange}
                key={valueName}
            />
        ));

        return (
            <form
                className={inputs.length === 1 ? 'form form--orientation-horizontal' : 'form'}
                method={method}
                action={url}
                onSubmit={this.onSubmit}
            >
                {inputs}
                <input
                    className={'form__input form__input--type-submit'}
                    type="submit"
                    value={text}
                />
            </form>
        );
    }
}

Form.propTypes = {
    onActionSubmit: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    inputsValidator: PropTypes.func.isRequired,
    onValidationFail: PropTypes.func,

    hiddenInputs: PropTypes.object,

    formData: PropTypes.shape({
        url: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.string).isRequired,
        text: PropTypes.string,
        method: PropTypes.string.isRequired
    })
};

Form.defaultProps = {
    inputsValidator: () => true,
    hiddenInputs: {}
};
