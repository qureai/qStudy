import React from 'react'
import PropTypes from 'prop-types'
import FieldMessage from '../../elements/FieldMessage'

const TextBox = (props) => {
  const { formObject, fieldName, fieldLabel, type, placeholder} = props;
  return (
    <div className="field">
      <div className="label">{fieldLabel}</div>
      <div className="control">
        {/* eslint-disable */}
        <input className="input" type={type}
               placeholder={placeholder} {...formObject.getFieldProps(fieldName)}/>
        { /* eslint-enable */}
        <FieldMessage formObject={formObject} fieldName={fieldName}/>
      </div>
    </div>
  )
}

TextBox.defaultProps = {
  fieldLabel: null,
  type: "text",
  placeholder:''
}

TextBox.propTypes = {
  formObject: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string,
  type: PropTypes.string, // text, number, password, email, search, tel,color
  placeholder: PropTypes.string,
}

export default TextBox
