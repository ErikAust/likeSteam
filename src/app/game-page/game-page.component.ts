import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {GamesService} from '../shared/services/games.service';
import {Observable, Subscription} from 'rxjs';
import {Game} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';
import {AlertService} from '../shared/services/alert.service';
import {AuthService} from '../admin/shared/services/auth.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {
  game$: Observable<Game>;
  pSub: Subscription;

  constructor(private router: ActivatedRoute,
              private gamesService: GamesService,
              private alertService: AlertService,
              public auth: AuthService) { }

  ngOnInit() {
    this.game$ = this.router.params
        .pipe(switchMap((params: Params) => {
          return this.gamesService.getByIdGame(params.id);
        }));
  }

    add(id: string) {
      this.pSub = this.gamesService.getByIdGame(id).subscribe((game: Game) => {
        this.gamesService.update({
          ...game,
          added: true
        }).subscribe(() => {
          this.ngOnInit();
          this.alertService.success('The game has been added to the library');
        });
      });
    }

  remove(id: string) {
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

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
}
