import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {LibraryComponent} from './library/library.component';
import {FriendsComponent} from './friends/friends.component';
import {ProfileComponent} from './profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './shared/services/auth.guard';
import {SharedModule} from '../shared/shared.module';
import {SearchPipe} from './shared/pipes/search.pipe';
import { SearchFriendsPipe } from './shared/pipes/search-friends.pipe';
import {AlertComponent} from '../shared/components/alert/alert.component';


@NgModule({
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        LibraryComponent,
        FriendsComponent,
        ProfileComponent,
        SearchPipe,
        SearchFriendsPipe,
        AlertComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'library', component: LibraryComponent, canActivate: [AuthGuard]},
                    {path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
                    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
                ]
            }
        ])
    ],
    exports: [RouterModule, SearchPipe, SearchFriendsPipe, AlertComponent],
    providers: [AuthGuard]
})
export class AdminModule {
}
