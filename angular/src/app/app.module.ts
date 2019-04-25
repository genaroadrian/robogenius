import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomePersonalComponent } from './home-personal/home-personal.component';
import { FormPersonalComponent } from './form-personal/form-personal.component';
import {Route,RouterModule} from '@angular/router';
<<<<<<< HEAD
import {HttpClientModule} from '@angular/common/http';
=======
import { HomeTipopersonalComponent } from './home-tipopersonal/home-tipopersonal.component';
import { FormTipopersonalComponent } from './form-tipopersonal/form-tipopersonal.component';
>>>>>>> 3824d440820129b0f3173dfde9696c75e7cbadfc
const routes: Route[] = [
{path:'personal',component:HomePersonalComponent},
{path:'personalform',component:FormPersonalComponent},
{path: 'tipopersonal', component:HomeTipopersonalComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePersonalComponent,
    FormPersonalComponent,
    HomeTipopersonalComponent,
    FormTipopersonalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
	RouterModule.forRoot(routes),
	HttpClientModule
=======
    RouterModule.forRoot(routes),
    HttpClientModule
>>>>>>> 3824d440820129b0f3173dfde9696c75e7cbadfc
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
