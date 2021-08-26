import {Component, OnDestroy, OnInit} from '@angular/core';
import { Gamer} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {GamesService} from '../../shared/services/games.service';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {
  gamers: Gamer[] = [];
  gamersAll: Gamer[] = [];
  pSub: Subscription;
  pSubAll: Subscription;
  searchStr = '';
  flag = true;

  constructor(private gamesService: GamesService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.pSub = this.gamesService.getAllFriends().subscribe(gamers => {
      this.gamers = gamers.filter(elem => elem.added);
    });
    this.pSubAll = this.gamesService.getAllFriends().subscribe(gamers => {
      this.gamersAll = gamers.filter(elem => !elem.added);
    });
  }

  remove(id: string) {
    this.pSub = this.gamesService.getByIdGamer(id).subscribe((gamer: Gamer) => {
      this.gamesService.updateGamer({
        ...gamer,
        added: false
      }).subscribe(() => {
        this.ngOnInit();
        this.alertService.danger('The friend has been deleted');
      });
    });
  }

  add(id: string) {
    this.pSub = this.gamesService.getByIdGamer(id).subscribe((gamer: Gamer) => {
      this.gamesService.updateGamer({
        ...gamer,
        req: true
      }).subscribe(() => {
        this.ngOnInit();
        this.alertService.success('Friendship request has been sent');
      });
    });
  }
  cancel(id: string) {
    this.pSub = this.gamesService.getByIdGamer(id).subscribe((gamer: Gamer) => {
      this.gamesService.updateGamer({
        ...gamer,
        req: false
      }).subscribe(() => {
        this.ngOnInit();
        this.alertService.danger('Friendship request has been canceled');
      });
    });
  }
  onChange(event) {
    if (!(!event.target.value)) {
      this.flag = false;
    } else {
      this.flag = true;
    }
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }
}
