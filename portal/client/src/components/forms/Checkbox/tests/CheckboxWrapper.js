import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import getFormObject from '../../../utils/stories/getFormObject'
import FormWrapper from '../../../utils/stories/components/FormWrapper'
import Checkbox from '../index'


const CheckboxWrapper = (props) => {
    const { options } = props;
    const formObject = getFormObject(() => null)
    const fieldName = 'checkboxField'
    const selected = _.get(formObject, ['values', fieldName])
    return (
        <FormWrapper formObject={formObject}>
            <Checkbox fieldLabel='Checkbox label' formObject={formObject} fieldName={fieldName}
                options={options} />
            <span>Selections : {selected.filter((n) => n).join(', ')}</span>

        </FormWrapper>)
}

export default CheckboxWrapper

CheckboxWrapper.propTypes = {
    options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.object)]).isRequired,
}