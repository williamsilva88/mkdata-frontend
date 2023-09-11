export interface FiltroClienteDto {
  nome: string| null;
  ativo: boolean | null;
}

export class FiltroClienteDto implements FiltroClienteDto {
  constructor(nome?: string, ativo?: boolean) {
    this.nome = nome ? nome : null;
    this.ativo = String(ativo) === 'true' ? true : String(ativo) === 'false' ? false : null;
  }
}
