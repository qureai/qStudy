import serviceConnect from './axios-connect'

// simple wrapper around axios connect for simple fetch requests
// you will need to handle the errors from catch
function getService(url, params = {}) {
  return serviceConnect.get(url, { params }).then(({ data }) => data)
}

export default { getService }
