import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomePersonalComponent} from './home-personal/home-personal.component';
import { FormPersonalComponent } from './form-personal/form-personal.component';
import {Route,RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatIconModule, MatOptionModule, MatSelectModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatDialogModule, MatTabsModule, MatSortModule, MatToolbarModule, MatPaginatorIntl} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginPrincipalComponent } from './login-principal/login-principal.component';
import { HomeEscuelasComponent } from './home-escuelas/home-escuelas.component';
import { FormEscuelasComponent } from './form-escuelas/form-escuelas.component';
import { TipopersonalService } from './services/tipopersonal.service';
import { TphomeComponent } from './tipopersonal/tphome/tphome.component';
import { TpaddComponent } from './tipopersonal/tpadd/tpadd.component';
import { TpeditComponent } from './tipopersonal/tpedit/tpedit.component';
import { TpdeleteComponent } from './tipopersonal/tpdelete/tpdelete.component';

const routes: Route[] = [
{path:'personal',component:HomePersonalComponent},
{path:'personalform',component:FormPersonalComponent},
{path:'personalform/:id',component:FormPersonalComponent},
{path: '', component:LoginPrincipalComponent},
{path: 'home', component:LoginPrincipalComponent},
{path: 'login', component:LoginComponent},
{path: 'escuelas', component:HomeEscuelasComponent},
{path:'escuelasform',component:FormEscuelasComponent},
{path: 'escuelasform/:id', component:FormEscuelasComponent},
{path: 'tipopersonal', component:TphomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomePersonalComponent,
    FormPersonalComponent,
    LoginComponent,
    LoginPrincipalComponent,
    HomeEscuelasComponent,
    FormEscuelasComponent,
    TphomeComponent,
    TpaddComponent,
    TpeditComponent,
    TpdeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
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
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    MatSortModule,
    MatToolbarModule,
    ReactiveFormsModule
    ],
  providers: [
    TipopersonalService,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TpeditComponent
  ],
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
