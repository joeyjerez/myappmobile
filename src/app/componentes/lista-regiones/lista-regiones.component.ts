import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatosRegionalesService } from 'src/app/servicios/datos-regionales.service';
import { ComunasService } from 'src/app/servicios/comunas.service';

@Component({
  selector: 'app-lista-regiones',
  templateUrl: './lista-regiones.component.html',
  styleUrls: ['./lista-regiones.component.scss'],
})
export class ListaRegionesComponent implements OnInit {
  @Input() regiones: any[] = [];
  regionSeleccionada: string = ''; // Valor inicial asignado

  @Output() regionSeleccionadaChange = new EventEmitter<string>();

  constructor(
    private datosRegionalesService: DatosRegionalesService,
    private comunasService: ComunasService
  ) {}

  ngOnInit() {
    this.obtenerRegiones();
  }

  obtenerRegiones() {
    this.datosRegionalesService.obtenerRegiones().subscribe(
      (data) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las regiones: ', error);
      }
    );
  }

  seleccionarRegion(region: string) {
    this.regionSeleccionada = region;
    this.regionSeleccionadaChange.emit(region);
    this.obtenerComunasPorRegion(region); // Pasamos la región seleccionada
  }

  private obtenerComunasPorRegion(region: string) {
    const regionId = parseInt(region, 10); // Convertir la región de cadena a número
    if (!isNaN(regionId)) { // Verificar que la conversión sea exitosa
      this.comunasService.obtenerComunasPorRegion(regionId).subscribe(
        (data) => {
          console.log('Comunas por región:', data);
          // Puedes emitir un evento aquí si es necesario
        },
        (error) => {
          console.error('Error no se pueden obtener las comunas por región: ', error);
        }
      );
    } else {
      console.log('Región no válida');
    }
  }
}
