// api/services/UserService.ts
import { BaseService } from '@/services/base';
import type { Product } from '@/types/product';

class ProductService extends BaseService {
  getProducts(body: { keyword: string }) {
    return this.post<Product[]>('/api/products', body);
  }
}

export const productService = new ProductService();
