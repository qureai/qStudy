// import serviceConnect from './axios-connect'

function onLogout(history) {
  // TODO: as logout call has some issue, need to see it properly
  history.push('/login')

  // serviceConnect
  //   .post('/logout')
  //   .then(() => {
  //     history.push('/login')
  //   })
  //   .catch(() => {
  //     // TODO: ideally, this wont happen but show the error message to the user via toast notification or something
  //     // console.error(err);
  //   })
  return null
}

export default onLogout
