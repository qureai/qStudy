import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import getConvertedFieldOptions from "../../utils/getConvertedFieldOptions";

const Checkbox = (props) => {
  const { formObject, options, fieldName, fieldLabel, isHorizontal, className } = props

  const fieldOptions = useMemo(() => {
    return getConvertedFieldOptions(options)
  }, [options])

  const containerClass = classNames('field', {
    'is-horizontal': isHorizontal,
    [className]: className,
  })

  return (
    <div className={containerClass}>
      <div className="label">{fieldLabel}</div>
      {fieldOptions.map(({ label, value }, index) => {
        return <CheckboxControlField
          formObject={formObject}
          fieldName={fieldName}
          fieldValue={value}
          fieldLabel={label}
          key={value}
          index={index} />
      })}
    </div>
  )
}

Checkbox.defaultProps = {
  isHorizontal: false,
  className: null,
}

Checkbox.propTypes = {
  /**
   Represents the field for the
   */
  fieldLabel: PropTypes.string.isRequired,
  /**
   formik form object
   */
  formObject: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.object)]).isRequired,
  isHorizontal: PropTypes.bool,
  className: PropTypes.string,
}

// Helper component
const CheckboxControlField = ({ formObject, fieldName, fieldValue, fieldLabel, index }) => {
  const fieldID = _.kebabCase(fieldValue) + _.random(1, 1000)
  const fieldFormValues = _.get(formObject, ['values', fieldName])
  return (
    <div className="control" key={index}>
      <input className="is-checkradio"
        id={fieldID}
        type="checkbox"
        checked={fieldFormValues.indexOf(fieldValue) !== -1}
        onChange={(event) => {
          const value = event.target.checked ? fieldValue : null
          formObject.setFieldValue(`${fieldName}.${index}`, value)
        }}
      />
      <label htmlFor={fieldID}>{fieldLabel}</label>
    </div>
  )
}

CheckboxControlField.propTypes = {
  formObject: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldValue: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}


export default Checkbox
