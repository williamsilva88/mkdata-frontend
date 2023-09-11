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

  /**
   * Busca clientes
   */
  /*public buscarClientes(): Observable<Array<ClienteDto>> {
    const url: string = environment.api.main + `/clientes/list`;
    return this.http.get<Array<ClienteDto>>(url);
  }*/

  public getClients(filter: FiltroClienteDto): Observable<Array<ClienteDto>> {
    console.log("filter:",filter);
    return of(clientes);
  }

  public deleteClient(id:number): Observable<any> {
    console.log("id:",id);
    return of({});
  }

  public updateClient(client:ClienteDto): Observable<ClienteDto> {
    console.log("client:",client);
    return of(client);
  }

  public insertClient(client:ClienteDto): Observable<ClienteDto> {
    console.log("client:",client);
    client.id = 10;
    return of(client);
  }
}
