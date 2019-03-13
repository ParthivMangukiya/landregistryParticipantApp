/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { RestService } from './rest.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { LandComponent } from './Land/Land.component';
import { PendingLandTransactionComponent } from './PendingLandTransaction/PendingLandTransaction.component';
import { LoanComponent } from './Loan/Loan.component';

import { LandDepartmentIndividualComponent } from './LandDepartmentIndividual/LandDepartmentIndividual.component';
import { PrivateIndividualComponent } from './PrivateIndividual/PrivateIndividual.component';
import { BankComponent } from './Bank/Bank.component';
import { NotaryComponent } from './Notary/Notary.component';
import { AgentComponent } from './Agent/Agent.component';

import { RequestLandTransactionComponent } from './RequestLandTransaction/RequestLandTransaction.component';
import { ApprovePendingLandTransactionComponent } from './ApprovePendingLandTransaction/ApprovePendingLandTransaction.component';
import { ContractingLoanComponent } from './ContractingLoan/ContractingLoan.component';
import { SetLandOnSaleComponent } from './SetLandOnSale/SetLandOnSale.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';


  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandComponent,
    PendingLandTransactionComponent,
    LoanComponent,
    LandDepartmentIndividualComponent,
    PrivateIndividualComponent,
    BankComponent,
    NotaryComponent,
    AgentComponent,
    RequestLandTransactionComponent,
    ApprovePendingLandTransactionComponent,
    ContractingLoanComponent,
    SetLandOnSaleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    RestService,
    AppComponent,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
