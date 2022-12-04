import { Component, HostListener } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Particao, ParticoesDto } from '../../@models/particao';
import { AlocarProcessoDto, DesalocarProcessoDto, Processo } from '../../@models/processo';
import { TipoAlocacao } from '../../@models/tipo-alocacao';
import { SimuladorMemoriaService } from '../../@services/simulador-memoria.service';

@Component({
  selector: 'app-comparacao',
  templateUrl: './alocacao.component.html',
  styleUrls: ['./alocacao.component.css']
})
export class AlocacaoComponent {
  public partitions: number[] = [0];
  public processos: Processo[] = [];
  public timeAlocacao: number = 0;
  public processosEnviados = false;

  public listaMemoria: Particao[] = [];

  public memorySize: number = 0

  public tipoAlocacao: TipoAlocacao = TipoAlocacao.BEST_FIT;

  public get tipoAlocacaoEnum() {
    return TipoAlocacao;
  }

  constructor(
    private readonly service: SimuladorMemoriaService
  ) { }

  public ngOnInit(): void {
    this.processos.push(new Processo());
  }

  public addPartition(): void {
    this.partitions.push(0);
  }

  public addProcesso(): void {
    this.processos.push(new Processo());
  }

  public sendProcessos(): void {
    this.processosEnviados = true;
  }

  public backProcessos(): void {
    this.processosEnviados = false;
  }

  public sendPartitions() {
    const particoesDto = new ParticoesDto(this.partitions, this.memorySize, this.tipoAlocacao);
    this.service.setParticoes(particoesDto).subscribe(response => {
      this.listaMemoria = response
    });

    this.partitions = [0];
  }

  public trackByFn(index: any, item: any) {
    return index;
  }

  public reset() {
    this.service.reset().subscribe();
  }

  public onIniciarClick() {
    this.enviarProcesso();
  }

  public async enviarProcesso() {
    let espacoLivre = this.listaMemoria.filter(p => p.free).length;
    while (espacoLivre > 0 && this.processos.length > 0) {
      if (this.processos.length > 0) {
        let response = await lastValueFrom(this.service.alocar(new AlocarProcessoDto(this.processos[0], this.listaMemoria)));
        if (response.sucesso) {
          this.processos.shift();
          this.listaMemoria = response.particaoList;
        }
        else {
          break;
        }
      }
      espacoLivre = this.listaMemoria.filter(p => p.free).length;
    }
  }

  public async atualizarTempo(index: number, tempoAtualizado: number) {
    if (this.listaMemoria[index].processo) {
      if (tempoAtualizado <= 0) {
        this.listaMemoria[index].processo = new Processo();
        try {
          const lista = await lastValueFrom(this.service.desalocar(new DesalocarProcessoDto(index, this.listaMemoria)));
          this.listaMemoria = lista;
          if (this.processos.length > 0) {
            this.enviarProcesso();
          }
          return;
        }
        catch (er) {
          if (this.processos.length > 0) {
            this.enviarProcesso();
          }
        }
      }
      this.listaMemoria[index].processo.duracao = tempoAtualizado;
    }
  }

  public async carregarPreset() {
    this.partitions = [500, 300, 200];
    this.memorySize = 1000;
    this.tipoAlocacao = TipoAlocacao.BEST_FIT;
    const particoesDto = new ParticoesDto(this.partitions, this.memorySize, this.tipoAlocacao);
    const lista = await lastValueFrom(this.service.setParticoes(particoesDto));
    this.listaMemoria = lista;
    this.processos = [
      new Processo('Processo 1', 150, 15),
      new Processo('Processo 2', 250, 13),
      new Processo('Processo 3', 350, 10),
      new Processo('Processo 4', 150, 5),
      new Processo('Processo 5', 20, 10),
      new Processo('Processo 6', 300, 7),
      new Processo('Processo 7', 200, 2),
      new Processo('Processo 8', 400, 8),
    ];
    this.processosEnviados = true;
  }

  @HostListener('window:beforeunload', ['$event'])
  realoadPage($event: any) {
    this.reset();
  }
}
