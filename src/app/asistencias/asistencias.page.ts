import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.page.html',
  styleUrls: ['./asistencias.page.scss'],
})
export class AsistenciasPage implements OnInit {

  dataProfe:string | null;
  userAlum: string | null;
  latitud: number; // Se declara la variable latitud
  longitud: number; // Se declara la variable longitud

  constructor() {
    this.dataProfe = localStorage.getItem("dataProfeCamera");
    
    let value = JSON.parse(localStorage.getItem("usuario")!);
    this.userAlum = value.nombre

    this.latitud = 0; // Se inicializa latitud con un valor predeterminado
    this.longitud = 0; // Se inicializa longitud con un valor predeterminado
    }
    
  mostrarInfo(){
    const datos = localStorage.getItem("dataProfeCamera")
    console.log(datos)
  }

  cerrarSesion(){
    localStorage.removeItem("dataProfeCamera")
    window.location.href='/login'
  }
  ngOnInit() {
  }


  //Creamos funcion para obtener ubicacion y mostrar las coordenadas
  async obtenerUbicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.mostrarCoordenadas(coordinates);
  }

  mostrarCoordenadas(coordenadas: any) {
    this.latitud = coordenadas.coords.latitude;
    this.longitud = coordenadas.coords.longitude;
  }
  
  

}
