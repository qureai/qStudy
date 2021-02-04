import React from 'react'
import PropTypes from 'prop-types'
import Section from '../../../layout/Section'

const FormWrapper = (props)=>{
  const {children, formObject} = props

  return (
    <Section isFullWidth>
      <form className="box" onSubmit={formObject.handleSubmit} style={{ 'width': '450px' }}>
        {children}
      </form>
    </Section>
  )
}

FormWrapper.propTypes = {
  formObject: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default FormWrapper
