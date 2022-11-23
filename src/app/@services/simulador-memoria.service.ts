import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Resposta } from '../@models/resposta';

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

  public setMemorySize(size: number): Observable<any> {
    return this.http.get<any>(environment.route + '/init?memorySize=' + size);
  }

  public reset(size: number): Observable<any> {
    return this.http.get<any>(environment.route + '/reset?memorySize=' + size);
  }

  public bestFit(partitions: number[]): Observable<Resposta> {
    return this.http.post<Resposta>(environment.route + '/bestFit', JSON.stringify(partitions), this.httpOptions);
  }

  public worstFit(partitions: number[]): Observable<Resposta> {
    return this.http.post<Resposta>(environment.route + '/worstFit', JSON.stringify(partitions), this.httpOptions);
  }

  public firstFit(partitions: number[]): Observable<Resposta> {
    return this.http.post<Resposta>(environment.route + '/firstFit', JSON.stringify(partitions), this.httpOptions);
  }
}
