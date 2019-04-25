import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePersonalComponent } from './home-personal/home-personal.component';
import { FormPersonalComponent } from './form-personal/form-personal.component';
import {Route,RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
const routes: Route[] = [
{path:'home',component:HomePersonalComponent},
{path:'form',component:FormPersonalComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePersonalComponent,
    FormPersonalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	RouterModule.forRoot(routes),
	HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
