import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AlocacaoComponent } from './alocacao.component';
import { TimerComponent } from './timer/timer.component';
@NgModule({
  declarations: [
    AlocacaoComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AlocacaoComponent]
})
export class AlocacaoModule { }
