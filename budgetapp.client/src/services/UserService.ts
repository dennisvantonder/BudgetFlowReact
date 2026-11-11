import BaseApiService from "./BaseApiService";

export type User = {
   id: number;
   email: string;
};

export default class UserService extends BaseApiService {
   async getUser(): Promise<User> {
      const response = await this.get<User>("/Auth/me");
      return response;
   }

   async logoutUser(): Promise<void> {
      await this.post("/Auth/logout", null);
   }
}
