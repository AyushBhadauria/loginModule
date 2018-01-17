import { Component, OnInit } from '@angular/core';
import {AuthenService} from './../../Services/auth.service';
import {SocialAuth} from './../../Services/socialauth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 username: String;
 password: String;

 private loggedIn: boolean;
  constructor(private authService:AuthenService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private socialAuth: SocialAuth,
    
  ) { }

  ngOnInit() {
   
  }
onLoginSubmit(){
  const user ={
    username: this.username,
    password:this.password
  }
  this.authService.authenticateUser(user).subscribe(data=>{
   if(data.success){
     this.authService.storeUserData(data.token, data.user);
    this.router.navigate(['/profile']);
   }
   else{
    this.flashMessage.show(data.msg,{cssClass:'alert-danger', timeout:6000});
    this.router.navigate(['/login']);
    return false;
   }
  });
}
fblogin(){
  this.authService.fbLogin().subscribe(() => {
    console.log('User has been logged in');
    this.router.navigate(['/profile']);
  });
}

signInWithGoogle() {
 this.authService.signWithGoogle().subscribe(data=>{
   if(data.success){
     alert(data.msg)
   }
else{
  alert(data.msg)
}
 })
}

}
