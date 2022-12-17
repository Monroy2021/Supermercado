import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

  listUsuarios: Usuario[] = [];
  

  /* 'apellido', 'sexo', 'acciones' */
  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'acciones'];
  dataSource: MatTableDataSource<any>=new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialog: any;
 
  id=12;

  


  constructor(private _usuarioService: UsuarioService,private router:Router, private userService:UserService, private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.cargarUsuarios();
   
  }
  
 
  
  
  
   cargarUsuarios() {
    this.userService.getUser().subscribe((resp:any)=>{
      this.listUsuarios=resp.data;
      this.dataSource.data = this.listUsuarios;
      console.log(this.listUsuarios);
      
    }); 
   
    
    

  
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(id:number){
    localStorage.setItem('id', String(id));
    this.router.navigate(['/dashboard/editar-usuario']);
  }

  delete(id:number){
    this._usuarioService.eliminarUsuario(id).subscribe(resp=>{
      this._snackBar.open('El Usuario fue eliminado', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
      this.cargarUsuarios();
    })
  }

 

}
