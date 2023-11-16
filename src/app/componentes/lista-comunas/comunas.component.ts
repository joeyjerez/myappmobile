import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ComunasService } from 'src/app/servicios/comunas.service';

@Component({
  selector: 'app-comunas',
  templateUrl: './comunas.component.html',
  styleUrls: ['./comunas.component.scss'],
})
export class ComunasComponent implements OnInit {
  @Input() comunas: any[] = [];
  comunaSeleccionada: string = '';

  @Output() comunaSeleccionadaChange = new EventEmitter<string>(); // Emite eventos cuando cambia la comuna seleccionada

  constructor(private comunasService: ComunasService) {}

  ngOnInit() {
    // Puedes decidir si deseas cargar las comunas aquí o en otro lugar según tu flujo de la aplicación
  }

  // Método para seleccionar una comuna
  seleccionarComuna(comuna: string) {
    this.comunaSeleccionada = comuna;
    this.comunaSeleccionadaChange.emit(comuna); // Emitir el evento cuando cambia la comuna seleccionada
  }

  // Puedes mantener este método si decides cargar las comunas en otro momento
  obtenerComunasPorRegiones(regionId: number) {
    this.comunasService.obtenerComunasPorRegion(regionId).subscribe(
      (data) => {
        this.comunas = data.data;
        console.log('Comunas por región:', this.comunas);
      },
      (error) => {
        console.error('Error no se pueden obtener las comunas por región: ', error);
      }
    );
  }
}
