import serviceConnect from '../../libs/axios-connect';

const studyService = async () => {  
  try {
    const { data } = await serviceConnect.post('/api/studies');
    return data;
  } catch(err) {
    console.log("studyService: ", err);
  }
}

const logoutService = async (history) => {
  try {
    await serviceConnect.delete('/api/session');
    history.push('/login');
  } catch (err) {
    console.log("logoutService: ", err);
  }
};

const updateService = async (payload) => {
  try {
    const { data } = await serviceConnect.post('/api/studies/update', payload);
    return data;
  } catch(err) {
    console.log("updateService: ", err);
  }
};
import axios from 'axios';
const loadImageService = async (uid) => {
  try {
    const { data } = await axios.post('http://localhost:5000/uid/' + uid);
    return data;
  } catch(err) {
    console.log(err);
  }
};

export {
  studyService,
  logoutService,
  updateService,
  loadImageService
};
