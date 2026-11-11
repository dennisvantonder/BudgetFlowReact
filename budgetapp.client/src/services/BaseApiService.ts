import axios, {
   type AxiosInstance,
   type AxiosRequestConfig,
   type AxiosResponse,
} from "axios";

export default class BaseApiService {
   protected api: AxiosInstance;

   constructor() {
      this.api = axios.create({
         baseURL: import.meta.env.VITE_API_BASE_URL,
         headers: {
            "Content-Type": "application/json",
         },
         withCredentials: true,
      });

      this.api.interceptors.response.use(
         (response) => response,
         (error) => {
            if (error.response?.status === 401) {
               // Handle unauthorized error, e.g., redirect to login
               if (!error.config?.url?.includes("/Auth/login")) {
                  // Redirect to login page or perform other actions
                  window.location.href = "/login";
               }
            }
            return Promise.reject(error);
         },
      );
   }

   async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      const response: AxiosResponse<T> = await this.api.get<T>(url, config);
      console.log(response);
      return response.data;
   }

   async post<TResponse, TRequest = unknown>(
      url: string,
      data: TRequest,
      config?: AxiosRequestConfig,
   ): Promise<TResponse> {
      const response = await this.api.post<TResponse>(url, data, config);
      console.log(response);
      return response.data;
   }

   async put<TResponse, TRequest = unknown>(
      url: string,
      data?: TRequest,
      config?: AxiosRequestConfig,
   ): Promise<TResponse> {
      const response = await this.api.put<TResponse>(url, data, config);
      console.log(response);
      return response.data;
   }

   async delete<TResponse = void>(
      url: string,
      config?: AxiosRequestConfig,
   ): Promise<TResponse> {
      const response = await this.api.delete<TResponse>(url, config);
      console.log(response);
      return response.data;
   }
}
