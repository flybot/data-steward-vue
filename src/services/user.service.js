import axios from './axios-extender';

const API_URL = import.meta.env.VITE_API_URL;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'public/data');
  }


  getUserRoles() {
    return axios.get(API_URL + 'api/v1/data', {
      params: {
        rid:1,
        params:{
          "p1":1
        }
      }
    });
  }

  addTask(taskType, data) {
    return axios.get(API_URL + 'api/v1/new_task', {
      params: {
        task_type: taskType,
        payload: data
      }
    }); 
  }

  addPublicTask(taskType, data) {
    return axios.post(API_URL + 'public/task', {
      params: {
        task_type: taskType,
        payload: data
      }
    }); 
  }

}

export default new UserService();

  