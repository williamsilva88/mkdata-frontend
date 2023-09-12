import { TipoDocumentoEnum } from "../enum/tipo-documento.enum";
import { ClienteDto } from "../model/cliente-dto.model";
import { TelefoneDto } from "../model/telefone-dto.model";

export const clientes = [
    new ClienteDto(1,'William da Silva',TipoDocumentoEnum.FISICA,'43988312231','96585268','15/01/2019',true,[new TelefoneDto(1,'Principal','41995986554'),new TelefoneDto(2,'Marisa','41984525252')]),
    new ClienteDto(2,'Maria Zelberman',TipoDocumentoEnum.JURIDICA,'80312115000150','4526358555','17/01/2019',true,[new TelefoneDto(3,'Principal','41945856325'),new TelefoneDto(4,'Felipe','41945758465')]),
    new ClienteDto(3,'Bruna Mascanhã',TipoDocumentoEnum.FISICA,'31854787462','756258525','18/01/2019',false,[new TelefoneDto(5,'João','41985522569')])
];