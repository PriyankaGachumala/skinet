import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProductBrand } from '../shared/Interfaces/brand';
import { IProduct } from '../shared/Interfaces/product';
import { ProductParams } from '../shared/Interfaces/productParams';
import { IProductType } from '../shared/Interfaces/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm!: ElementRef;
  products?: IProduct[];
  brands!: IProductBrand[];
  types!: IProductType[];
  sortOptions = [
    { name: 'Alphabetically', value: 'name' },
    { name: 'Price: High to Low', value: 'priceDesc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
  ];
  productParams = new ProductParams();
  totalCount!: number;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopService.getProducts(this.productParams).subscribe(
      (response) => {
        this.products = response!.data;
        this.productParams.pageNumber = response!.pageIndex;
        this.productParams.pageSize = response!.pageSize;
        //! non null assertion operator
        this.totalCount = response!.count;
      },
      (error) => console.log(error)
    );
  }

  getBrands() {
    this.shopService.getProductBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopService.getProductTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSelectedBrand(brandId: number) {
    this.productParams.brandId = brandId;
    this.productParams.pageNumber = 1;
    this.getProducts();
  }

  onSelectedType(typeId: number) {
    this.productParams.typeId = typeId;
    this.productParams.pageNumber = 1;
    this.getProducts();
  }

  onSelectedSort(sort: string) {
    this.productParams.sort = sort;
    this.getProducts();
  }

  onBtnSearch() {
    this.productParams.search = this.searchTerm.nativeElement.value;
    this.productParams.pageNumber = 1;
    this.getProducts();
  }
  onBtnReset() {
    this.searchTerm.nativeElement.value = '';
    this.productParams.search = '';
    this.getProducts();
  }

  onPageChanged(event: any) {
    if(this.productParams.pageNumber != event)
    {
      this.productParams.pageNumber = event;
      this.getProducts();
    }
  }
}
