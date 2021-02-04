import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStudyForm = (studyData, selectedLabels, onFormSubmit) => {
    const formObject = useFormik({
        enableReinitialize: true,
        initialValues: {
            labels: selectedLabels,
            remarks: studyData.remarks
        },
        validationSchema: Yup.object({
            'labels': Yup.array().required('Required'),
            'remarks': Yup.string().required('Required')
        }),
        onSubmit: formValues => onFormSubmit(formValues),
    });

    return formObject;
};

export default useStudyForm;
