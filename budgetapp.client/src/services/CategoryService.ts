import BaseApiService from "./BaseApiService";

export type Category = {
   id: number;
   name: string;
   icon: string;
};

export type AddCategory = {
   name: string;
   icon: string;
};

export default class CategoryService extends BaseApiService {
   async getCategories(): Promise<Category[]> {
      return this.get<Category[]>("/Categories/get");
   }

   async addCategory(category: AddCategory): Promise<Category> {
      return this.post<Category, AddCategory>("/Categories/add", category);
   }

   async updateCategory(
      categoryId: number,
      category: AddCategory,
   ): Promise<any> {
      return this.put<any, AddCategory>(
         `/Categories/update/${categoryId}`,
         category,
      );
   }

   async deleteCategory(categoryId: number): Promise<void> {
      return this.delete<void>(`/Categories/delete/${categoryId}`);
   }
}
