import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FbCreateResponse, Game, Gamer} from '../interfaces';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

    create(game: Game): Observable<Game> {
    return this.http.post(`${environment.fbBDUrl}/games.json`, game)
        .pipe(
            map((response: FbCreateResponse) => {
          return {
            ...game,
            id: response.name, date: new Date(game.date)
          };
        }));
  }
  getByIdGame(id: string): Observable<Game> {
      return this.http.get<Game>(`${environment.fbBDUrl}/games/${id}.json`)
          .pipe(
              map((game: Game) => {
                  return {
                      ...game, id,
                      date: new Date(game.date)
                  };
              }));
  }
    getByIdGamer(id: string): Observable<Gamer> {
        return this.http.get<Gamer>(`${environment.fbBDUrl}/friends/${id}.json`)
            .pipe(
                map((gamer: Gamer) => {
                    return {
                        ...gamer, id
                    };
                }));
    }
  update(game: Game): Observable<Game> {
      return this.http.patch<Game>(`${environment.fbBDUrl}/games/${game.id}.json`, game);
  }
    updateGamer(gamer: Gamer): Observable<Gamer> {
        return this.http.patch<Gamer>(`${environment.fbBDUrl}/friends/${gamer.id}.json`, gamer);
    }
  getAll(): Observable<Game[]> {
      return this.http.get(`${environment.fbBDUrl}/games.json`)
          .pipe(map((response: {[key: string]: any}) => {
              return Object.keys(response)
                  .map(key => ({
                      ...response[key],
                      id: key,
                      date: new Date(response[key].date)
                  }));
          }));
  }
    getAllFriends(): Observable<Gamer[]> {
        return this.http.get(`${environment.fbBDUrl}/friends.json`)
            .pipe(map((response: {[key: string]: any}) => {
                return Object.keys(response)
                    .map(key => ({
                        ...response[key],
                        id: key
                    }));
            }));
    }
}
