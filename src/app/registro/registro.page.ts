import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { DatosRegionalesService } from '../servicios/datos-regionales.service';// Asegúrate de proporcionar la ruta correcta
import { ComunasService } from '../servicios/comunas.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;
  regionSeleccionada: string = '';
  regiones: any[] = []; // Lista de regiones para usar en RegistroPage
  comunaSeleccionada: string = '';
  comunas: any[] = [];

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    private datosRegionalesService: DatosRegionalesService,
    private ComunasService: ComunasService
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl('', Validators.required),
      rut: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmacionPassword: new FormControl('', Validators.required),
      region: new FormControl(''),
      comuna: new FormControl(''),
    });
  }

  

  ngOnInit() {
    this.obtenerRegiones();
    this.obtenerComunas();
  }

  obtenerRegiones() {
    this.datosRegionalesService.obtenerRegiones().subscribe(
      (data) => {
        this.regiones = data.data; // Llenar la lista de regiones en RegistroPage
      },
      (error) => {
        console.error('Error al obtener las regiones: ', error);
      }
    );
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

  async guardar() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Debes llenar todos los campos.',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }
    var usuario = {
      nombre: f.nombre,
      rut: f.rut,
      correo: f.correo,
      password: f.password,
      region: f.region,
      comuna: f.comuna
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = '/login';
  }
}
