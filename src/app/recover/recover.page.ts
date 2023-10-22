import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  formularioRecuperar: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {
      this.formularioRecuperar = this.fb.group({
        'rut': new FormControl("",Validators.required),
        'correo': new FormControl("",Validators.required),
      })
     }

  ngOnInit() {
  }

  async recuperar(){
    var f = this.formularioRecuperar.value;

    var usuario = JSON.parse(localStorage.getItem('usuario')|| '{}');

    if(usuario.rut == f.rut && usuario.correo == f.correo){
      console.log('ingresado');
      localStorage.setItem('ingresado','true'); //bandera que indica sesion activa
      this.navCtrl.navigateRoot('pass-change');
    }else{
      const alert = await this.alertController.create({
        header: '¡Ha ocurrido un error!',
        message: 'Los datos ingresados son incorrectos.',
        buttons: ['Aceptar']
      });

      await alert.present();

    }
  }

}
