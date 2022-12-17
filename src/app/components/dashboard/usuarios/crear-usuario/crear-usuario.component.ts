import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  form: FormGroup;


  constructor(private fb: FormBuilder, private _usuarioService: UsuarioService, private router: Router,
    private _snackBar: MatSnackBar) {

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  agregarUsuario() {

    const user: Usuario = {

      email: this.form.value.email,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName
    }

    this._usuarioService.crearUsuario(user).subscribe((resp=>{
      console.log(resp);
      this.router.navigate(['/dashboard/usuarios'])

      this._snackBar.open('El Usuario fue agregado', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    }));


   
  }

  regresar(){
    this.router.navigate(['/dashboard/usuarios'])
  }

}
