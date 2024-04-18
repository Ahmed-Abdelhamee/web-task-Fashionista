import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetDataService } from '../services/set-data.service';
import { products, shop } from '../interface/products.interface';

@Component({
  selector: 'app-shops-products',
  templateUrl: './shops-products.component.html',
  styleUrls: ['./shops-products.component.scss']
})
export class ShopsProductsComponent implements OnInit {

  products:products[]=[]
  link:any=this.route.url.split("/");
  shopData:shop={ shopName:"",logo:"",phone:"",location:"",id:"" }
  showMap=false;

  constructor( private route:Router,private dataServ:SetDataService) { 
    this.dataServ.getShops().subscribe(data =>{
      for (const key in data) {
        if(data[key].id == this.link[4]){
          this.shopData=data[key];
          this.shopData.location=data[key].location.slice((data[key].location.indexOf("src")+5),data[key].location.indexOf(`" width`))
        }
      }
    })
  }

  ngOnInit(): void {
    setTimeout(()=> 
    this.dataServ.getProducts().subscribe(data =>{
      for (const key in data) {
        if(this.link[3]=="offer"){
          if(data[key].offer=="yes" && data[key].gender==this.link[2] && data[key].shopName==this.shopData.shopName && data[key].shopPhone==this.shopData.phone)
          this.products.push(data[key])
        }else if(data[key].gender==this.link[2] && data[key].type==this.link[3] && data[key].shopName==this.shopData.shopName && data[key].shopPhone==this.shopData.phone){
          this.products.push(data[key])
        }
      }
    })
    , 1000)
  }

  mapShow(){
    this.showMap=true;
  }
}
