import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Memoria } from '../../@models/memoria';
import { TipoAlocacao } from '../../@models/tipo-alocacao';
import { SimuladorMemoriaService } from '../../@services/simulador-memoria.service';

@Component({
  selector: 'app-comparacao',
  templateUrl: './alocacao.component.html',
  styleUrls: ['./alocacao.component.css']
})
export class AlocacaoComponent {
  public partitions: number[] = [0];
  public timeAlocacao: number = 0;

  public listaMemoria: Memoria[] = [];

  public memorySize: number = 0

  public tipoAlocacao: TipoAlocacao = TipoAlocacao.BEST_FIT;

  public get tipoAlocacaoEnum() {
    return TipoAlocacao;
  }

  constructor(
    private readonly service: SimuladorMemoriaService
  ) { }

  public ngOnInit(): void {
    this.iniciarSimulador();
  }

  public addPartition(): void {
    this.partitions.push(0);
  }

  public sendPartitions() {
    switch (this.tipoAlocacao) {
      case TipoAlocacao.BEST_FIT:
        this.service.bestFit(this.partitions).subscribe(result => {
          this.listaMemoria = result.memoriaList;
          this.timeAlocacao = result.duracaoEmNanoSegundos;
        });
        break;
      case TipoAlocacao.WORST_FIT:
        this.service.worstFit(this.partitions).subscribe(result => {
          this.listaMemoria = result.memoriaList;
          this.timeAlocacao = result.duracaoEmNanoSegundos;
        });
        break;
      case TipoAlocacao.FIRST_FIT:
        this.service.firstFit(this.partitions).subscribe(result => {
          this.listaMemoria = result.memoriaList;
          this.timeAlocacao = result.duracaoEmNanoSegundos;
        });
        break;
    }
    this.partitions = [0];
  }

  public trackByFn(index: any, item: any) {
    return index;
  }

  public setMemory() {
    this.service.reset(this.memorySize).subscribe();
  }

  private iniciarSimulador() {
    this.service.setMemorySize(0).subscribe();
  }
}
