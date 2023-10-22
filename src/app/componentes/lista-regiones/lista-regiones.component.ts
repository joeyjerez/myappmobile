import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatosRegionalesService } from 'src/app/servicios/datos-regionales.service';

@Component({
  selector: 'app-lista-regiones',
  templateUrl: './lista-regiones.component.html',
  styleUrls: ['./lista-regiones.component.scss'],
})
export class ListaRegionesComponent implements OnInit {
  @Input() regiones: any[] = [];
  regionSeleccionada: string = ''; // Valor inicial asignado

  @Output() regionSeleccionadaChange = new EventEmitter<string>(); // Emite eventos cuando cambia la región seleccionada

  constructor(private DatosRegionalesService: DatosRegionalesService) {}

  ngOnInit() {
    this.obtenerRegiones();
  }

  obtenerRegiones() {
    this.DatosRegionalesService.obtenerRegiones().subscribe(
      (data) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las regiones: ', error);
      }
    );
  }
  // Método para seleccionar una región
  seleccionarRegion(region: string) {
    this.regionSeleccionada = region;
    this.regionSeleccionadaChange.emit(region); // Emitir el evento cuando cambia la región seleccionada
  }
}

