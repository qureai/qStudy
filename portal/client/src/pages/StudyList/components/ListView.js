import React from 'react';
import { Table } from '../../../components';

const ListView = (props) => {
    const { studyList, showStudyDetails } = props;
    const columns = [
        {
            name: "StudyId",
            accessor: "study_id"
        }
    ]

    return(
        <Table
            title="Study List"
            data={studyList}
            columns={columns}
            className="table"
            hasTableHeader={true}
            search={{enableSearch: false}}
            onClickRow={showStudyDetails}
        />
    );
}

export default ListView;