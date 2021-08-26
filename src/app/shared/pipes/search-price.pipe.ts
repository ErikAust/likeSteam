import { Pipe, PipeTransform } from '@angular/core';
import {Game} from '../interfaces';

@Pipe({
  name: 'searchPrice'
})
export class SearchPricePipe implements PipeTransform {

  transform(games: Game[], search = ''): Game[] {
    if (!search.trim()) {
      return games;
    }

    return games.filter(game => {
      return game.price.toLowerCase().includes(search);
    });
  }

}
