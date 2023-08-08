import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Aos from 'aos';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private route:Router) { }
  src_clothes:string=""
  src_shoes:string=""

  ngOnInit(): void {
    window.scrollTo({
      top:0,
      left:0,
    })
    if(this.route.url.split("/")[2]=="men"){
      this.src_clothes="assets/man.jpg";
      this.src_shoes="assets/menshoes6.jpg";
    }else{
      this.src_clothes="assets/women.jpg";
      this.src_shoes="assets/f-shoes2.jpg";
    }
    Aos.init();
  }
  router(link:string){
    this.route.navigate([`${this.route.url}/${link}`])
  }

}
