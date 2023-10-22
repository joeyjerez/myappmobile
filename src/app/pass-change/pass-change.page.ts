import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pass-change',
  templateUrl: './pass-change.page.html',
  styleUrls: ['./pass-change.page.scss'],
})
export class PassChangePage implements OnInit {

  formularioContrasena: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) { 
      this.formularioContrasena = this.fb.group({
        'password': new FormControl("", Validators.required),
        'confirmacionPassword': new FormControl("", Validators.required)
        }); 
    }

  ngOnInit() {
  }
  

  async cambiar(){
    var f = this.formularioContrasena.value;

    if(this.formularioContrasena.invalid){
      const alert = await this.alertController.create({
        header: 'Campos incompletos',
        message: 'Debes llenar todos los campos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    var contra = {
      password: f.password
    }

    const elemento = localStorage.getItem('usuario');

    if(this.formularioContrasena.valid, elemento){
  
    const con = JSON.parse(elemento);
    con.password = contra.password;
    localStorage.setItem('usuario',JSON.stringify(con));
    }

    
    window.location.href='/home';
  }

}

