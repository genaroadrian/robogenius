import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomePersonalComponent} from './home-personal/home-personal.component';
import { FormPersonalComponent } from './form-personal/form-personal.component';
import {Route,RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTableModule, MatFormFieldModule,
  MatPaginatorModule, MatInputModule, MatIconModule, MatOptionModule, MatSelectModule,
  ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatDialogModule, MatTabsModule, MatSortModule,
  MatToolbarModule, MatPaginatorIntl, MatSpinner, MatProgressSpinnerModule, MatSnackBarModule,
  MatStepperModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginPrincipalComponent } from './login-principal/login-principal.component';
import { TipopersonalService } from './services/tipopersonal.service';
import { TphomeComponent } from './tipopersonal/tphome/tphome.component';
import { TpaddComponent } from './tipopersonal/tpadd/tpadd.component';
import { TpeditComponent } from './tipopersonal/tpedit/tpedit.component';
import { TpdeleteComponent } from './tipopersonal/tpdelete/tpdelete.component';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
// import { HomeComponent } from './personal/home/home.component';
import { PerhomeComponent } from './personal/perhome/perhome.component';
import { PeraddComponent } from './personal/peradd/peradd.component';
import { PereditComponent } from './personal/peredit/peredit.component';
import { PerdeleteComponent } from './personal/perdelete/perdelete.component';
import { PersonalService } from './services/personal.service';
import { HomeComponent } from './escuelas/home/home.component';
import { AddComponent } from './escuelas/add/add.component';
import { DeleteComponent } from './escuelas/delete/delete.component';
import { EditComponent } from './escuelas/edit/edit.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { TmhomeComponent } from './tipomensualidad/tmhome/tmhome.component';
import { TmaddComponent } from './tipomensualidad/tmadd/tmadd.component';
import { TmeditComponent } from './tipomensualidad/tmedit/tmedit.component';
import { TmdeleteComponent } from './tipomensualidad/tmdelete/tmdelete.component';

import { AluhomeComponent } from './alumnos/aluhome/aluhome.component';
import { AluaddComponent } from './alumnos/aluadd/aluadd.component';
import { AlueditComponent } from './alumnos/aluedit/aluedit.component';
import { AludeletComponent } from './alumnos/aludelet/aludelet.component';

import { AlumnosService } from './services/alumnos.service';
import { PadresService } from './services/padres.service';

import { PadhomeComponent } from './padres/padhome/padhome.component';
import { PadeditComponent } from './padres/padedit/padedit.component';
import { PadaddComponent } from './padres/padadd/padadd.component';
import { PaddeleteComponent } from './padres/paddelete/paddelete.component';
import { PerfilComponent } from './alumnos/perfil/perfil.component';

import { ShomeComponent } from './sucursales/shome/shome.component';
import { SaddComponent } from './sucursales/sadd/sadd.component';
import { SeditComponent } from './sucursales/sedit/sedit.component';
import { SdeleteComponent } from './sucursales/sdelete/sdelete.component';

import { HhomeComponent } from './horarios/hhome/hhome.component';
import { HeditComponent } from './horarios/hedit/hedit.component';
import { HaddComponent } from './horarios/hadd/hadd.component';
import { HdeleteComponent } from './horarios/hdelete/hdelete.component';


const routes: Route[] = [
{path:'personal',component:PerhomeComponent},
{path:'personalform',component:FormPersonalComponent},
{path: '', component:LoginPrincipalComponent},
{path: 'home', component:LoginPrincipalComponent},
{path: 'login', component:LoginComponent},
{path: 'escuelas', component:HomeComponent},
{path: 'horarios', component:HhomeComponent},
{path: 'sucursales', component:ShomeComponent},
{path: 'tipopersonal', component:TphomeComponent},
{path: 'tipomensualidad', component:TmhomeComponent},
{path: 'padres', component:PadhomeComponent},
{path: 'padresform', component:PadaddComponent},
{path: 'alumnos', component:AluhomeComponent},
{path: 'perfilalumnos', component:PerfilComponent},
{path: 'nuevoalumno', component: AluaddComponent}



];

@NgModule({
  declarations: [
    AppComponent,
    HomePersonalComponent,
    FormPersonalComponent,
    LoginComponent,
    LoginPrincipalComponent,
    TphomeComponent,
    TpaddComponent,
    TpeditComponent,
    TpdeleteComponent,
    // HomeComponent,
    PerhomeComponent,
    PeraddComponent,
    PereditComponent,
    PerdeleteComponent,
    HomeComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    TmhomeComponent,
    TmaddComponent,
    TmeditComponent,
    TmdeleteComponent,
    AluhomeComponent,
    AluaddComponent,
    AlueditComponent,
    AludeletComponent,
    PadhomeComponent,
    PadeditComponent,
    PadaddComponent,
    PaddeleteComponent,
    PerfilComponent,
    ShomeComponent,
    SaddComponent,
    SeditComponent,
    SdeleteComponent,
    HhomeComponent,
    HeditComponent,
    HaddComponent,
    HdeleteComponent,


  ],
  imports: [
    NgxUpperCaseDirectiveModule,
    NgxMaterialTimepickerModule,
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
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ToastrModule.forRoot()
    ],
  providers: [
    TipopersonalService,
    PersonalService,
    AlumnosService,
    PadresService,

    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    // Modales de tipo de personal
    TpeditComponent,
    TpaddComponent,
    TpdeleteComponent,
    // Modales de personal
    PeraddComponent,
    PereditComponent,
    PerdeleteComponent,
    // Modales de escuela
    EditComponent,
    AddComponent,
    DeleteComponent,
    // Modales de horario
    HeditComponent,
    HaddComponent,
    HdeleteComponent,
    // Modales de tipo de mensualidad
    TmeditComponent,
    TmaddComponent,
    TmdeleteComponent,
    // Modales de alumnos
    AluaddComponent,
    AlueditComponent,
    AludeletComponent,
    // Modales de padres
    PadeditComponent,
    PaddeleteComponent,
    // Modales de sucursales
    SaddComponent,
    SeditComponent,
    SdeleteComponent

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
