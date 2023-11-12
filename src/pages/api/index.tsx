import axios, {AxiosError} from "axios";
// import createAuthRefreshInterceptor from 'axios-auth-refresh'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
});

const refreshAuthLogic = (failedRequest: AxiosError) => {
    return axiosInstance
        .get('PATH TO REFRESH TOKEN ENDPOINT', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
            },
        })
        .then(({ data: { token, refreshToken } }) => {
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)
            if (failedRequest && failedRequest.response) {
                failedRequest.response.config.headers['Authorization'] =
                    'Bearer ' + token
            }
            return Promise.resolve()
        })
}

// createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic)

axiosInstance.interceptors.request.use(function(config) {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
})