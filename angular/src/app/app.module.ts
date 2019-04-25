import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomePersonalComponent } from './home-personal/home-personal.component';
import { FormPersonalComponent } from './form-personal/form-personal.component';
import {Route,RouterModule} from '@angular/router';
import { HomeTipopersonalComponent } from './home-tipopersonal/home-tipopersonal.component';
import { FormTipopersonalComponent } from './form-tipopersonal/form-tipopersonal.component';
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
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
