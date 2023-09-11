import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ClienteDto } from 'src/app/model/cliente-dto.model';
import { ClienteService } from 'src/app/service/cliente.service';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { Store } from '@ngxs/store';
import { AtualizarLoading } from 'src/app/state/main.actions';
import { FiltroClienteDto } from 'src/app/model/filtro-cliente-dto.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  form!: FormGroup;
  optionsActivated: any[] = [
    { text: 'Ativo', code: 'ATIVO' },
    { text: 'Inativo', code: 'INATIVO' },
    { text: 'Todos', code: 'TODOS' },
  ];

  clients!: ClienteDto[];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.getClients();
  }

  initFormGroup() {
    this.form = this.fb.group({
      name: [''],
      active: [{ text: 'Todos', code: 'TODOS' }],
    });
  }

  getActiveCode(value:any){
    return value?.code === 'ATIVO'?true: value?.code === 'INATIVO' ? false : undefined;
  }

  getClients() {
    const filter = new FiltroClienteDto(
      this.form.getRawValue().name,
      this.getActiveCode(this.form.getRawValue().active)
    );
    this.clienteService
      .getClients(filter)
      .subscribe((data: Array<ClienteDto>) => {
        this.clients = data ? data : [];
      });
  }

  getDescribeActive(field: boolean) {
    return field ? 'Sim' : 'Não';
  }

  openNew() {
    this.showRegister(undefined, 'Novo cliente');
  }

  editClient(client: ClienteDto) {
    this.showRegister(client, 'Atualizar cliente');
  }

  showRegister(client: ClienteDto = new ClienteDto(), title = '') {
    const clientParam = { ...client };
    const ref = this.dialogService.open(CadastroClienteComponent, {
      header: title,
      width: '90%',
      height: '90%',
      style: { 'max-width': '600px', overflow: 'auto' },
      baseZIndex: 10000,
      closable: false,
      data: { client: clientParam },
    });

    ref.onClose.subscribe((result: any) => {
      if (result?.status) {
        this.getClients();
      }
    });
  }

  deleteClient(client: ClienteDto) {
    this.confirmationService.confirm({
      message: 'Deseja excluir o cliente ' + client.nome + '?',
      header: 'Exclusão',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (client?.id) {
          this.store.dispatch(new AtualizarLoading(true));
          this.clienteService.deleteClient(client?.id).subscribe((_) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Cliente excluído com sucesso!',
              life: 3000,
            });
            this.store.dispatch(new AtualizarLoading(false));
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Cliente não tem identificador!',
            life: 3000,
          });
        }
      },
    });
  }

  getEventValue(event: any) {
    return event?.target?.value;
  }
}
