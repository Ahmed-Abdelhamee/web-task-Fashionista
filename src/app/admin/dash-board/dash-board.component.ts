import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// write this special code for upload img 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SetDataService } from 'src/app/services/set-data.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(private fb:FormBuilder , private firestorage:AngularFireStorage, private dataServ:SetDataService) { }

  uploading:boolean=false;
  logo:string="";
  productPhoto:string=""

  ngOnInit(): void {
  }

  shop=this.fb.group({
    shopName:["",Validators.required],
    logo:[""],
  })

  product=this.fb.group({
    productPhoto:["",],
    type:["",Validators.required],
    price:["",Validators.required],
    details:["",Validators.required],
    shopName:["",Validators.required],
    offer:["",],
    gender:["",Validators.required]
  })

  // funcion to upload img file and get image url
  async uploadImg(event:any){
    this.uploading=true;
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`shops/${file.name}${date.toLocaleString().split("/").join("-")}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.logo=url;
    }
    this.uploading=false;
  }
  // funcion to upload img file and get image url
  async uploadProductsImg(event:any){
    this.uploading=true;
    let date=new Date()
    const file=event.target.files[0];
    if(file){
      const path=`products/${file.name}${date.toLocaleString().split("/").join("-")}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path,file)
      const url =await uploadTask.ref.getDownloadURL()
      this.productPhoto=url;
    }
    this.uploading=false;
  }


  createShop(){
    this.shop.patchValue({
      logo:this.logo
    })
    if(this.shop.valid){
      this.dataServ.createShop(this.shop.value)
    }
  }

  setOffer(val:string){
    this.product.patchValue({
      offer:val
    })
  }

  createProduct(){
    this.product.patchValue({
      productPhoto:this.productPhoto
    })
    if(this.product.valid){
      this.dataServ.createProduct(this.product.value)
      console.log(this.product.value)
    }
  }


  showForm1:boolean=true;
  show(form:string){
    if(form=="formShop"){
      this.showForm1=true;
    }else{
      this.showForm1=false;
    }
  }
}
