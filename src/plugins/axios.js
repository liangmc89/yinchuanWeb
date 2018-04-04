import axios from 'axios'

axios.defaults.baseURL="/api";
export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
