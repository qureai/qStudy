import _ from 'lodash'

const getFeatureToggles = (userProfile) => {
  if (_.isEmpty(userProfile)) {
    return {}
  }

  const currentUseCases = _.get(userProfile, ['usecase'])
  const isTextReportVisible = _.get(userProfile, ['xray_viewer', 'show_text_report'])
  const isTBFeedbackVisible = _.get(userProfile, ['xray_viewer', 'tb_feedback'])
  const isCovidFeedbackVisible = _.get(userProfile, ['xray_viewer', 'covid_feedback'])

  return {
    currentUseCases,
    isTextReportVisible,
    isTBFeedbackVisible,
    isCovidFeedbackVisible,
  }
}

export default getFeatureToggles
