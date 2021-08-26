import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamesService} from '../../shared/services/games.service';
import {Game} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/services/alert.service';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {
    games: Game[] = [];
    pSub: Subscription;
    searchStr = '';
    searchAction = '';
    searchStrategy = '';
    searchFree = '';

    constructor(private gamesService: GamesService,
                private alertService: AlertService,
                private router: Router) {
    }

    ngOnInit() {
        this.pSub = this.gamesService.getAll().subscribe(games => {
            this.games = games.filter(elem => elem.added);
        });
    }

    remove(id) {
        this.pSub = this.gamesService.getByIdGame(id).subscribe((game: Game) => {
            this.gamesService.update({
                ...game,
                added: false
            }).subscribe(() => {
                this.ngOnInit();
                this.alertService.danger('The game has been removed from the library');
            });
        });
    }
    redirect(id: string) {
    this.router.navigate(['game', id]);
    }

    ngOnDestroy() {
        if (this.pSub) {
            this.pSub.unsubscribe();
        }
    }
}
