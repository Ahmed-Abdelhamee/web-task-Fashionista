import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Aos from "aos";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor ( private route : Router) { }

  ngOnInit(): void {
    Aos.init();
  }

  
  stopped:boolean=false;
  
  dash="dash"
}
