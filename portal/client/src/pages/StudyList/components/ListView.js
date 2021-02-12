import React from 'react';
import { Table } from '../../../components';

const ListView = (props) => {
    const { studyList, showStudyDetails } = props;
    const columns = [
        {
            name: "Study Id",
            accessor: "study_id",
            searchable: true
        },
        {
            name: "Status",
            accessor: "status"
        }        
    ]

    return(
        <Table
            title="Study List"
            data={studyList}
            columns={columns}
            className="table-container"
            hasTableHeader={true}
            tableClass="is-striped"
            pagination={{ pageNumber: 1, pageSize: 10 }}
            search={{enableSearch: true}}
            onClickRow={(current_study) => showStudyDetails(current_study)}
        />
    );
}

export default ListView;