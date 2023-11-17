import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';



@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  userAlum: string | null;

  constructor(public navCtrl: NavController,
    private storage: Storage) {
    const user = JSON.parse(localStorage.getItem("usuario") || '{}');
    this.userAlum = user.nombre || 'Invitado';
   }

  ngOnInit() {
  }

  async verStorage()
  {
    let nombre = await this.storage.get("nombre");
    console.log("El nombre guardado es: "+ nombre)
  }

  logout() {
    // Elimina la información de autenticación de localStorage
    localStorage.removeItem('ingresado');
    // Redirige al usuario a la página de inicio de sesión
    this.navCtrl.navigateRoot('/login');
  }

}
