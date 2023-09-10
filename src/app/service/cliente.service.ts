import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClienteDto } from '../model/cliente-dto.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  /**
   * Busca clientes
   */
  public buscarClientes(): Observable<Array<ClienteDto>> {
    const url: string = environment.api.main + `/clientes/list`;
    return this.http.get<Array<ClienteDto>>(url);
  }
}
