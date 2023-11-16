import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

interface Region {
  id: number;
  nombre: string;
}

interface Comuna {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;
  regiones: Region[] = [];
  comunas: Comuna[] = [];

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private http: HttpClient,
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
    this.loadRegiones();
  }

  loadRegiones() {
    this.http.get<any>('https://dev.matiivilla.cl/duoc/location/region').subscribe({
      next: (data) => {
        this.regiones = data.data.map((region: any) => ({
          id: region.id,
          nombre: region.nombre,
        }));
      },
      error: (error) => {
        console.error('Error al obtener las regiones:', error);
      },
    });
  }

  onRegionChange() {
    const regionId = Number(this.formularioRegistro.value.region);
    if (!isNaN(regionId)) {
      this.http.get<any>(`https://dev.matiivilla.cl/duoc/location/comuna/${regionId}`).subscribe({
        next: (data) => {
          this.comunas = data.data.map((comuna: any) => ({
            id: comuna.id,
            nombre: comuna.nombre,
          }));
        },
        error: (error) => {
          console.error('Error al obtener las comunas por región:', error);
        },
      });
    } else {
      console.error('Error: No se pudo convertir la región a un número.');
    }
  }

  async guardar() {
    const f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Debes llenar todos los campos.',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }

    const usuario = {
      nombre: f.nombre,
      rut: f.rut,
      correo: f.correo,
      password: f.password,
      region: f.region,
      comuna: f.comuna,
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    window.location.href = '/login';
  }
}
