import axios from "axios";

class AntiForgeryService {
   private token: string | null = null;

   async getToken(): Promise<void> {
      const response = await axios.get(
         `${import.meta.env.VITE_API_BASE_URL}/api/antiforgery/token`,
         {
            withCredentials: true,
         },
      );

      this.token = response.data.token;
   }

   getRequestToken(): string | null {
      return this.token;
   }
}

export const antiForgeryService = new AntiForgeryService();
