import React, { useState } from 'react';

import { Card, Columns, Button, ButtonGroup, Box, Checkbox, TextBox } from '../../../components';

import useStudyForm from './formObject';
import { updateService, loadImageService } from '../services';

const DetailsView = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { studyData, labelOptions, selectedLabels, isHidden } = props;

    const loadImage = () => {
        setLoading(true);
        loadImageService(studyData.study_instance_id)
            .then(response => alert(response))
            .catch(err => console.log("load image: ", err));
        setLoading(false);
    }

    const formObject = useStudyForm(studyData, selectedLabels, (formValues) => {
        setIsSubmitting(true);

        const saveStudyData = Object.assign({}, studyData);
        const _labels = [];

        studyData.labels.forEach(labelItem => {
            _labels .push({
                "label": labelItem.label,
                "status": formValues.labels.includes(labelItem.label) ? true : false
            });
        });

        saveStudyData.labels = _labels;
        saveStudyData.remarks = formValues.remarks;
        saveStudyData.status = "Complete"

        updateService(saveStudyData)
            .then(response => alert(response))
            .catch(err => console.log("update: ", err));

        setIsSubmitting(false);
    });

    return(
        <div>
            {!isHidden ? (
            <Card
            className={'card-wrapper'}
            contentOnly
        >
            <div className="content">
            <div className='title'>Study</div>
                <div className='subtitle'>{studyData.study_id}</div>
                <Columns>
                    <Columns.Column size="10">
                        <p>
                            Clinical History: {studyData.clinical_history}
                        </p>
                    </Columns.Column>
                    <Columns.Column>
                        <Button
                            type="button"
                            isSecondary
                            isLoading={isLoading}
                            onClick={() => loadImage()}
                        >
                            <span>View Image</span>
                        </Button>
                    </Columns.Column>
                </Columns>                    
                <form onSubmit={formObject.handleSubmit}>
                    <Box className="add-client-container">
                        <Columns>
                            <Columns.Column>
                                <Checkbox
                                    formObject={formObject}
                                    fieldName="labels"
                                    fieldLabel="Labels"
                                    options={labelOptions}
                                />
                            </Columns.Column>
                        </Columns>
                    </Box>                        
                    <Box className="add-client-container">
                        <Columns>
                            <Columns.Column>
                                <TextBox
                                    formObject={formObject}
                                    fieldName="remarks"
                                    fieldLabel="Remarks"
                                />
                            </Columns.Column>
                        </Columns>
                    </Box>
                    <ButtonGroup>                                
                        <Button
                            type="submit"
                            isSubmitting={isSubmitting}
                            isPrimary
                        >
                            <span>Submit</span>
                        </Button>
                    </ButtonGroup>
                </form>
            </div>
        </Card>
        ):(
            <div></div>
        )}
        </div>        
    );
};

export default DetailsView;