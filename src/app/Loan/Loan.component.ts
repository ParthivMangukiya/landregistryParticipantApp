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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoanService } from './Loan.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-loan',
  templateUrl: './Loan.component.html',
  styleUrls: ['./Loan.component.css'],
  providers: [LoanService]
})
export class LoanComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  interestRate = new FormControl('', Validators.required);
  debtor = new FormControl('', Validators.required);
  bank = new FormControl('', Validators.required);
  land = new FormControl('', Validators.required);
  durationInMonths = new FormControl('', Validators.required);

  constructor(public serviceLoan: LoanService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      amount: this.amount,
      interestRate: this.interestRate,
      debtor: this.debtor,
      bank: this.bank,
      land: this.land,
      durationInMonths: this.durationInMonths
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceLoan.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.svnit.comps.Loan',
      'id': this.id.value,
      'amount': this.amount.value,
      'interestRate': this.interestRate.value,
      'debtor': this.debtor.value,
      'bank': this.bank.value,
      'land': this.land.value,
      'durationInMonths': this.durationInMonths.value
    };

    this.myForm.setValue({
      'id': null,
      'amount': null,
      'interestRate': null,
      'debtor': null,
      'bank': null,
      'land': null,
      'durationInMonths': null
    });

    return this.serviceLoan.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'amount': null,
        'interestRate': null,
        'debtor': null,
        'bank': null,
        'land': null,
        'durationInMonths': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.svnit.comps.Loan',
      'amount': this.amount.value,
      'interestRate': this.interestRate.value,
      'debtor': this.debtor.value,
      'bank': this.bank.value,
      'land': this.land.value,
      'durationInMonths': this.durationInMonths.value
    };

    return this.serviceLoan.updateAsset(form.get('id').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceLoan.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceLoan.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'amount': null,
        'interestRate': null,
        'debtor': null,
        'bank': null,
        'land': null,
        'durationInMonths': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.amount) {
        formObject.amount = result.amount;
      } else {
        formObject.amount = null;
      }

      if (result.interestRate) {
        formObject.interestRate = result.interestRate;
      } else {
        formObject.interestRate = null;
      }

      if (result.debtor) {
        formObject.debtor = result.debtor;
      } else {
        formObject.debtor = null;
      }

      if (result.bank) {
        formObject.bank = result.bank;
      } else {
        formObject.bank = null;
      }

      if (result.land) {
        formObject.land = result.land;
      } else {
        formObject.land = null;
      }

      if (result.durationInMonths) {
        formObject.durationInMonths = result.durationInMonths;
      } else {
        formObject.durationInMonths = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'id': null,
      'amount': null,
      'interestRate': null,
      'debtor': null,
      'bank': null,
      'land': null,
      'durationInMonths': null
      });
  }

}
