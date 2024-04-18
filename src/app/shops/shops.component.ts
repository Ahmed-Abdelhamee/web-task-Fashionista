import { Component, OnInit } from '@angular/core';
import { shop } from '../interface/products.interface';
import { SetDataService } from '../services/set-data.service';
import { Router } from '@angular/router';
import { object } from '@angular/fire/database';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  shops:shop[]=[]
  hasProducts:boolean[]=[]
  link:any=this.route.url.split("/");
  productsType:string=''

  constructor(private dataServ:SetDataService , private route:Router) {
    dataServ.getShops().subscribe(data =>{
      for (const key in data) {
          this.shops.push(data[key])
          this.dataServ.getProducts().subscribe(obj =>{
            for (const temp in obj) {
              if(this.link[3]=="offer"){
                if(obj[temp].offer=="yes" && obj[temp].gender==this.link[2] && obj[temp].shopName==data[key].shopName && obj[temp].shopPhone==data[key].phone){
                  this.hasProducts.push(true)
                }
              }else if(obj[temp].gender==this.link[2] && obj[temp].type==this.link[3] && obj[temp].shopName==data[key].shopName && obj[temp].shopPhone==data[key].phone){
                this.hasProducts.push(true)
              }else{
                this.hasProducts.push(false)
              }
            }
          })
      }
      console.log(this.hasProducts)
    })
      console.log(this.shops)
   }

   
  ngOnInit(): void {
    for (const key of this.shops) {
          console.log(key)
    }
  }

}
