import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  dataProfe:string | null;
  userAlum: string | null;

  constructor() {
    this.dataProfe = localStorage.getItem("dataProfeCamera");
    
    let value = JSON.parse(localStorage.getItem("usuario")!);
    this.userAlum = value.nombre
    }
    
  mostrarInfo(){
    const datos = localStorage.getItem("dataProfeCamera")
    console.log(datos)
  }

  cerrarSesion(){
    localStorage.removeItem("dataProfeCamera")
    window.location.href='/home'
  }
  ngOnInit() {
  }

}
