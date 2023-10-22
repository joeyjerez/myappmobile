import { Component, OnInit } from '@angular/core';
import { ComunasService } from 'src/app/servicios/comunas.service';

@Component({
  selector: 'app-comunas',
  templateUrl: './comunas.component.html',
  styleUrls: ['./comunas.component.scss'],
})
export class ComunasComponent  implements OnInit {
    comunas: any[] = [];
    comunaSeleccionada: string = '';

  constructor(private ComunasService : ComunasService) {}

  ngOnInit() {
    this.obtenerComunas();
  }

  obtenerComunas() {
    this.ComunasService.obtenerComunas().subscribe(
        (data) => {
            this.comunas = data.data;
        },
        (error) => {
            console.error('Error no se pueden obtener las comunas',error);
        }
    );
  }

}
