import { Component, OnInit } from '@angular/core';
import { shop } from '../interface/products.interface';
import { SetDataService } from '../services/set-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  shops:shop[]=[]
  productsType:string=''

  constructor(private dataServ:SetDataService , private route:Router) {
    dataServ.getShops().subscribe(data =>{
      for (const key in data) {
          this.shops.push(data[key])
      }
    })
   }

   
  ngOnInit(): void {
    // console.log()
  }

}
