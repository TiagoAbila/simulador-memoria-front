import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlocacaoComponent } from './@pages/alocacao/alocacao.component';
import { ComparacaoComponent } from './@pages/comparacao/comparacao.component';

const routes: Routes = [
  { path: 'alocacao', component: AlocacaoComponent },
  { path: 'comparacao', component: ComparacaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
