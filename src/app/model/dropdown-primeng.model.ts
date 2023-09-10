export interface DropdownPrimeng {
  code: number | string;
  name: string;
}

export class DropdownPrimeng implements DropdownPrimeng {
  constructor(code?: number | string, name?: string) {
    this.code = code ? code : (null as any);
    this.name = name ? name : '';
  }
}
