import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  form: FormGroup;
  loading: boolean | undefined;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private readonly usuarioService: UsuarioService) {
    this.form = this.fb.group({
      email: ['eve.holt@reqres.in',  [Validators.required, Validators.email]],
      password: ['pistol', Validators.required],
      Rpassword: ['', Validators.required]
    })
  }
  ngOnInit(): void {
  }



  registrar() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    const Rpassword = this.form.value.Rpassword;


    //VAlidacion 

    if(password!==Rpassword){
        this.error("Las contraseñas deben de ser iguales");
    }else{
      this.usuarioService.registrar(email, password).subscribe({
        next: (resp: any) => {
          console.log(resp)
           localStorage.setItem('token', resp.token)
          this.fakeLoading(); 
        },
        error: (e) => {
          this.error("A ocurrido un error a la hora de registrarse, verifica el correo");
          this.form.reset(); 
        }
      }); 
    }
  

   
  }

 /*  

  }, */


  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      //redireccion a la dashboard
      this.router.navigate(['dashboard']);
    }, 1500);
  }

  error(mensage:string) {
    this._snackBar.open(mensage, '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }

}
