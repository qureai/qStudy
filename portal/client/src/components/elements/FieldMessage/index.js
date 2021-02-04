import React from 'react'
import PropTypes from 'prop-types'

const FieldMessage = ({ formObject, fieldName }) => {
  const { touched, errors } = formObject
  if (touched[fieldName] && errors[fieldName]) {
    return (
      <div className="help is-danger">{errors[fieldName]}</div>
    )
  }
  return null
}

FieldMessage.propTypes = {
  formObject: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
}

export default FieldMessage
