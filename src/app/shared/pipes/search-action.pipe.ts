import { Pipe, PipeTransform } from '@angular/core';
import {Game} from '../interfaces';

@Pipe({
  name: 'searchAction'
})
export class SearchActionPipe implements PipeTransform {
  transform(games: Game[], search = ''): Game[] {
    if (!search.trim()) {
      return games;
    }

    return games.filter(game => {
      return game.genre.toLowerCase().includes(search);
    });
  }

}
