import { Component, OnInit } from '@angular/core';
import {ValidateService} from './../../Services/validate.service';
import {AuthenService} from './../../Services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 name: String;
 username: String;
 email: String;
 password: String;
 contact:String;
 conpassword:String;
  constructor(private validateService: ValidateService,
  private authService: AuthenService,
  private flashMessage: FlashMessagesService,
  private router: Router
  ) { }

  ngOnInit() {
  }
  
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      contact: this.contact,
      password: this.password,
      conpassword:this.conpassword
    }
    //validation
    
    if(!this.validateService.validateRegister(user))
    {
      this.flashMessage.show('Please Fill all Details',{cssClass:'alert-danger', timeout:3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please Enter Valid Email Address',{cssClass:'alert-danger', timeout:3000});
      return false;
    }
    if(!this.validateService.validatePassword(user)){
      this.flashMessage.show('Please Enter the Correct Password',{cssClass:'alert-danger', timeout:3000});
      return false;
    }
    //register User
   this.authService.registerUser(user).subscribe(data =>{
   if(data.success){
    this.flashMessage.show('You are now registered. You can now login',{cssClass:'alert-success', timeout:3000});
    this.router.navigate(['/login']);
  }
  else{
    this.flashMessage.show('SomeThing Went Wrong',{cssClass:'alert-danger', timeout:3000});
    this.router.navigate(['/register']);
  }
});
  }

}
