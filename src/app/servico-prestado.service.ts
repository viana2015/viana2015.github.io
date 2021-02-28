import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { servicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiUrl: string = environment.apiUrl + '/api/servicos-prestados';

  constructor(private http: HttpClient) { }

  salvar(servicoPrestado: ServicoPrestado) : Observable<ServicoPrestado>{
    return this.http.post<ServicoPrestado>(this.apiUrl, servicoPrestado);
  }

  buscar(nome: string, mes: number) : Observable<servicoPrestadoBusca[]>{
    
    const httpParams = new HttpParams()
      .set("nome", nome)
      .set("mes", mes ? mes.toString() : '');
  
    const url = this.apiUrl + "?" + httpParams.toString();
    return this.http.get<any>(url);
  }
}
