import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    private storage: Storage,
    public navCtrl: NavController) {
      this.formularioLogin = this.fb.group({
        'correo': new FormControl("",Validators.required),
        'password': new FormControl("",Validators.required),
      })
    }

    async ngOnInit(){

      await this.storage.create();
    }

    async ingresar(){
      var f = this.formularioLogin.value;
  
      var usuario = JSON.parse(localStorage.getItem('usuario')|| '{}');
  
      if(usuario.correo == f.correo && usuario.password == f.password){
        console.log('ingresado');
        localStorage.setItem('ingresado','true'); //bandera que indica sesion activa
        this.navCtrl.navigateRoot('index');
      }else{
        const alert = await this.alertController.create({
          header: '¡Ha ocurrido un error!',
          message: 'Los datos ingresados son incorrectos.',
          buttons: ['Aceptar']
        });
  
        await alert.present();
  
      }

      //guardar informacion en el storage
      this.storage.set("nombre","joey");
      

    }

}