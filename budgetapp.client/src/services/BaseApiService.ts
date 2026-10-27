import axios, { 
    type AxiosInstance, 
    type AxiosRequestConfig, 
    type AxiosResponse 
} from 'axios';

export default class BaseApiService {
    protected api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // attach the token automatically to each request
        this.api.interceptors.request.use((config) => {
            const token = localStorage.getItem('authToken');

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }
    
    async get<T>(url: string, config?: AxiosRequestConfig) : Promise<T> {
        const response: AxiosResponse<T> = await this.api.get<T>(url, config);
        console.log(response);
        return response.data;
    }

    async post<TResponse, TRequest = unknown>(url: string, data: TRequest, config?: AxiosRequestConfig) : Promise<TResponse> {
        const response = await this.api.post<TResponse>(url, data, config);
        console.log(response);
        return response.data;
    }

    async put<TResponse, TRequest = unknown>(url: string, data?: TRequest, config?: AxiosRequestConfig) : Promise<TResponse> {
        const response = await this.api.put<TResponse>(url, data, config);
        console.log(response);
        return response.data;
    }

    async delete<TResponse = void>(url: string, config?: AxiosRequestConfig) : Promise<TResponse> {
        const response = await this.api.delete<TResponse>(url, config);
        console.log(response);
        return response.data;
    }
}