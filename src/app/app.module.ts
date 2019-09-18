import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import {AngularFireAuthModule } from '@angular/fire/auth';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

var firebaseConfig = {
  apiKey: "AIzaSyAlLYUhYKAkAchSeJLCtKNsBBoNSEVjBro",
  authDomain: "final-year-2fffe.firebaseapp.com",
  databaseURL: "https://final-year-2fffe.firebaseio.com",
  projectId: "final-year-2fffe",
  storageBucket: "",
  messagingSenderId: "332019641222",
  appId: "1:332019641222:web:de1098980f2d492bd4da07"
};
var routes:Routes=[
  {path: "home", component: HomePageComponent},
  {path:'', redirectTo:'home', pathMatch: "full"}
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
