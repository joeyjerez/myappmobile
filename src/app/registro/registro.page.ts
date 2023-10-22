import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) { 
      this.formularioRegistro = this.fb.group({
        'nombre': new FormControl("", Validators.required),
        'rut': new FormControl("", Validators.required),
        'correo': new FormControl("", Validators.required),
        'password': new FormControl("", Validators.required),
        'confirmacionPassword': new FormControl("", Validators.required)
        }); 
    }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Debes llenar todos los campos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    var usuario = {
      nombre: f.nombre,
      rut: f.rut,
      correo: f.correo,
      password: f.password
    }

    localStorage.setItem('usuario',JSON.stringify(usuario));
    window.location.href='/login';
  }


}