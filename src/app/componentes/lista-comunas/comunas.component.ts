import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ComunasService } from 'src/app/servicios/comunas.service';

@Component({
  selector: 'app-comunas',
  templateUrl: './comunas.component.html',
  styleUrls: ['./comunas.component.scss'],
})
export class ComunasComponent  implements OnInit {
  @Input() comunas: any[] = [];
  comunaSeleccionada: string = '';

  @Output() comunaSeleccionadaChange = new EventEmitter<string>(); // Emite eventos cuando cambia la región seleccionada

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
  // Método para seleccionar una comuna
  seleccionarComuna(comuna: string) {
    this.comunaSeleccionada = comuna;
    this.comunaSeleccionadaChange.emit(comuna); // Emitir el evento cuando cambia la región seleccionada
  }

}
