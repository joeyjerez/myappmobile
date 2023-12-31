import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';

import { RegistroPage } from './registro.page';
import { ListaRegionesComponent } from '../componentes/lista-regiones/lista-regiones.component';
import { ComunasComponent } from '../componentes/lista-comunas/comunas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroPage, ListaRegionesComponent, ComunasComponent]
})
export class RegistroPageModule {}
