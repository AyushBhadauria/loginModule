import { Component, OnInit } from '@angular/core';
import {AuthenService} from './../../Services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthenService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onLogout(){
  this.authService.logout();
  this.flashMessage.show('You are Logged Yout',{cssClass:'alert-danger', timeout:3000});
  this.router.navigate(['/home']);
  }
}
