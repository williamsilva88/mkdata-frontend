import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  /**
   * Retorna valor boleano se variável é vazia ou nula.
   * Desconsidere zero como vazio
   * @param value Valor que deseja validar se está vazio
   */
  public static isEmpty(value: any) {
    let valueReturn: boolean = false;
    try {
      if (typeof value === 'boolean') {
        valueReturn = false;
      }
      if (typeof value === 'string') {
        if (value === 'NaN' || value === 'Undefined' || value === 'Null') {
          valueReturn = true;
        } else {
          if (!value) {
            valueReturn = true;
          } else {
            valueReturn = false;
          }
        }
      }
      if (typeof value === 'number') {
        valueReturn = false;
      }
      if (typeof value === 'undefined') {
        valueReturn = true;
      }
      if (typeof value === 'object') {
        if (value == null) {
          valueReturn = true;
        } else {
          if (value.length == 0) {
            valueReturn = true;
          } else {
            if (!value.length) {
              if (!JSON.stringify(value).replace('{', '').replace('}', '')) {
                valueReturn = true;
              } else {
                valueReturn = false;
              }
            } else {
              valueReturn = false;
            }
          }
        }
      }
      if (typeof value === 'function') {
        valueReturn = false;
      }
    } catch {
      valueReturn = true;
    }

    return valueReturn;
  }
}
