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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Land', component: LandComponent },
  { path: 'PendingLandTransaction', component: PendingLandTransactionComponent },
  { path: 'Loan', component: LoanComponent },
  { path: 'LandDepartmentIndividual', component: LandDepartmentIndividualComponent },
  { path: 'PrivateIndividual', component: PrivateIndividualComponent },
  { path: 'Bank', component: BankComponent },
  { path: 'Notary', component: NotaryComponent },
  { path: 'Agent', component: AgentComponent },
  { path: 'RequestLandTransaction', component: RequestLandTransactionComponent },
  { path: 'ApprovePendingLandTransaction', component: ApprovePendingLandTransactionComponent },
  { path: 'ContractingLoan', component: ContractingLoanComponent },
  { path: 'SetLandOnSale', component: SetLandOnSaleComponent },
  { path: 'Login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
