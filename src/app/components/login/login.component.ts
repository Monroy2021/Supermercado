import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private readonly usuarioService: UsuarioService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar() {

    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    this.usuarioService.login(usuario, password).subscribe({

      next: (resp: any) => {
        console.log(resp)

        localStorage.setItem('token', resp.token)
        this.fakeLoading();
      },
      error: (e) => {
        this.error();
        this.form.reset();

      },
    });


    /*  if (usuario == 'admin' && password == 'admin') {
       //redireccion al dashboar  
      
     } else { //se muestra un mensaje   
       this.error();
     
 
     } */
  }
  error() {
    this._snackBar.open('Usuario o contraseña incorrecta', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }

  fakeLoading() {

    this.loading = true;
    setTimeout(() => {

      //redireccion a la dashboard
      this.router.navigate(['dashboard']);


    }, 1500);
  }

}
