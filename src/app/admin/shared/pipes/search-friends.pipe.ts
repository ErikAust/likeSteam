import { Pipe, PipeTransform } from '@angular/core';
import {Gamer} from '../../../shared/interfaces';

@Pipe({
  name: 'searchFriends'
})
export class SearchFriendsPipe implements PipeTransform {

  transform(gamers: Gamer[], search = ''): Gamer[] {
    if (!search.trim()) {
      return gamers;
    }
    return gamers.filter(gamer => {
      return gamer.name.toLowerCase().includes(search.toLowerCase());
    });
  }

}
