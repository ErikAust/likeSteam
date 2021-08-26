import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {GamesService} from '../shared/services/games.service';
import {AuthService} from '../admin/shared/services/auth.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
    games: Game[] = [];
    pSub: Subscription;
    searchStr = '';
    searchAction = '';
    searchStrategy = '';
    searchFree = '';


    constructor(private gamesService: GamesService,
                public auth: AuthService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.pSub = this.gamesService.getAll().subscribe(games => {
            this.games = games;
        });
    }

    onChecked(event, str) {
        if (str === 'action') {
            if (event.target.checked) {
                this.searchAction = str;
            } else {
                this.searchAction = '';
            }
        } else if (str === 'strategy') {
            if (event.target.checked) {
                this.searchStrategy = str;
            } else {
                this.searchStrategy = '';
            }
        } else if (str === 'free') {
            if (event.target.checked) {
                this.searchFree = str;
            } else {
                this.searchFree = '';
            }
        }

    }

    download() {
    this.alertService.success('The download has started ...');
    }

    shared() {
        this.alertService.success('Link copied to clipboard');
    }

    ngOnDestroy() {
        if (this.pSub) {
            this.pSub.unsubscribe();
        }
    }

}
