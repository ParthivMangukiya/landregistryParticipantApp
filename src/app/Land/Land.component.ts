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
import { LandService } from './Land.service';
import { SetLandOnSaleService } from '../SetLandOnSale/SetLandOnSale.service';
import { RequestLandTransactionService } from '../RequestLandTransaction/RequestLandTransaction.service';
import 'rxjs/add/operator/toPromise';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-land',
  templateUrl: './Land.component.html',
  styleUrls: ['./Land.component.css'],
  providers: [LandService,SetLandOnSaleService,RequestLandTransactionService]
})
export class LandComponent implements OnInit {

  myForm: FormGroup;
  myBuyForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private Transaction;
  private errorMessage;
  private myId;
  private currentUser;

  id = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  squareMeters = new FormControl('', Validators.required);
  price = new FormControl('', Validators.required);
  documentSignature = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  land = new FormControl('', Validators.required);
  buyer = new FormControl('', Validators.required);
  seller = new FormControl('', Validators.required);
  loan = new FormControl('', Validators.required);
  agent = new FormControl('', Validators.required);
  notary = new FormControl('', Validators.required);
  newDocumentSignature = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private appComponent:AppComponent,private serviceRequestLandTransaction: RequestLandTransactionService,private serviceSetLandOnSale: SetLandOnSaleService, public serviceLand: LandService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      address: this.address,
      squareMeters: this.squareMeters,
      price: this.price,
      documentSignature: this.documentSignature,
      state: this.state,
      owner: this.owner
    });

    this.myBuyForm = fb.group({
      land: this.land,
      buyer: this.buyer,
      seller: this.seller,
      loan: this.loan,
      agent: this.agent,
      notary: this.notary,
      newDocumentSignature: this.newDocumentSignature,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
    this.currentUser = appComponent.currentUser;
    this.myId = appComponent.currentUser.split('#')[1];
    console.log(this.myId);
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceLand.getAll()
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
      $class: 'org.svnit.comps.Land',
      'id': this.id.value,
      'address': this.address.value,
      'squareMeters': this.squareMeters.value,
      'price': this.price.value,
      'documentSignature': this.documentSignature.value,
      'state': this.state.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'id': null,
      'address': null,
      'squareMeters': null,
      'price': null,
      'documentSignature': null,
      'state': null,
      'owner': null
    });

    return this.serviceLand.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'address': null,
        'squareMeters': null,
        'price': null,
        'documentSignature': null,
        'state': null,
        'owner': null
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
      $class: 'org.svnit.comps.Land',
      'address': this.address.value,
      'squareMeters': this.squareMeters.value,
      'price': this.price.value,
      'documentSignature': this.documentSignature.value,
      'state': this.state.value,
      'owner': this.owner.value
    };

    return this.serviceLand.updateAsset(form.get('id').value, this.asset)
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

    return this.serviceLand.deleteAsset(this.currentId)
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

    return this.serviceLand.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'address': null,
        'squareMeters': null,
        'price': null,
        'documentSignature': null,
        'state': null,
        'owner': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.squareMeters) {
        formObject.squareMeters = result.squareMeters;
      } else {
        formObject.squareMeters = null;
      }

      if (result.price) {
        formObject.price = result.price;
      } else {
        formObject.price = null;
      }

      if (result.documentSignature) {
        formObject.documentSignature = result.documentSignature;
      } else {
        formObject.documentSignature = null;
      }

      if (result.state) {
        formObject.state = result.state;
      } else {
        formObject.state = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
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

  enableButtonSell(owner:any,state1:any): boolean{
    return state1=="notOnSale" && owner.split(':')[1] == this.currentUser;
  }
  
  enableButtonBuy(owner:any,state1:any): boolean{
    return state1=="onSale" && owner.split(':')[1] != this.currentUser;
  }
  resetForm(): void {
    this.myForm.setValue({
      'id': null,
      'address': null,
      'squareMeters': null,
      'price': null,
      'documentSignature': null,
      'state': null,
      'owner': null
      });
  }

  setOnSale(id: any): Promise<any> {
    this.Transaction = {
      $class: 'org.svnit.comps.SetLandOnSale',
      'land': 'resource:org.svnit.comps.Land#'+id,
      'transactionId': null,
      'timestamp': null
    };

    return this.serviceSetLandOnSale.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  resetBuyForm(landId:any,sellerId:any): void {
    this.myBuyForm.setValue({
      'land': landId,
      'buyer': this.myId,
      'seller': sellerId.split('#')[1],
      'loan': null,
      'agent': null,
      'notary': null,
      'newDocumentSignature': null,
      'transactionId': null,
      'timestamp': null
    });
  }
  
  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.svnit.comps.RequestLandTransaction',
      'land': 'resource:org.svnit.comps.Land#'+this.land.value,
      'buyer': 'resource:org.svnit.comps.PrivateIndividual#'+this.buyer.value,
      'seller': 'resource:org.svnit.comps.PrivateIndividual#'+this.seller.value,
      'loan': 'resource:org.svnit.comps.Loan#'+this.loan.value,
      'agent': 'resource:org.svnit.comps.Agent#'+this.agent.value,
      'notary': 'resource:org.svnit.comps.Notary#'+this.notary.value,
      'newDocumentSignature': this.newDocumentSignature.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myBuyForm.setValue({
      'land': null,
      'buyer': null,
      'seller': null,
      'loan': null,
      'agent': null,
      'notary': null,
      'newDocumentSignature': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceRequestLandTransaction.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myBuyForm.setValue({
        'land': null,
        'buyer': null,
        'seller': null,
        'loan': null,
        'agent': null,
        'notary': null,
        'newDocumentSignature': null,
        'transactionId': null,
        'timestamp': null
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

}
