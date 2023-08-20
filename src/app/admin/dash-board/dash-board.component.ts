import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// write this special code for upload img 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SetDataService } from 'src/app/services/set-data.service';
import { ToastrService } from 'ngx-toastr';
import { msg } from 'src/app/interface/products.interface';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  constructor(private fb:FormBuilder , private firestorage:AngularFireStorage, private dataServ:SetDataService,private toaster:ToastrService) { }

  uploading:boolean=false;
  logo:string="";
  productPhoto:string="";
  date:string=(new Date().toLocaleString().split(",")[0].split("/").join("").concat()+new Date().toLocaleString().split(",")[1].split(":").join("")+new Date().toLocaleString().split(",")[1].split(":")[2].split(" ").join("")).split(" ").join("")
  userMsgs:msg[]=[];
  msgShow:msg={
    name:"",
    phone:"",
    email:"",
    msg:"",
    id:"",
  };
  showForm1:boolean=true;
  showForm2:boolean=false;
  userMsgshow:boolean=false;
  

  ngOnInit(): void {
  }

  shop=this.fb.group({
    shopName:["",Validators.required],
    phone:["",Validators.required],
    location:["",Validators.required],
    logo:[""],
    id:[this.date,Validators.required]
  })
  get shopName(){
    return this.shop.get("shopName")?.value!;
  }


  product=this.fb.group({
    productPhoto:["",],
    type:["",Validators.required],
    price:["",Validators.required],
    details:["",Validators.required],
    shopPhone:["",Validators.required],
    offer:["",],
    gender:["",Validators.required],
    id:[this.date,Validators.required]
  })
  get shopNameProduct(){
    return this.product.get("shopName")?.value!;
  }
  get productDetails(){
    return this.product.get("details")?.value!;
  }

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
      logo:this.logo,
    })
    console.log(this.shop.value)
    if(this.shop.valid){
      this.dataServ.createShop(this.shop.value);
      this.toaster.success("تم انشاء المتجر")
    }else{
      this.toaster.error("راجع بياناتك")
    }
  }

  setOffer(val:string){
    this.product.patchValue({
      offer:val
    })
  }

  createProduct(){
    this.product.patchValue({
      productPhoto:this.productPhoto,
    })
    if(this.product.valid){
      this.dataServ.createProduct(this.product.value)
      this.toaster.success("تم انشاء المنتج")
    }else{
      this.toaster.error("راجع بياناتك")
    }
  }

  setUsersMsgs(){
    this.userMsgs=[]
    this.dataServ.getUserMsg().subscribe(data =>{
      for (const key in data) {
          this.userMsgs.push(data[key])
      }
    })
  }

  show(form:string){
    if(form=="formShop"){
      this.showForm1=true;
      this.showForm2=false;
      this.userMsgshow=false;
    }if(form=="formProducts"){
      this.showForm1=false;
      this.showForm2=true;
      this.userMsgshow=false;
    }else if(form=="userMsgs"){
      this.showForm1=false;
      this.showForm2=false;
      this.userMsgshow=true;
      this.setUsersMsgs();
    }
  }

  showMsg(item:msg){
    this.msgShow=item;
  }
  deleteMsg(item:msg){
    this.dataServ.deleteItem(item.id)
    this.toaster.success("deleted");
    this.setUsersMsgs()
  }
}


