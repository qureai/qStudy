import React from 'react';
import PropTypes from 'prop-types'
import getFormObject from '../../../utils/stories/getFormObject'
import FormWrapper from '../../../utils/stories/components/FormWrapper'
import TextBox from "../index"

const TextBoxWrapper = (props) => {
    const { fieldLabel, fieldName } = props;
    const formObject = getFormObject(() => null)
    return (
        <FormWrapper formObject={formObject}>
            <TextBox formObject={formObject} fieldLabel={fieldLabel} fieldName={fieldName} />
            <p>{formObject.values.name}</p>
        </FormWrapper>
    )

}

export default TextBoxWrapper

TextBoxWrapper.defaultProps = {
    fieldLabel: null,
    fieldName: null
}

TextBoxWrapper.propTypes = {
    fieldName: PropTypes.string,
    fieldLabel: PropTypes.string,

}