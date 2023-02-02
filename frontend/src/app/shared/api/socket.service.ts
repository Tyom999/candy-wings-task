import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {io} from "socket.io-client";
import {AuthService} from "./auth.service";
import {IMessage} from "../interfaces/app.interface";

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  public socket;
  public joinRoom$ = new BehaviorSubject<boolean>(true);
  public leave$ = new BehaviorSubject<boolean>(true);
  public message$ = new BehaviorSubject<IMessage>({userId: '', text: ''});

  constructor(private auth: AuthService) {
    this.socket = io('http://localhost:3000/', {auth: {authorization: this.auth.getToken()}});
  }

  joinRoom(user1Id?: string, user2Id?: string) {
    this.socket.emit('joinRoom', { user1Id, user2Id });

    return this.joinRoom$.asObservable();
  }

  leaveRoom(user1Id: string | undefined, user2Id: string | undefined) {
    this.socket.emit('leaveRoom', { user1Id, user2Id });

    return this.leave$.asObservable();
  }

  public getRoomMessage() {
    this.socket.on('roomGetMsg', (message: IMessage) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };


  sendRoomMessage(message: IMessage) {
    this.socket.emit('roomSendMsg', message);

    return this.message$.asObservable();
  }

}

