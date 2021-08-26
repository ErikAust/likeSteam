import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../admin/shared/services/auth.service';
import {AlertService} from '../../services/alert.service';


@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

    constructor(private router: Router,
                public auth: AuthService,
                private alertService: AlertService) {
    }

    ngOnInit() {
    }
    login(event: Event) {
        event.preventDefault();
        this.router.navigate(['admin', 'login']);

    }

    logout(event: Event) {
        event.preventDefault();
        this.auth.logout();
        this.alertService.danger('You are logged out');
    }
}
