import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductBrand } from '../shared/Interfaces/brand';
import { IPagination } from '../shared/Interfaces/pagination';
import { IProductType } from '../shared/Interfaces/productType';
import { map } from 'rxjs/operators';
import { ProductParams } from '../shared/Interfaces/productParams';
import { IProduct } from '../shared/Interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getProducts(productParams: ProductParams) {
    let params = new HttpParams();
    if (productParams.brandId !== 0) {
      params = params.append('brandId', productParams.brandId.toString());
    }
    if (productParams.typeId !== 0) {
      params = params.append('typeId', productParams.typeId.toString());
    }
    if (productParams.sort) {
      params = params.append('sort', productParams.sort);
    }
    params = params.append('pageIndex', productParams.pageNumber.toString());
    params = params.append('pageSize', productParams.pageSize.toString());
    if (productParams.search) {
      params = params.append('search', productParams.search);
    }
    // console.log(params);
    return this.http
      .get<IPagination>(this.baseUrl + 'products', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl+'products/'+id);
  }

  getProductBrands() {
    return this.http.get<IProductBrand[]>(this.baseUrl + 'products/brands');
  }
  getProductTypes() {
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types');
  }
}
