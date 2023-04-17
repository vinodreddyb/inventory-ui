import axios from "axios";

/*const refreshToken = localStorage.getItem('refreshToken')


axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});
//axios.post( url: API_ENDPOINT + "/api/auth/refreshtoken", data: refreshToken)
// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axios({
    method: 'post',
    url: API_ENDPOINT + "/api/auth/refreshtoken",
    data: {
        refreshToken: refreshToken
    }
}).then(tokenRefreshResponse => {
    localStorage.setItem('token', tokenRefreshResponse.data.token);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
    return Promise.resolve();
});

createAuthRefreshInterceptor(axios, refreshAuthLogic);*/

const DEFAULT_SERVER_CONFIG = {
  timeout:"30000",
  headers: {'accept': 'application/json',
    'Content-Type': 'application/json'
  }
}


const httpRequest = async({method="get", url="/", headers=DEFAULT_SERVER_CONFIG, data = null })=>{
    try {

        return axios[method](url, data, headers)
      } catch(error) {
        return error
      }
}

export default httpRequest;
