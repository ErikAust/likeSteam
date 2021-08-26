import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form1: FormGroup;
  form2: FormGroup;
  message: string;
  flag: boolean;

  constructor() { }

  ngOnInit() {
    this.form1 = new FormGroup({
      email: new FormControl(null)
    });
    this.form2 = new FormGroup({
      password: new FormControl(null)
    });
    this.flag = true;
  }

  submit(str: string) {
    this.flag = false;
    this.message = str;
  }
}
