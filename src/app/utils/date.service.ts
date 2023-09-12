import { UtilService } from './util.service';

export class DateUtils {
  /**
   * Converte a data em string para outro formato
   * @param obj Objeto que deseja limpar
   */
  public static dateStringFormat = (
    date: string,
    formatIn: string,
    formatOut: string
  ) => {
    if (!date) {
      return '';
    }
    const x: any = this.parseDateStrinToDateObject(date, formatIn);
    const y: any = this.parseDateObjectToDateString(x, formatOut);
    return y;
  };

  /**
   * Converte uma data de string para objeto Date
   * @param date data em formato string
   * @param formatIn
   * @returns Date
   */
  public static parseDateStrinToDateObject(date: string, formatIn: string) {
    if (!date) {
      return null;
    }
    const part = (inicio: any, final: any): number => {
      const v = Number(date.substring(inicio, final));
      return !v ? 0 : v;
    };

    switch (formatIn) {
      case 'yyyy-mm-ddThh:mi:ss':
        return new Date(
          part(0, 4),
          part(5, 7) - 1,
          part(8, 10),
          part(11, 13),
          part(14, 16),
          part(17, 19)
        );
      case 'dd/mm/yyyy':
        return new Date(part(6, 10), part(3, 5) - 1, part(0, 2), 0, 0, 0);
      case 'dd/mm/yyyy hh:mi':
        return new Date(
          part(6, 10),
          part(3, 5) - 1,
          part(0, 2),
          part(11, 13),
          part(14, 16),
          0
        );
      case 'dd/mm/yyyy hh:mi:ss':
        return new Date(
          part(6, 10),
          part(3, 5) - 1,
          part(0, 2),
          part(11, 13),
          part(14, 16),
          part(17, 19)
        );
      default:
        return null;
    }
  }

  /**
   * Converte uma data de objeto para data em string
   * @param date data em formato string
   * @param formatIn
   * @returns Date
   */
  public static parseDateObjectToDateString(date: Date, formatOut: string) {
    if (!date) {
      return '';
    }

    const part = (date: Date, type: string): string => {
      switch (type) {
        case 'year':
          return UtilService.lpad(String(date.getFullYear()), 4);
        case 'month':
          return UtilService.lpad(String(date.getMonth() + 1), 2);
        case 'day':
          return UtilService.lpad(String(date.getDate()), 2);
        case 'hour':
          return UtilService.lpad(String(date.getHours()), 2);
        case 'minute':
          return UtilService.lpad(String(date.getMinutes()), 2);
        case 'second':
          return UtilService.lpad(String(date.getSeconds()), 2);
        default:
          return '';
      }
    };

    switch (formatOut) {
      case 'yyyy-mm-ddThh:mi:ss':
        return `${part(date, 'year')}-${part(date, 'month')}-${part(
          date,
          'day'
        )}T${part(date, 'hour')}:${part(date, 'minute')}:${part(
          date,
          'second'
        )}`;
      case 'dd/mm/yyyy hh:mi:ss':
        return `${part(date, 'day')}/${part(date, 'month')}/${part(
          date,
          'year'
        )} ${part(date, 'hour')}:${part(date, 'minute')}:${part(
          date,
          'second'
        )}`;
      case 'dd/mm/yyyy':
        return `${part(date, 'day')}/${part(date, 'month')}/${part(
          date,
          'year'
        )}`;

      default:
        return null;
    }
  }

  /**
   * Realiza a validação de uma data
   * @param data Data em formato string
   * @returns
   */
  public static isValidDate(data: string) {
    if (!data) {
      return false;
    }
    let valid = true;
    const dia = Number(data.substring(0, 2));
    const mes = Number(data.substring(3, 5));
    const ano = Number(data.substring(6, 10));
    const hora = Number(data.substring(11, 13));
    const min = Number(data.substring(14, 16));

    if (UtilService.isEmpty(ano) || ano < 0) {
      valid = false;
    }
    if (UtilService.isEmpty(mes) || mes < 1 || mes > 12) {
      valid = false;
    }
    if (UtilService.isEmpty(hora) || hora < 0 || hora > 59) {
      valid = false;
    }
    if (UtilService.isEmpty(min) || min < 0 || min > 59) {
      valid = false;
    }
    if (valid) {
      // pega a data com mes a frente de proposito da data em string, assim diminuindo um dia estou no ultimo dia do mes.
      const dataAtual = new Date(ano, mes);
      dataAtual.setDate(-1);

      if (UtilService.isEmpty(dia) || dia < 1 || dia > dataAtual.getDate()) {
        valid = false;
      }
    }
    return valid;
  }
}
