import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FieldMessage from '../../elements/FieldMessage'

const Textarea = (props) => {
  const {
    formObject, fieldName,
    fieldLabel, placeholder, isPrimary,
    isHovered, isFocused, isLoading,
    hasFixedSize, isReadOnly, isDisabled,
    size, rows = '3',
    className
  } = props

  const controlClassname = classNames('control', {
    'is-loading': isLoading,
    [`is-${size}`]: size,
  })

  const textareaClassName = classNames('textarea', {
    'is-primary': isPrimary,
    [`is-${size}`]: size,
    'is-hovered': isHovered,
    'is-focused': isFocused,
    'has-fixed-size': hasFixedSize,
    [className] : className
  })
  return (
    <div className='field'>
      {fieldLabel && <div className="label">{fieldLabel}</div>}
      <div className={controlClassname}>
        {/* eslint-disable */}
        <textarea className={textareaClassName}
                  rows={rows}
                  readOnly={isReadOnly}
                  {...formObject.getFieldProps(fieldName)}
                  placeholder={placeholder}
                  disabled={isDisabled}/>
        { /* eslint-enable */}
      </div>
      <FieldMessage formObject={formObject} fieldName={fieldName}/>
    </div>
  )
}

Textarea.defaultProps = {
  fieldLabel: null,
  placeholder: null,
  isPrimary: false,
  isHovered: false,
  isFocused: false,
  isLoading: false,
  hasFixedSize: false,
  isReadOnly: false,
  isDisabled: false,
  size: null,
  rows: null,
  className: null,
}

Textarea.propTypes = {
  formObject: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string,
  placeholder: PropTypes.string,
  isPrimary: PropTypes.bool,
  isHovered: PropTypes.bool,
  isFocused: PropTypes.bool,
  isLoading: PropTypes.bool,
  hasFixedSize: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  size: PropTypes.string,
  rows: PropTypes.string,
  className: PropTypes.string,
}

export default Textarea
