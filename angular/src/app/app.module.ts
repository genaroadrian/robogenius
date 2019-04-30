import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomePersonalComponent} from './home-personal/home-personal.component';
import { FormPersonalComponent } from './form-personal/form-personal.component';
import {Route,RouterModule} from '@angular/router';
import { HomeTipopersonalComponent } from './home-tipopersonal/home-tipopersonal.component';
import { FormTipopersonalComponent } from './form-tipopersonal/form-tipopersonal.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatIconModule, MatOptionModule, MatSelectModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatDialogModule} from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Route[] = [
{path:'personal',component:HomePersonalComponent},
{path:'personalform',component:FormPersonalComponent},
{path:'personalform/:id',component:FormPersonalComponent},
{path: 'tipopersonal', component:HomeTipopersonalComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePersonalComponent,
    FormPersonalComponent,
    HomeTipopersonalComponent,
    FormTipopersonalComponent
    
  ],
  imports: [
    Ng2SmartTableModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule
    ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent],
  entryComponents: [FormPersonalComponent],
  exports: [
    MatButtonModule, 
    MatCheckboxModule, 
    MatTableModule, 
    MatFormFieldModule, 
    MatPaginatorModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule
  ]
  
})
export class AppModule { }
export class PizzaPartyAppModule { }
