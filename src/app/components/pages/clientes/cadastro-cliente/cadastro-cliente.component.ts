import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TipoDocumentoEnum } from 'src/app/enum/tipo-documento.enum';
import { ClienteDto } from 'src/app/model/cliente-dto.model';
import { DropdownPrimeng } from 'src/app/model/dropdown-primeng.model';
import { TelefoneDto } from 'src/app/model/telefone-dto.model';
import { ClienteService } from 'src/app/service/cliente.service';
import { AtualizarLoading } from 'src/app/state/main.actions';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss'],
})
export class CadastroClienteComponent implements OnInit {
  form!: FormGroup;
  tiposDocumentos = [
    new DropdownPrimeng(TipoDocumentoEnum.FISICA, TipoDocumentoEnum.FISICA),
    new DropdownPrimeng(TipoDocumentoEnum.JURIDICA, TipoDocumentoEnum.JURIDICA),
  ];
  submitted: boolean = false;
  client!: ClienteDto;

  get telefones() {
    return this.form.controls['telefones'] as FormArray;
  }

  get describeTypeDocument(){
    return this.form?.controls['tipo']?.value?.code === 'JURIDICA'?'CNPJ':'CPF';
  }

  get describeTypeDocumentComp(){
    return this.form?.controls['tipo']?.value?.code === 'JURIDICA'?'IE':'RG';
  }

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private store: Store,
    private clienteService: ClienteService,
    private messageService: MessageService
  ) {
    this.client = config?.data?.client ? config?.data?.client : null;
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup() {
    this.form = this.fb.group({
      id: [this.client?.id ? this.client?.id : null],
      nome: [this.client?.nome ? this.client?.nome : '', Validators.required],
      tipo: [
        this.client?.tipo ? this.client?.tipo : TipoDocumentoEnum.FISICA,
        Validators.required,
      ],
      documento: [
        this.client?.documento ? this.client?.documento : '',
        Validators.required,
      ],
      rgOuIe: [this.client?.rgOuIe ? this.client?.rgOuIe : ''],
      ativo: [this.client?.ativo ? 'true' : 'false'],
      telefones: this.fb.array([]),
    });

    if (this.client?.telefones) {
      this.client.telefones.forEach((tel: TelefoneDto) => {
        this.addPhone(tel);
      });
    }
    this.phoneNotClean();
  }

  addPhone(telefone: TelefoneDto = new TelefoneDto()) {
    const array: any = this.form.controls['telefones'];
    array.push(this.createTelefoneFormGroup(telefone));
  }

  createTelefoneFormGroup(telefone: TelefoneDto = new TelefoneDto()) {
    return this.fb.group({
      id: [telefone?.id ? telefone?.id : null],
      descricao: [telefone?.descricao ? telefone?.descricao : ''],
      telefone: [telefone?.telefone ? telefone?.telefone : ''],
    });
  }

  hideDialog() {
    this.submitted = false;
    this.ref.close({
      status: false,
    });
  }

  getObjectSave() {
    const temp = this.form.getRawValue();
    const client: ClienteDto = new ClienteDto(
      temp?.id,
      temp?.nome,
      temp?.tipo,
      temp?.documento,
      temp?.rgOuIe,
      undefined,
      String(temp?.ativo) === 'true' ? true : false,
      []
    );

    if (temp?.telefones) {
      temp.telefones.forEach((v: TelefoneDto) => {
        if (v?.descricao || v?.telefone) {
          client.telefones.push(
            new TelefoneDto(undefined, v?.descricao, v?.telefone)
          );
        }
      });
    }
    return client;
  }

  saveClient() {
    this.submitted = true;
    if (this.validForm()) {
      const client: ClienteDto = this.getObjectSave();
      if (client?.id > 0) {
        this.updateClient(client);
      } else {
        this.insertClient(client);
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Alerta',
        detail: 'Existem dados obrigatórios que estão em branco!',
        life: 3000,
      });
    }
  }

  insertClient(client: ClienteDto) {
    this.store.dispatch(new AtualizarLoading(true));
    this.clienteService.insertClient(client).subscribe({
      next: (next: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cliente inserido com sucesso!',
          life: 3000,
        });
        this.store.dispatch(new AtualizarLoading(false));
        this.ref.close({
          status: true,
        });
      },
      error: (err: any) => {
        this.store.dispatch(new AtualizarLoading(false));
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err?.error?.message
            ? err.error.message
            : 'Ocorreu um problema ao inserir cliente!',
        });
      },
    });
  }

  updateClient(client: ClienteDto) {
    this.store.dispatch(new AtualizarLoading(true));
    this.clienteService.updateClient(client).subscribe({
      next: (next: any) => {
         this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Cliente atualizado com sucesso!',
          life: 3000,
        });
        this.store.dispatch(new AtualizarLoading(false));
        this.ref.close({
          status: true,
        });
      },
      error: (err: any) => {
        this.store.dispatch(new AtualizarLoading(false));
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err?.error?.message
            ? err.error.message
            : 'Ocorreu um problema ao atualizar cliente!',
        });
      },
    });
  }

  validForm() {
    return (
      this.form?.controls['nome'].valid &&
      this.form?.controls['tipo'].valid &&
      this.form?.controls['documento'].valid
    );
  }

  deletePhone(index: number) {
    this.telefones.removeAt(index);
    this.phoneNotClean();
  }

  phoneNotClean() {
    if (this.telefones.length === 0) {
      this.addPhone();
    }
  }
}
