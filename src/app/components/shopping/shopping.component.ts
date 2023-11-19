import { Component, Input, OnInit } from '@angular/core';
import { ShoppingService } from '../../services/shopping.service';
import { Shopping } from '../../models/shopping.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  products: Shopping[] = [];
  newProduct: string = '';
  addProductError = false;
  @Input() shoppingColor: string = 'dodgerblue';
  constructor(private shoppingService: ShoppingService) { }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    this.shoppingService.updateProductsOrder(this.products);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.shoppingService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addProduct(product: string): void {
    if (this.newProduct.trim().length === 0) {
      this.addProductError = true;

      setTimeout(() => {
        this.addProductError = false;
      }, 3000);

      return;
    }

    this.addProductError = false;
    this.newProduct = '';

    const newProduct: Shopping = {
      product,
      bought: false,
    };

    this.shoppingService.updateProductsOrder(this.products).then(() => {
      this.shoppingService.addProduct(newProduct)
    })
  }

  updateProductStatus(product: Shopping): void {
    product.bought = !product.bought;
    if (product.id) {
      this.shoppingService.updateProduct(product.id, product)
    }
  }

  deleteProduct(id: string | undefined): void {
    if (id !== undefined) {
      this.shoppingService.deleteProduct(id)
    }
  }

  deleteAllProducts( products: Shopping[] = []): void {
    if (products !== undefined) {
      this.shoppingService.deleteAllProducts()
    }
  }
}
