import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  userAlum: string | null;

  constructor() {
    let value = JSON.parse(localStorage.getItem("usuario")!);
    this.userAlum = value.nombre;
   }

  ngOnInit() {
  }

}
