import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";

import { UserService } from '../services/user.service';
import { User } from "../models/user.model";
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<User>;
  friendsDisplay: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
   users: User[] = [];
  constructor(public userService: UserService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("userId")) {
        this.displayedColumns = ['name', 'phone'];
        this.getFriends(paramMap.get("userId"));
      } else {
        this.displayedColumns=['name', 'phone', 'friends'];
        this.getUsers();
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  getUsers(){
    this.friendsDisplay=false;
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    })
  }

  getFriends(id: string){
    this.friendsDisplay =true;
    this.userService.getFriends(id).subscribe(friends => {
      this.users = friends;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    })
  }

}
