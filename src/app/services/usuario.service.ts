import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

/*   listUsuarios: Usuario[] = [
    { usuario: "Juan", nombre: 'Manuel', apellido: "Monroy", sexo: 'Masculino' },
    { usuario: "Jose", nombre: 'Aurelio', apellido: "Garcia", sexo: 'Masculino' },
    { usuario: "Armando", nombre: 'Estefany', apellido: "Monroy", sexo: 'Maculino' },
    { usuario: "Caliche", nombre: 'Manuel', apellido: "Rojas", sexo: 'Masculino' },
    { usuario: "Marcos", nombre: 'Manuel', apellido: "Monroy", sexo: 'Masculino' },
  ]; */

  constructor(private readonly htpp: HttpClient) { }

 /*  getUsuarios() {
    return this.listUsuarios.slice();
  } */


  login(email: string, password: string) {
    return this.htpp.post(`https://reqres.in/api/login`, { email, password });

  }

  registrar(email: string, password: string ) {
    return this.htpp.post(`https://reqres.in/api/register`, { email, password});

  }


  crearUsuario(usuario:Usuario){
    return this.htpp.post(`https://reqres.in/api/users`, usuario);
  }


  eliminarUsuario(id:number){
    return this.htpp.delete(`https://reqres.in/api/users/${id}`);
  }

  buscarUsuario(id:string){
    return this.htpp.get(`https://reqres.in/api/users/${id}`);
  }

  editarUsuario(id:string, usuario:Usuario){

    console.log(usuario);

    return this.htpp.post(`https://reqres.in/api/users/${id}`, usuario);
  }

 /*  eliminarUsuarios(index: number) {
    this.listUsuarios.splice(index, 1);
  } */

  /* agregarUsuario(usuario: Usuario) {
    this.listUsuarios.unshift(usuario);
  } */

}
