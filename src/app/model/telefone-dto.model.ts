export interface TelefoneDto {
  id: number;
  descricao: string;
  telefone: string;
}

export class TelefoneDto implements TelefoneDto {
  constructor(id?: number, descricao?: string, telefone?: string) {
    this.id = id ? id : (null as any);
    this.descricao = descricao ? descricao : '';
    this.telefone = telefone ? telefone : '';
  }
}
