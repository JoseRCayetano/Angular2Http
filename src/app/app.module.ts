import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SimpleHttpComponent } from './simple-http/simple-http.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { youTubeServiceInjectables, SearchResultComponent, SearchBox } from './youtube-search/youtube-search.component';
import { MoreHTTPRequestsComponent } from './more-httprequests/more-httprequests.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleHttpComponent,
    YoutubeSearchComponent,
     SearchBox,
    SearchResultComponent,
    MoreHTTPRequestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ youTubeServiceInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
