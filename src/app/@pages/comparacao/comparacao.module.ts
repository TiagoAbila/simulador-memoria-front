import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ComparacaoComponent } from './comparacao.component';

@NgModule({
  declarations: [
    ComparacaoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ComparacaoComponent]
})
export class ComparacaoModule { }
