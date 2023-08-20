import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SetDataService } from '../services/set-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-us',
  templateUrl: './chat-us.component.html',
  styleUrls: ['./chat-us.component.scss']
})
export class ChatUsComponent implements OnInit {

  constructor(private fb : FormBuilder,private dataSrv:SetDataService,private toaster:ToastrService) { }
  
  chat=this.fb.group({
    name:["",Validators.required],
    phone:["",[Validators.required,Validators.minLength(11)]],
    email:["",Validators.required],
    msg:["",Validators.required],
    id:[(new Date().toLocaleString().split(",")[0].split("/").join("").concat()+new Date().toLocaleString().split(",")[1].split(":").join("")+new Date().toLocaleString().split(",")[1].split(":")[2].split(" ").join("")).split(" ").join("")    ,Validators.required],

  })
  ngOnInit(): void {
  }
  pageBack(){
    window.history.back()
  }
  sendMsg(){
    if(this.chat.valid){
      this.dataSrv.sendUserMsg(this.chat.value)
      this.toaster.success("تم الارسال")
    }else{
      this.toaster.error("راجع بياناتك")
    }
  }

}
