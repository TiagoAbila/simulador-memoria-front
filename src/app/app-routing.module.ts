import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlocacaoComponent } from './@pages/alocacao/alocacao.component';

const routes: Routes = [
  { path: 'alocacao', component: AlocacaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
