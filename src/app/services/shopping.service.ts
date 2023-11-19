import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Shopping } from '../models/shopping.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private productList: AngularFireList<Shopping>;

  constructor(private db: AngularFireDatabase) {
    this.productList = db.list('Shopping/products');
  }

  getProducts(): Observable<Shopping[]> {
    return combineLatest([
      this.productList.snapshotChanges(),
      this.db.object('Shopping/productsOrder').valueChanges(),
    ]).pipe(
      map(([changes, order]) => {
        const products = changes.map(c => this.mapProductFromSnapshot(c));

        const typedOrder = order as { [key: string]: number };

        products.sort((a, b) => {
          const aId = a.id !== undefined ? a.id : '';
          const bId = b.id !== undefined ? b.id : '';


          return (typedOrder[aId] || 0) - (typedOrder[bId] || 0);
        });

        return products;
      })
    );
  }

  private mapProductFromSnapshot(change: SnapshotAction<Shopping>): Shopping {
    const data = change.payload.val() as Shopping;
    return {
      id: change.payload.key as string,
      product: data.product,
      bought: data.bought,

    };
  }

  updateProductsOrder(products: Shopping[]): Promise<void> {
    if (products.length === 0) {
      return Promise.resolve();
    }
    const newOrder: { [key: string]: number } = {};
    products.forEach((product, index) => {
      if (product.id !== undefined) {

        newOrder[product.id] = index + 1;
      }
    });

    const orderRef = this.db.object('Shopping/productsOrder');
    return orderRef.update(newOrder);
  }

  async addProduct(product: Shopping): Promise<any> {
    const ref = await this.productList.push(product);

    return ref;
  }

  updateProduct(id: string, todo: Shopping): Promise<void> {
    return this.productList.update(id, todo);
  }

  async deleteProduct(id: string): Promise<void> {
    const productRef = this.productList.remove(id);
    const orderRef = this.db.object('Shopping/productsOrder/' + id);
    orderRef.remove();

    try {
      await Promise.all([orderRef, productRef]);
      return console.log('Product and order removed successfully');
    } catch (error) {
      return console.error('Error removing product and order', error);
    }
  }

  async deleteAllProducts(): Promise<void> {
    const productsRef = this.productList.remove();
    const orderRef = this.db.object('Shopping/productsOrder/');
    orderRef.remove();

    try {
      await Promise.all([orderRef, productsRef]);
      return console.log('All Products and all orders removed successfully');
    } catch (error) {
      return console.error('Error removing all Products and all orders', error);
    }
  }
}