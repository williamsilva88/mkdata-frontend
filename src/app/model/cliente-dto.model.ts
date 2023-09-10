export interface ClienteDto {
  id: number;
  nome: string;
}

export class ClienteDto implements ClienteDto {
  constructor(id?: number, nome?: string) {
    this.id = id ? id : (null as any);
    this.nome = nome ? nome : '';
  }
}
