import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  // para deixar explicito seria colocar para receber um array vazio. = []
  clientes?: Cliente[];
  clienteSelecionado!: Cliente;
  mensagemSucesso?: string;
  mensagemErro?: string;


  constructor(
    private clientesService: ClientesService,
    private router: Router) {}

  ngOnInit(): void {
    this.clientesService
      .getClientes()
      .subscribe( resposta => this.clientes = resposta);
  }

  novoCadastro(){
    this.router.navigate(['/clientes/form']);
  }
  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }
  deletarCliente(){
    this.clientesService
      .deletar( this.clienteSelecionado)
      .subscribe( 
        response => {
          this.mensagemSucesso ='Cliente excluido com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o(a) cliente.'
        )
  }
}
