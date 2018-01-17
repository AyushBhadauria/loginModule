import { Component, OnInit } from '@angular/core';
import {AuthenService} from './../../Services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 user:Object;
  constructor(private authService:AuthenService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.user=profile.user;
    },
    err=>{
      this.flashMessage.show(err,{cssClass:'alert-danger'});
      return false;
    });
  
  }

}
