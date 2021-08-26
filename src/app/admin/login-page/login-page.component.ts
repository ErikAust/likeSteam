import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AlertService} from '../../shared/services/alert.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    form: FormGroup;
    submitted = false;
    message: string;

    constructor(
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params.loginAgain) {
                this.message = 'Please Sign In';
            } else if (params.authFailed) {
                this.message = 'The session has expired. Enter data again';
            }
        });
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.email, Validators.required]),
            password: new FormControl(null, [Validators.minLength(6), Validators.required])
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }
        this.submitted = true;
        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password
        };
        this.auth.login(user).subscribe(() => {
            this.form.reset();
            this.router.navigate(['admin', 'library']);
            this.submitted = false;
        }, () => {
            this.submitted = false;
        });
        this.alertService.success('You are logged in');
    }
}
