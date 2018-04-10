import axios from 'axios'

// axios.defaults.baseURL="/api";
axios.defaults.baseURL="http://211.95.73.116:8001/";

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
