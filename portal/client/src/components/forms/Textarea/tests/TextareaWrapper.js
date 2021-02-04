import React from 'react'
import PropTypes from 'prop-types'
import getFormObject from '../../../utils/stories/getFormObject'
import Textarea from "../index"

const TextareaWrapper = (props) => {
    const { fieldLabel, fieldName, placeholder } = props;
    const formObject = getFormObject(() => null)
    return (
        <Textarea formObject={formObject}
            fieldLabel={fieldLabel}
            fieldName={fieldName}
            placeholder={placeholder}
        />)


}

export default TextareaWrapper

TextareaWrapper.defaultProps = {
    fieldLabel: null,
    placeholder: null
}

TextareaWrapper.propTypes = {
    fieldName: PropTypes.string.isRequired,
    fieldLabel: PropTypes.string,
    placeholder: PropTypes.string,
}