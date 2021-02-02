import serviceConnect from '../../libs/axios-connect';

const loginService = (loginData) => {
  return serviceConnect.post('/api/session', loginData)
    .then(({ data }) => data)
    .catch(err => {
      console.log(err);
    });
}

export default loginService;
