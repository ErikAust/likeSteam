import {Pipe, PipeTransform} from '@angular/core';
import {Game} from '../../../shared/interfaces';

@Pipe({
    name: 'searchGames'
})
export class SearchPipe implements PipeTransform {
    transform(games: Game[], search = ''): Game[] {
        if (!search.trim()) {
            return games;
        }
        return games.filter(game => {
            return game.title.toLowerCase().includes(search.toLowerCase());
        });
    }
}
