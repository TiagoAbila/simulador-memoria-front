import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Memoria } from './@models/memoria';
import { SimuladorMemoriaService } from './@services/simulador-memoria.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public partitions: number[] = [0];
  public timeWorstFit: number = 0;
  public timeBestFit: number = 0;
  public timeFirstFit: number = 0;

  public listaWorstFit: Memoria[] = [];
  public listaBestFit: Memoria[] = [];
  public listaFirstFit: Memoria[] = [];

  public memorySize: number = 0

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
    forkJoin({
      reset1: this.service.reset(this.memorySize),
      worstFit: this.service.worstFit(this.partitions),
      reset2: this.service.reset(this.memorySize),
      bestFit: this.service.bestFit(this.partitions),
      reset3: this.service.reset(this.memorySize),
      firstFit: this.service.firstFit(this.partitions)
    }).subscribe(result => {
      this.listaWorstFit = result.worstFit.memoriaList;
      this.timeWorstFit = result.worstFit.duracaoEmNanoSegundos;
      this.listaBestFit = result.bestFit.memoriaList;
      this.timeBestFit = result.bestFit.duracaoEmNanoSegundos;
      this.listaFirstFit = result.firstFit.memoriaList;
      this.timeFirstFit = result.firstFit.duracaoEmNanoSegundos;
    });
  }

  public trackByFn(index: any, item: any) {
    return index;
  }

  private iniciarSimulador() {
    this.service.setMemorySize(0).subscribe();
  }
}
