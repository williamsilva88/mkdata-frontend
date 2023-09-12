import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteDto } from '../model/cliente-dto.model';
import { clientes } from '../mock/cliente.mock';
import { FiltroClienteDto } from '../model/filtro-cliente-dto.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  public getClients(filter: FiltroClienteDto): Observable<Array<ClienteDto>> {
    let url: string = environment.api.main + `/cliente/list`;
    let query = "";
    if(filter?.nome){
      query = !query ? `?nome=${filter?.nome}` : `nome=${filter?.nome}`; 
    }
    if(String(filter?.ativo) === 'true' || String(filter?.ativo) === 'false'){
      query = !query ? `?ativo=${filter?.ativo}` : `nome=${filter?.ativo}`; 
    }
    url = `${url}${query}`;
    return this.http.get<Array<ClienteDto>>(url);
  }

  public deleteClient(id:number): Observable<any> {
    let url: string = environment.api.main + `/cliente/${id}`;
    return this.http.delete<any>(url);
  }

  public updateClient(client:ClienteDto): Observable<ClienteDto> {
    let url: string = environment.api.main + `/cliente`;
    return this.http.put<ClienteDto>(url,client);
  }

  public insertClient(client:ClienteDto): Observable<ClienteDto> {
    let url: string = environment.api.main + `/cliente`;
    return this.http.post<ClienteDto>(url,client);
  }
}
