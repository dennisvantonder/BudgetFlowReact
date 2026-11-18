import axios, {
   type AxiosInstance,
   type AxiosRequestConfig,
   type AxiosResponse,
   type InternalAxiosRequestConfig,
} from "axios";
import { antiForgeryService } from "./AntiForgeryService";

export default class BaseApiService {
   protected api: AxiosInstance;
   private static refreshTokenPromise: Promise<void> | null = null;

   constructor() {
      this.api = axios.create({
         baseURL: import.meta.env.VITE_API_BASE_URL,
         headers: {
            "Content-Type": "application/json",
         },
         withCredentials: true,
      });

      this.setupInterceptors();
   }

   private setupInterceptors() {
      // Setup request interceptor to include anti-forgery token
      this.api.interceptors.request.use((config) => {
         const method = config.method?.toLowerCase();
         const unsafeMethods = ["post", "put", "patch", "delete"];

         if (method && unsafeMethods.includes(method)) {
            const token = antiForgeryService.getRequestToken();

            if (token) {
               config.headers["X-XSRF-TOKEN"] = token;
            }
         }

         return config;
      });

      // Setup response interceptor to handle 401 and 403 errors, and refresh token logic
      this.api.interceptors.response.use(
         (response) => response,
         async (error) => {
            const originalRequest =
               error.config as InternalAxiosRequestConfig & {
                  _retried?: boolean;
               };

            if (!originalRequest) {
               return Promise.reject(error);
            }

            if (error.response?.status === 401 && !originalRequest._retried) {
               originalRequest._retried = true;

               const isAuthEndpoint = originalRequest.url?.includes("/Auth/");
               if (isAuthEndpoint) {
                  this.handleLogout();
                  return Promise.reject(error);
               }

               try {
                  // Wait for refresh token to complete if already in progress
                  if (BaseApiService.refreshTokenPromise) {
                     await BaseApiService.refreshTokenPromise;
                  } else {
                     BaseApiService.refreshTokenPromise = this.refreshToken();
                     await BaseApiService.refreshTokenPromise;
                     BaseApiService.refreshTokenPromise = null;
                  }

                  return this.api(originalRequest);
               } catch (refreshError) {
                  this.handleLogout();
                  return Promise.reject(refreshError);
               }
            }

            if (error.response?.status === 403) {
               // Forbidden - user lacks permissions
               console.error("Access forbidden:", error.response.data);
            }

            return Promise.reject(error);
         },
      );
   }

   private async refreshToken(): Promise<void> {
      try {
         await this.api.post("/Auth/refresh-token", {});
      } catch (error) {
         this.handleLogout();
         throw error;
      }
   }

   private handleLogout(): void {
      if (!window.location.pathname.includes("/login")) {
         window.location.href = "/login";
      }
   }

   async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      const response: AxiosResponse<T> = await this.api.get<T>(url, config);
      return response.data;
   }

   async post<TResponse, TRequest = unknown>(
      url: string,
      data: TRequest,
      config?: AxiosRequestConfig,
   ): Promise<TResponse> {
      const response = await this.api.post<TResponse>(url, data, config);
      return response.data;
   }

   async put<TResponse, TRequest = unknown>(
      url: string,
      data?: TRequest,
      config?: AxiosRequestConfig,
   ): Promise<TResponse> {
      const response = await this.api.put<TResponse>(url, data, config);
      return response.data;
   }

   async delete<TResponse = void>(
      url: string,
      config?: AxiosRequestConfig,
   ): Promise<TResponse> {
      const response = await this.api.delete<TResponse>(url, config);
      return response.data;
   }
}
