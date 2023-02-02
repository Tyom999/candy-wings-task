import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IMessage, IUser} from "../../../../shared/interfaces/app.interface";
import {SocketService} from "../../../../shared/api/socket.service";
import {AuthService} from "../../../../shared/api/auth.service";
import {MessageService} from "../../../../shared/api/message.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy,} from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() user2Id: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  page = 1;
  message = '';
  subs: Subscription[] = [];
  allMessages: IMessage[] = [];
  user: IUser = {id: '', email: '', name: ''};

  constructor(
    private auth: AuthService,
    private socket: SocketService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.user = this.auth.getUser();

    this.user2Id.subscribe(() => {
      this.page = 1;
      this.allMessages = [];
      this.getMessages();
    })

    const roomMessageSub = this.socket.getRoomMessage()
      .subscribe((newMessage) => {
        if (newMessage.text) {
          this.allMessages.push(newMessage);
        }
      });

    this.subs.push(roomMessageSub)
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }

  send() {
    const newMessage = {
      user1Id: this.user.id,
      user2Id: this.user2Id.value,
      text: this.message,
      userName: this.user.name,
      createdAt: new Date()
    };

    this.socket.sendRoomMessage(newMessage).subscribe(() => {
      this.message = '';
      requestAnimationFrame(() => {
        this.scrollToBottom();
      })
    });
  }

  getMessages(page: number = this.page) {
    this.page = page;
    this.messageService.getAll(this.page, this.user2Id.value).subscribe(data => {
      this.allMessages = [...data.messages, ...this.allMessages];
      if(page === 1) {
        requestAnimationFrame(() => {
          this.scrollToBottom();
        })
      }
    });
  }

  ngOnDestroy() {
    this.socket.leaveRoom(this.user.id, this.user2Id.value).subscribe(() => {});

    this.subs.forEach(item => item.unsubscribe());
  }
}
