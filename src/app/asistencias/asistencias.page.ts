import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Storage } from '@ionic/storage-angular';



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
  fotoTomada:string | null; // Se declara la variable fotoTomada
  region: string | null;
  comuna: string | null;

  constructor(private storage: Storage) {
    
    this.dataProfe = localStorage.getItem("dataProfeCamera");
    
    let value = JSON.parse(localStorage.getItem("usuario")!);
    this.userAlum = value.nombre

    this.latitud = 0; // Se inicializa latitud con un valor predeterminado
    this.longitud = 0; // Se inicializa longitud con un valor predeterminado
    this.fotoTomada = null; // Se inicializa fotoTomada

    // Esto asigna los valores de región y comuna cuando el usuario se registra o inicia sesión.
    this.region = value.region;
    this.comuna = value.comuna;
    }
    
  mostrarInfo(){
    const datos = localStorage.getItem("dataProfeCamera")
    console.log(datos)
  }

  cerrarSesion(){
    localStorage.removeItem("dataProfeCamera")
    window.location.href='/login'
  }
  async ngOnInit() {

    // Inicializar el servicio de almacenamiento
    await this.storage.create();

    // Obtener datos almacenados si es necesario
    this.dataProfe = await this.storage.get('dataProfeCamera');
  }

  verStorage()
  {

  }


  //Creamos funcion para obtener ubicacion y mostrar las coordenadas
  async obtenerUbicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.mostrarCoordenadas(coordinates);
    await this.storage.set('latitud', this.latitud);
    await this.storage.set('longitud', this.longitud);

  }

  mostrarCoordenadas(coordenadas: any) {
    this.latitud = coordenadas.coords.latitude;
    this.longitud = coordenadas.coords.longitude;
  }
  
  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    if (image.webPath) {
      this.fotoTomada = image.webPath;
    } else {
      this.fotoTomada = null;
    }

    // Guardar la foto en el almacenamiento
    await this.storage.set('fotoTomada', this.fotoTomada);
  }
  }
  


