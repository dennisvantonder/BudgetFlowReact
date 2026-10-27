import BaseApiService from './BaseApiService';

export type Category = {
    id: number;
    name: string;
    Icon: string;
};

export type AddCategory = {
    name: string;
    Icon: string;
    userId: string;
};

export default class CategoryService extends BaseApiService {
    async getCategories(): Promise<Category[]> {
        return this.get<Category[]>('/categories/get');
    }

    async addCategory(category: AddCategory): Promise<Category> {
        return this.post<Category, AddCategory>('/categories/add', category);
    }

    async updateCategory(categoryId: number, category: AddCategory): Promise<any> {
        return this.put<any, AddCategory>(`/categories/update/${categoryId}`, category);
    }

    async deleteCategory(categoryId: number): Promise<void> {
        return this.delete<void>(`/categories/delete/${categoryId}`);
    }
}