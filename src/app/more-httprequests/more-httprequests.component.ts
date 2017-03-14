import { Component, OnInit } from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';

@Component({
  selector: 'more-httprequests',
  templateUrl: './more-httprequests.component.html',
  styleUrls: ['./more-httprequests.component.css']
})
export class MoreHTTPRequestsComponent implements OnInit {

  data: Object;
  loading: boolean;

  constructor(private http: Http) { }

  ngOnInit() {}

  makePost(): void {
    this.loading = true;
    this.http.post('http://jsonplaceholder.typicode.com/posts',
                    JSON.stringify({
                      body: 'bar',
                      title: 'foo',
                      userId:1
                    }))
                    .subscribe( (res: Response) => {
                      this.data = res.json();
                      this.loading = false;
                    })
  }
  makeDelete(): void {
    this.loading = true;
    this.http.delete('http://jsonplaceholder.typicode.com/post/1')
                .subscribe( (res: Response ) => {
                  this.data = res.json();
                  this.loading = false;
                })
  }
  /**
   * RequestOptions
      All of the http methods we’ve covered so far also take an optional last argument: RequestOptions.
      The RequestOptions object encapsulates:
      • method
      • headers
      • body
      • mode
      • credentials
      • cache
      • url
      • search
   */

  makeHeaders(): void {
    let headers: Headers = new Headers();
    headers.append('X-API-TOKEN','ng-book');

    let opts: RequestOptions = new RequestOptions();
    opts.headers = headers;

    this.http.get('http://jsonplaceholder.typicode.com/posts/1',opts)
                .subscribe( (res: Response) => {
                  this.data = res.json();
                });
  }

}
