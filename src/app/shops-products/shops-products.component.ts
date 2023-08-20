import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SetDataService } from '../services/set-data.service';
import { products } from '../interface/products.interface';

@Component({
  selector: 'app-shops-products',
  templateUrl: './shops-products.component.html',
  styleUrls: ['./shops-products.component.scss']
})
export class ShopsProductsComponent implements OnInit {

  products:products[]=[]
  link:any=this.route.url.split("/");
  shoplocation="";
  showMap=false;
  shopPhone="";

  constructor( private route:Router,private dataServ:SetDataService) { 
    console.log(this.link)
    dataServ.getProducts().subscribe(data =>{
      for (const key in data) {
        
        if(this.link[3]=="offer"){
          if(data[key].offer=="yes" && data[key].gender==this.link[2] && data[key].id == this.link[4])
          this.products.push(data[key])
        }else if(data[key].gender==this.link[2] && data[key].type==this.link[3] && data[key].id == this.link[4] )
          {this.products.push(data[key])
          console.log(data[key])}
      }
    })
   
  }

  ngOnInit(): void {
    setTimeout(()=> 
      this.dataServ.getShops().subscribe(data =>{
        for (const key in data) {
          if(data[key].phone==this.products[0].shopPhone && data[key].id == this.link[4]){
            this.shoplocation=data[key].location.slice((data[key].location.indexOf("src")+5),data[key].location.indexOf(`" width`))
            this.shopPhone=data[key].phone;
          }
        }
      })
    , 1000)
  }

  mapShow(){
    this.showMap=true;
  }
  WhatsApp(){
    console.log(this.shopPhone)
  }
  
  
}
