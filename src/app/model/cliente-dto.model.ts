import { TipoDocumentoEnum } from '../enum/tipo-documento.enum';
import { TelefoneDto } from './telefone-dto.model';

export interface ClienteDto {
  id: number;
  nome: string;
  /** tipo (pessoa física ou jurídica) */
  tipo: TipoDocumentoEnum;
  /** CPF (se pessoa física) ou CNPJ (se pessoa jurídica)*/
  documento: string;
  rgOuIe: string;
  dataCadastro: string;
  ativo: boolean;
  telefones: TelefoneDto[];
}

export class ClienteDto implements ClienteDto {
  constructor(
    id?: number,
    nome?: string,
    tipo?: TipoDocumentoEnum,
    documento?: string,
    rgOuIe?: string,
    dataCadastro?: string,
    ativo?: boolean,
    telefones?: TelefoneDto[]
  ) {
    this.id = id ? id : (null as any);
    this.nome = nome ? nome : '';
    this.tipo = tipo ? tipo : TipoDocumentoEnum.FISICA;
    this.documento = documento ? documento : '';
    this.rgOuIe = rgOuIe ? rgOuIe : '';
    this.dataCadastro = dataCadastro ? dataCadastro : '';
    this.ativo = ativo ? ativo : true;
    this.telefones = telefones ? telefones : [];
  }
}
