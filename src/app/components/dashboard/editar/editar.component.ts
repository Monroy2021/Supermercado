import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  form!: FormGroup;
  usuario:any;
  id:string;

  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService, private router: Router,
    private _snackBar: MatSnackBar) {

    this.id=JSON.parse(localStorage.getItem('id')!);
    this.form = this.fb.group({
      email: [``, [Validators.required, Validators.email]],
      firstName: [``, Validators.required],
      lastName: [``, Validators.required],
    })


    this._usuarioService.buscarUsuario(this.id).subscribe((resp:any)=>{
        this.usuario=resp.data;

        console.log(this.usuario)
        console.log(this.usuario.email)
        
      this.form = this.fb.group({
      email: [`${this.usuario.email}`, [Validators.required, Validators.email]],
      firstName: [`${this.usuario.first_name}`, Validators.required],
      lastName: [`${this.usuario.last_name}`, Validators.required],
    })
    })


  }

  ngOnInit(): void {
   
  }

  


  editar(){
    const user: Usuario = {

      email: this.form.value.email,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName

    }



    this._usuarioService.editarUsuario(this.id, user).subscribe(resp=>{
      console.log(resp)
    })

    console.log(this.id)
  }

  regresar(){
    this.router.navigate(['/dashboard/usuarios'])
  }
}
