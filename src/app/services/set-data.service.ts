import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { FormBuilder } from '@angular/forms';
import { msg, products, shop } from '../interface/products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetDataService {

  databaseURL:any = "";

  constructor(private fb:FormBuilder , private database:Database , private http:HttpClient) { 
    this.databaseURL=this.database.app.options.databaseURL;
  }

  createShop(data:any){
    this.http.post(`${this.databaseURL}/shops.json`,data).subscribe();
  }
  createProduct(data:any){
    this.http.post(`${this.databaseURL}/products.json`,data).subscribe();
  }
  sendUserMsg(data:any){
    this.http.post(`${this.databaseURL}/userMsg.json`,data).subscribe();
  }

  getShops():Observable<shop[]>{
    return this.http.get<shop[]>(`${this.databaseURL}/shops.json`)
  }
  getProducts():Observable<products[]>{
    return this.http.get<products[]>(`${this.databaseURL}/products.json`)
  }
  getUserMsg():Observable<msg[]>{
    return this.http.get<msg[]>(`${this.databaseURL}/userMsg.json`)
  }


  deleteItem(id:string){
    let itemKey ="";
    this.getUserMsg().subscribe(data=>{
      for (const key in data) {
        itemKey = (data[key].id == id) ? key : "not-found"
      }
      return this.http.delete(`${this.databaseURL}/userMsg/${itemKey}.json`).subscribe()
    })

  }
}
