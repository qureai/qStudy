import serviceConnect from '../../libs/axios-connect';

const loginService = (loginData) => {
  console.log(loginData);
  return serviceConnect.post('/api/session', loginData).then(({ data }) => data);
}

export default loginService;
