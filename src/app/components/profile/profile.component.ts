import { Component, OnInit } from '@angular/core';
import { AppGlobal         } from '../../app.global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public app : AppGlobal) { }

  ngOnInit() {
  }

}
