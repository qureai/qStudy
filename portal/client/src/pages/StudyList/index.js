import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Card, Level, Box, Button, ButtonGroup, Checkbox, TextBox, Icon, Columns, Table } from '../../components'

import PageContainer from '../../components/composite/PageLayout'

const StudyLists = () => {
    const [isLoading, setLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const data = []
    const columns = []

    return (
        <PageContainer
            hasNoHeader
            isLoading={isLoading}
            title={'View study list'}
            subtitle={'All the study records'}
            iconClassName="fa-list-alt"
            className="client-list-container"
        >
        <section className="notification is-primary is-small top-banner">
            <Level>
            <Level.Left>
                <div>
                    <div className="is-size-5 has-text-weight-bold has-text-white">
                        {'qStudy'}
                    </div>
                </div>
            </Level.Left>
            <Level.Right>                
                <div>
                    <Link to="/instructions" className="button mt-2 mr-2 is-block">
                        <Icon iConClass="fa-info-circle" />
                        <span>{'Instructions'}</span>
                    </Link>
                </div>
                <div>
                    <Link to="/login" className="button mt-2 is-block">                        
                        <Icon iConClass="fa-sign-out-alt" />
                        <span>{'Logout'}</span>
                    </Link>
                </div>
            </Level.Right>
            </Level>
        </section>
        <div className="is-size-5 has-text-black-bis mb-5 ml-4">
            {'Hello, User'}
        </div>
        <div className="ml-4 mr-4">
            <Columns>
                <Columns.Column size={'4'}>
                    <Table
                        title="Study List"
                        data={data}
                        columns={columns}
                        className="table"
                    />
                </Columns.Column>
                <Columns.Column>
                <Card
                    className={'card-wrapper'}
                    contentOnly
                >
                    <div className="content">
                        <div className='title'>Study</div>
                        <div className='subtitle'>StudyNumber 1xY5</div>
                        <Columns>
                            <Columns.Column size={10}>
                                <p>
                                    Clinical History: Bring to the table win-win survival strategies to ensure proactive domination.
                                </p>
                            </Columns.Column>
                            <Columns.Column>
                                <Button type="button" isSecondary isLoading={isSubmitting}>
                                    <span>{'View Image'}</span>
                                </Button>
                            </Columns.Column>
                        </Columns>                    
                        <form>
                            <Box className="add-client-container">
                                <Columns>
                                    <Columns.Column>
                                        Checkbox
                                    </Columns.Column>
                                </Columns>
                            </Box>                        
                            <Box className="add-client-container">
                                <Columns>
                                    <Columns.Column>
                                        Textbox
                                    </Columns.Column>
                                </Columns>
                            </Box>
                            <ButtonGroup>                                
                                <Button type="submit" isPrimary isLoading={isSubmitting}>                            
                                    <span>{'Submit'}</span>
                                </Button>
                            </ButtonGroup>
                        </form>
                    </div>
                </Card>
                </Columns.Column>
            </Columns>
        </div>         
      </PageContainer>        
    )
}

StudyLists.defaultProps = {}

StudyLists.propTypes = {}

export default StudyLists