import { FormularioCorporativoComponent } from './formulario-corporativo/formulario-corporativo.component';
import { CorporativoMonedasComponent } from './corporativo-monedas/corporativo-monedas.component';
import { CorporativoFuncionalidadesComponent } from './corporativo-funcionalidades/corporativo-funcionalidades.component';
import { ListCorporativoComponent } from './list-corporativo/list-corporativo.component';
import { MainCorporativoComponent } from './main-corporativo/main-corporativo.component';
import { AuthorizatedGuard } from 'src/app/compartidos/login/authorizated-guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: MainCorporativoComponent,
    children: [
      { path: '', component: ListCorporativoComponent, canActivate: [AuthorizatedGuard] },
      { path: 'funcionalidades/:identificador', component: CorporativoFuncionalidadesComponent, canActivate: [AuthorizatedGuard] },
      { path: 'monedas/:identificador', component: CorporativoMonedasComponent, canActivate: [AuthorizatedGuard] },
      { path: 'add', component: FormularioCorporativoComponent, canActivate: [AuthorizatedGuard] },
      { path: 'edit/:id_corporativo', component: FormularioCorporativoComponent, canActivate: [AuthorizatedGuard] },
      { path: '**', component: ListCorporativoComponent, canActivate: [AuthorizatedGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporativoRoutingModule { }
