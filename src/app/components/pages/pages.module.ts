import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NgxsModule } from '@ngxs/store';
import { MainState } from 'src/app/state/main.state';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/primeng.module';
import { ClientesComponent } from './clientes/clientes.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CadastroClienteComponent } from './clientes/cadastro-cliente/cadastro-cliente.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    ClientesComponent,
    NotFoundComponent,
    CadastroClienteComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxsModule.forFeature([MainState]),
    MaterialModule,
    ReactiveFormsModule,
    PrimeNgModule,
    FormsModule,
    NgxMaskModule.forChild(),
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
