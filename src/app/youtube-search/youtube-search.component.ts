import {Component,  OnInit, Injectable,  Inject, EventEmitter, ElementRef} from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { SearchResult } from './SearchResult';

export var YOUTUBE_API_KEY: string = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export var YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';
//let loadingGif: string = ((<any>window).__karma__) ? '' : require('images/loading.gif');
let loadingGif="images/loading.gif"

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})

//Servicio
@Injectable()
export class YouTubeService {
  constructor ( private http: Http,
                @Inject(YOUTUBE_API_KEY) private apiKey: string,
                @Inject(YOUTUBE_API_URL) private apiUrl:String){

  }
  search(query: string):Observable <SearchResult[]>{

    let params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');

    let queryUrl: string = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl)
                  .map( (response: Response) => {
                    return ( <any>response.json() ).items.map( item => {
                      return new SearchResult({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url
                      })
                    })
                  })
  }

}

//Variables injectables
export var youTubeServiceInjectables : Array <any> = [
  {provide: YouTubeService , useClass: YouTubeService},
  {provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY },
  {provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL },
];

/**
 * SearchBox Display
 */

@Component({
  outputs: ['loading','results'],
  selector: 'search-box',
  template:`<input type="text" class="form-control" placeholder="Search" autofocus />`
})
export class SearchBox implements OnInit {

  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  //el es de tipo ElementRef el cual es un contenedor de angular alrededor de un elemento nativo
  constructor(private youtube: YouTubeService, private el:ElementRef){

  }
  ngOnInit(): void {
    /**
     * Convierte el evento keyup en on flujo observable.
     * - Param1: El elemento nativo del DOM de este componente
     * - Param2: Nombre del evento que queremos convertir en flujo
     */
    Observable.fromEvent(this.el.nativeElement, 'keyup')
                  .map( (e:any) => e.target.value)//Extraemos el valor del input, tenemos un stream de cadenas;
                  .filter( (text:string) => text.length > 1 ) //No emite búsqueda si la longuitud de la cadena es menor que 1
                  .debounceTime(250) //pausa entre cada tecla
                  .do ( () => this.loading.next(true)) //Do: Realiza una función intermedia en el flujo, sin cambiarlo por cada evento.
                                                      //COmo loading es un emitter, se usa next(true) apra activarlo, covnerite $event en true
                  //Busca descartando los eventos anteriores  si hay algo nuevo en el input
                  .map( (query:string) => this.youtube.search(query))
                  .switch()
                  //acto de devolver la busqueda
                  .subscribe (
                    (results: SearchResult[]) => {  //on sucess
                      this.loading.next(false);
                      this.results.next(results); //Lo llamamos para que emita un evento que contenga una lista de resultados
                    },
                    (err: any) => { // on error
                      console.log(err);
                      this.loading.next(false);
                    },
                    () => { // On completion
                      this.loading.next(false);
                    }
                  );

  }
}

@Component ({
  inputs: ['result'],
  selector: 'search-result',
  template: `
    <div class="col-sm-6 col-md-3">
      <div class="thumbnail">
        <img src="{{result.thumbnailUrl}}">
        <div class="caption">
          <h3>{{result.title}}</h3>
          <p>{{result.description}}</p>
          <p><a href="{{result.videoUrl}}" class="btn btn-default" role="button">Watch</a></p>
        </div>
      </div>
    </div>
  `
})

export class SearchResultComponent {
  result: SearchResult;
}

@Component({
  selector: 'youtube-search',
  template: `
  <div class='container'>
      <div class="page-header">
        <h1>YouTube Search
          <img
            style="float: right;"
            *ngIf="loading"
            src='${loadingGif}' />
        </h1>
      </div>

      <div class="row">
        <div class="input-group input-group-lg col-md-12">
          <search-box
             (loading)="loading = $event"
             (results)="updateResults($event)"
              ></search-box>
        </div>
      </div>

      <div class="row">
        <search-result
          *ngFor="let result of results"
          [result]="result">
        </search-result>
      </div>
  </div>
  `
})
export class YoutubeSearchComponent {

  results: SearchResult[];

  constructor() {}
  ngOnInit() {}

  updateResults(results: SearchResult[]): void {
    this.results = results;
  }
}



