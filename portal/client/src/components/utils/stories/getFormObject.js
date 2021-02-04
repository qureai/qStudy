import { useFormik } from 'formik'
import * as Yup from 'yup'

const getFormObject = (onSubmit) => {
  const formObject = useFormik({
    initialValues: {
      name: '',
      age: '',
      site: '',
      riskGroups:'',
      countries: '',
      contactNumber: '',
      radioOptions:'',
      radioOptions2:'',
      checkboxField: [],
      checkboxField2:[],
      contents: ''

    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Required'),
      age: Yup.number('Must be integer')
        .required('Required'),
      site: Yup.string()
        .required('Required'),
      riskGroups:Yup.string()
        .required('Required'),
      countries: Yup.string()
        .required('Required'),
      contactNumber:Yup.string()
        .required('Required'),
      radioOptions:Yup.string()
        .required('Required'),
      checkboxField:Yup.string()
        .required('Required'),
      contents: Yup.string()
        .required('Required'),
    }),
    onSubmit,
  })

  return formObject
}

export default getFormObject
