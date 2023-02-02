import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserComponent} from './user.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {HomeComponent} from "./pages/home/home.component";
import {HeaderComponent} from "./pages/header/header.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {ChatComponent} from "./pages/chat/chat.component";


@NgModule({
  declarations: [UserComponent, HomeComponent, HeaderComponent, ChatComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        InfiniteScrollModule
    ],
})
export class UserModule {
}
