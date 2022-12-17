import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


 public usuarios:any=[];

  constructor(private userService:UserService) { }

  ngOnInit(): void {

    this.userService.getUser().subscribe((resp:any)=>{
      this.usuarios=resp.data;
      console.log(this.usuarios)
    });

  }

}
