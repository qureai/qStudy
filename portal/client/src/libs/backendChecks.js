// TODO: should be provided from backend
import _ from 'lodash'

import constants from './backendStringConstants'

const {
  COVID,
  NODULE,
  TB,
  TB_FEEDBACK,
  SPUTUM_FEEDBACK,
  NODULE_FEEDBACK,
  COVID_FEEDBACK,
  XRAY_PENDING,
  INVALID_XRAY,
  PROCESSING,
  PROCESSED,
  NAME,
  NONAME_NA
} = constants

function clientTableAccessors(accessor, value) {
  switch (accessor) {
    case TB_FEEDBACK:
      if (value === -1) return 'Not Advised'
      if (value === 0) return 'Processing'
      if (value === 1) return 'Advised'
      if (value === -2) return 'Invalid DICOM'
      if (value === 2) return 'To Be Reviewed'
      if (value === -3) return 'X-Ray pending'
      break

    case SPUTUM_FEEDBACK:
      if (value === -1) return 'Not Required'
      if (value === 0) return 'Decision Pending'
      if (value === 1) return 'BC-DS'
      if (value === 2) return 'CD-DS'
      if (value === 3) return 'BC-RR'
      if (value === 4) return 'Normal'
      break

    default:
      return 'Feedback Not Available'
  }
  return null
}

const hasInvalidState = state => {
  // all the stats for cxr_state => invalid_xray, xray_pending, processing, processed
  return (
    [XRAY_PENDING, PROCESSING, INVALID_XRAY].indexOf(_.toLower(state)) !== -1
  )
}

const hasXrayUploaded = state => {
  return [PROCESSED, PROCESSING].indexOf(_.toLower(state)) !== -1
}

const buildFeedbacks = (useCases, datum) => {
  const tbFeedback = _.get(datum, [TB_FEEDBACK])
  const noduleFeedback = _.get(datum, [NODULE_FEEDBACK])
  const finalUseCases = [...useCases]
  // TODO: this should be coming from conig

  if (noduleFeedback !== null) {
    finalUseCases.push(NODULE)
  }
  const feedbacks = finalUseCases.map(name => {
    let feedback = {}
    if (name === TB) {
      feedback = {
        value: tbFeedback,
        label: 'TB'
      }
    }

    if (name === COVID) {
      const covidScore = _.get(datum, [COVID_FEEDBACK])
      feedback = {
        value: covidScore,
        // TODO: not sure if need the na check here
        label: `COVID-19 ${_.toUpper(covidScore)}`
      }
    }
    if (name === NODULE) {
      feedback = { value: noduleFeedback, label: 'Nodule' }
    }
    return feedback
  })

  return { feedbacks, tbFeedback }
}

const getTitleSubtitle = (primaryIdentity, name, clientId) => {
  const isPrimaryInfoName = primaryIdentity === NAME
  const title = isPrimaryInfoName ? name : clientId
  const subTitle = isPrimaryInfoName ? clientId : name
  return { title, subTitle }
}

function pluralizeString(t, value, word, suffix = 's') {
  if (value === 1) {
    return `${value} ${t(`${word}`)}`
  }
  return `${value} ${t(`${word}${suffix}`)}`
}

function checkEmptyClientName(clientName, params = '|') {
  if (clientName === NONAME_NA || clientName === '' || clientName === null) {
    return null
  }
  return ` ${params} `
}

export default {
  clientTableAccessors,
  buildFeedbacks,
  hasInvalidState,
  hasXrayUploaded,
  getTitleSubtitle,
  pluralizeString,
  checkEmptyClientName
}
