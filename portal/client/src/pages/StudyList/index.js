import React, { useEffect, useState } from 'react';

import { Columns, Container, Menubar } from '../../components';

import { studyService, logoutService } from './services';
import PageContainer from '../../components/composite/PageLayout';
import ListView from './components/ListView';
import DetailView from './components/DetailView';

const StudyLists = () => {
    const [isLoading, setLoading] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [studyList, setStudyList] = useState([]);
    const [currentStudy, setCurrentStudy] = useState({
        labels: [],
        remarks: ""
    });
    const [labelOptions, setLabelOptions] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);

    useEffect(() => {
        setLoading(true);
        studyService()
            .then((studyData) => {
                setLoading(false);                
                setStudyList(studyData);
            })
            .catch((err) => {
                console.log("studyService error: ", err);
            });
    },[]);

    const showStudyDetails = (current_study) => {        
        const _labelOptions = [];
        const _selectedLabels = [];

        current_study.labels.forEach(labelItem => {
            _labelOptions.push({
                'label': labelItem.label,
                'value': labelItem.label
            });

            if(labelItem.status) {
                _selectedLabels.push(labelItem.label);
            }
        });

        setCurrentStudy(current_study);
        setLabelOptions(_labelOptions);
        setSelectedLabels(_selectedLabels);
        setIsHidden(false);
    };

    return (
        <PageContainer
            hasNoHeader
            isLoading={isLoading}
            title={'View study list'}
            subtitle={'All the study records'}
            iconClassName="fa-list-alt"
            className="client-list-container"
        >
        <Menubar
            onLogout={logoutService}
        />
        <Container isFluid>
            <Columns>
                <Columns.Column size="4">
                    <ListView
                        studyList={studyList}
                        showStudyDetails={showStudyDetails}
                    />
                </Columns.Column>
                <Columns.Column>
                    <DetailView
                        studyData={currentStudy}
                        labelOptions={labelOptions}
                        selectedLabels={selectedLabels}
                        isHidden={isHidden}
                    ></DetailView>
                </Columns.Column>
            </Columns>
        </Container>       
      </PageContainer>        
    )
}

StudyLists.defaultProps = {}

StudyLists.propTypes = {}

export default StudyLists