import { useFormik } from 'formik'
import * as Yup from 'yup'

const useFormObject = (labels, onSubmit) => {
  return useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(labels.fieldErrorMessages.invalidEmail)
        .required(labels.fieldErrorMessages.required),
      password: Yup.string()
        .min(5, labels.fieldErrorMessages.minLengthPassword)
        .required(labels.fieldErrorMessages.required),
    }),
    onSubmit,
  })
}

export default useFormObject
