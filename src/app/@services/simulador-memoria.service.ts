import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Resposta } from '../@models/resposta';
import { Particao, ParticoesDto } from '../@models/particao';
import { AlocarProcessoDto, DesalocarProcessoDto, Processo } from '../@models/processo';

@Injectable({
  providedIn: 'root'
})
export class SimuladorMemoriaService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private readonly http: HttpClient
  ) { }

  public setParticoes(particoesDto: ParticoesDto): Observable<Particao[]> {
    return this.http.post<Particao[]>(environment.route + '/setParticoes', particoesDto);
  }

  public reset(): Observable<any> {
    return this.http.get<any>(environment.route + '/reset');
  }

  public alocar(alocarDto: AlocarProcessoDto): Observable<Resposta> {
    return this.http.post<Resposta>(environment.route + '/alocar', JSON.stringify(alocarDto), this.httpOptions);
  }

  public desalocar(desalocarDto: DesalocarProcessoDto): Observable<Particao[]> {
    return this.http.post<Particao[]>(environment.route + '/desalocar', JSON.stringify(desalocarDto), this.httpOptions);
  }
}
