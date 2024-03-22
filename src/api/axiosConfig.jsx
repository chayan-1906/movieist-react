import axios from 'axios'

export default axios.create({
    baseURL: 'http://192.168.0.10:9091',
    headers: {'ngrok-skip-browser-warning': 'true'},
})