import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: any;
  id?: number;
  
  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { 
      this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.clientesService
          .getClienteById(this.id)
          .subscribe(
            response => this.cliente = response ,
            errorResponse => this.cliente = new Cliente()
          )
      }
    })
  }

  voltarListagem(){
    this.router.navigate(['/clientes/lista'])
  }

  onSubmit(){
    if (this.id) {
      
      this.clientesService
          .atualizar(this.cliente)
          .subscribe(response => {
            this.success = true;
            //this.voltarListagem();
            this.errors = null;
          }, errorResponse => {
            this.errors = ['Erro ao atualizar o cliente.']
          })

    } else {
      this.clientesService
        .salvar(this.cliente)
        .subscribe( response => {
          this.success = true;
          this.errors = null;
          this.cliente = response;
        }, errorResponse => {
          this.success = false;
          this.errors = errorResponse.error.errors;
          
        })
    }
      
    }


}
