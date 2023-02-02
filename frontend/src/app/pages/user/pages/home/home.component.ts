import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../../../shared/api/socket.service";
import {IUser} from "../../../../shared/interfaces/app.interface";
import {AuthService} from "../../../../shared/api/auth.service";
import {MessageService} from "../../../../shared/api/message.service";
import {UserService} from "../../../../shared/api/user.service";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  activeChat = false
  page = 1;
  userName = '';
  allUsers: IUser[] = [];
  user2Id: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');
  user: IUser = {id: '', email: '', name: ''};

  constructor(private router: Router, private socket: SocketService, private auth: AuthService, private messageService: MessageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.user = this.auth.getUser();
  }

  getUsers() {
    this.userService.getAll(this.page, this.userName).subscribe(data => {
      this.allUsers = data.users;
    })
  }

  joinRoom(user2Id: string = '') {
    if (this.user2Id.value !== '') {
      this.socket.leaveRoom(this.user.id, this.user2Id.value).subscribe(() => {})
    }
    this.socket.joinRoom(this.user.id, user2Id).subscribe(() => {
      this.user2Id.next(user2Id);
      this.activeChat = true;
    });
  }
}

