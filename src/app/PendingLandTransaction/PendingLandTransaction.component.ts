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
import { PendingLandTransactionService } from './PendingLandTransaction.service';
import { ApproveSellTransactionService } from './ApproveSellTransaction.service';
import { ApproveBuyTransactionService } from './ApproveBuyTransaction.service';
import 'rxjs/add/operator/toPromise';
import { AppComponent } from 'app/app.component';
import * as SparkMD5 from 'spark-md5';

@Component({
  selector: 'app-pendinglandtransaction',
  templateUrl: './PendingLandTransaction.component.html',
  styleUrls: ['./PendingLandTransaction.component.css'],
  providers: [PendingLandTransactionService,ApproveSellTransactionService,ApproveBuyTransactionService]
})
export class PendingLandTransactionComponent implements OnInit {

  myForm: FormGroup;
  myApproveBuyForm: FormGroup;
  myApproveSellForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private currentUser;
  private Transaction;
  private files;
  private hash;
  id = new FormControl('', Validators.required);
  land = new FormControl('', Validators.required);
  buyer = new FormControl('', Validators.required);
  seller = new FormControl('', Validators.required);
  loan = new FormControl('', Validators.required);
  agent = new FormControl('', Validators.required);
  notary = new FormControl('', Validators.required);
  newDocumentSignature = new FormControl('', Validators.required);

  newDocumentSignatureBuy = new FormControl('', Validators.required);
  newDocumentSignatureSell = new FormControl('', Validators.required);
  pendingLandTransactionSell = new FormControl('', Validators.required);
  pendingLandTransactionBuy = new FormControl('', Validators.required);

  constructor(private appComponent:AppComponent,private serviceApproveSellTransaction: ApproveSellTransactionService,private serviceApproveBuyTransaction: ApproveBuyTransactionService,public servicePendingLandTransaction: PendingLandTransactionService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      land: this.land,
      buyer: this.buyer,
      seller: this.seller,
      loan: this.loan,
      agent: this.agent,
      notary: this.notary,
      newDocumentSignature: this.newDocumentSignature
    });
    this.myApproveBuyForm = fb.group({
      newDocumentSignatureBuy: this.newDocumentSignatureBuy,
      pendingLandTransactionBuy: this.pendingLandTransactionBuy
    });
    this.myApproveSellForm = fb.group({
      newDocumentSignatureSell: this.newDocumentSignatureSell,
      pendingLandTransactionSell: this.pendingLandTransactionSell
    });
    this.currentUser = appComponent.currentUser;
  };

  ngOnInit(): void {
    this.loadAll();
  }

  setHash(hash : String){
        this.newDocumentSignatureBuy.setValue(hash);
        this.newDocumentSignatureSell.setValue(hash);
  }
  

  hasher(e){ 
      var blobSlice = File.prototype.slice ,
        file = e.target.files[0],
        chunkSize = 2097152, // read in chunks of 2MB
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        hash = new class {
          constructor(public pendingLandTransactionComponent:PendingLandTransactionComponent){
          }
          public setValue(hash: any) {
            this.pendingLandTransactionComponent.setHash(hash);
            console.log(hash);
          }
        }(this),
        spark = new SparkMD5.ArrayBuffer(),
        frOnload = function(e){
          //log.innerHTML+="\nread chunk number "+parseInt(currentChunk+1)+" of "+chunks;
          spark.append(e.target.result); // append array buffer
          currentChunk++;
          if (currentChunk < chunks)
            loadNext();
          else
            hash.setValue(spark.end());
            var log1=document.getElementById("signT");
            console.log(log1);
            console.log("\nfinished loading :)\n\ncomputed hash:\n"+hash+"\n\nyou can select another file now!\n");
        },
        frOnerror = function () {
          //log.innerHTML+="\noops, something went wrong.";
        };
      function loadNext() {
        var fileReader = new FileReader();
        fileReader.onload = frOnload;
        fileReader.onerror = frOnerror;
        var start = currentChunk * chunkSize,
          end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      };
      //log.style.display="inline-block";
      //log.innerHTML="file name: "+file.name+" ("+file.size.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')+" bytes)\n";
      loadNext();
  }

  
  // hasher(e): void{        

  //         var blobSlice = File.prototype.slice,
  //         file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0],
	// 				frOnerror = function () {
	// 					this.errorMessage ="\noops, something went wrong.";
  //         },
  //         hash=null,
  //         calculateHash(e) {
  //           var spark = new SparkMD5.ArrayBuffer();
  //           spark.append(e.target.result);
  //           hash = spark.end();
  //           console.log(hash);
  //         };
	// 				var fileReader = new FileReader();
	// 				fileReader.onload = this.calculateHash;
  //         fileReader.onerror = frOnerror;
	// 				fileReader.readAsArrayBuffer(blobSlice.call(file, 0, file.size));  
	// 			  console.log("file name: "+file.name+" ("+file.size.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')+" bytes)\n");
  // }
  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePendingLandTransaction.getAll()
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
      $class: 'org.svnit.comps.PendingLandTransaction',
      'id': this.id.value,
      'land': this.land.value,
      'buyer': this.buyer.value,
      'seller': this.seller.value,
      'loan': this.loan.value,
      'agent': this.agent.value,
      'notary': this.notary.value,
      'newDocumentSignature': this.newDocumentSignature.value
    };

    this.myForm.setValue({
      'id': null,
      'land': null,
      'buyer': null,
      'seller': null,
      'loan': null,
      'agent': null,
      'notary': null,
      'newDocumentSignature': null
    });

    return this.servicePendingLandTransaction.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'land': null,
        'buyer': null,
        'seller': null,
        'loan': null,
        'agent': null,
        'notary': null,
        'newDocumentSignature': null
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
      $class: 'org.svnit.comps.PendingLandTransaction',
      'land': this.land.value,
      'buyer': this.buyer.value,
      'seller': this.seller.value,
      'loan': this.loan.value,
      'agent': this.agent.value,
      'notary': this.notary.value,
      'newDocumentSignature': this.newDocumentSignature.value
    };

    return this.servicePendingLandTransaction.updateAsset(form.get('id').value, this.asset)
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

    return this.servicePendingLandTransaction.deleteAsset(this.currentId)
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

    return this.servicePendingLandTransaction.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'land': null,
        'buyer': null,
        'seller': null,
        'loan': null,
        'agent': null,
        'notary': null,
        'newDocumentSignature': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.land) {
        formObject.land = result.land;
      } else {
        formObject.land = null;
      }

      if (result.buyer) {
        formObject.buyer = result.buyer;
      } else {
        formObject.buyer = null;
      }

      if (result.seller) {
        formObject.seller = result.seller;
      } else {
        formObject.seller = null;
      }

      if (result.loan) {
        formObject.loan = result.loan;
      } else {
        formObject.loan = null;
      }

      if (result.agent) {
        formObject.agent = result.agent;
      } else {
        formObject.agent = null;
      }

      if (result.notary) {
        formObject.notary = result.notary;
      } else {
        formObject.notary = null;
      }

      if (result.newDocumentSignature) {
        formObject.newDocumentSignature = result.newDocumentSignature;
      } else {
        formObject.newDocumentSignature = null;
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
      'land': null,
      'buyer': null,
      'seller': null,
      'loan': null,
      'agent': null,
      'notary': null,
      'newDocumentSignature': null
      });
  }

  resetApproveBuyForm(id: any): void {
    this.myApproveBuyForm.setValue({
      'newDocumentSignatureBuy': null,
      'pendingLandTransactionBuy': id
    });
  }

  resetApproveSellForm(id: any): void {
    this.myApproveSellForm.setValue({
      'newDocumentSignatureSell': null,
      'pendingLandTransactionSell': id
    });
  }

  enableApproveBuy(buyer:any,state1:any): boolean{
    return state1=="requestedBuyer" && buyer.split(':')[1] == this.currentUser;
  }

  enableApproveSell(seller:any,state1 :any): boolean{
    return state1=="requestedSeller" && seller.split(':')[1] == this.currentUser;
  }

  addApproveBuyTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.svnit.comps.ApprovePendingLandTransactionBuyer',
      'pendingLandTransaction': 'resource:org.svnit.comps.PendingLandTransaction#'+this.pendingLandTransactionBuy.value,
      'newDocumentSignature': this.newDocumentSignatureBuy.value,
      'approve': true,
      'transactionId': null,
      'timestamp': null
    };

    this.myApproveBuyForm.setValue({
      'newDocumentSignatureBuy': null,
      'pendingLandTransactionBuy': null
    });

    return this.serviceApproveBuyTransaction.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myApproveBuyForm.setValue({
        'newDocumentSignatureBuy': null,
        'pendingLandTransactionBuy': null
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

  addApproveSellTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.svnit.comps.ApprovePendingLandTransactionSeller',
      'pendingLandTransaction': 'resource:org.svnit.comps.PendingLandTransaction#'+this.pendingLandTransactionSell.value,
      'newDocumentSignature': this.newDocumentSignatureSell.value,
      'approve': true,
      'transactionId': null,
      'timestamp': null
    };

    this.myApproveSellForm.setValue({
      'newDocumentSignatureSell': null,
      'pendingLandTransactionSell': null
    });

    return this.serviceApproveSellTransaction.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myApproveSellForm.setValue({
        'newDocumentSignatureSell': null,
        'pendingLandTransactionSell': null
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

  disapproveBuyTransaction(id: any): Promise<any> {
    this.Transaction = {
      $class: 'org.svnit.comps.ApprovePendingLandTransactionBuyer',
      'pendingLandTransaction': 'resource:org.svnit.comps.PendingLandTransaction#'+id,
      'newDocumentSignature': 'temp',
      'approve': false,
      'transactionId': null,
      'timestamp': null
    };
    return this.serviceApproveSellTransaction.addTransaction(this.Transaction)
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

  disapproveSellTransaction(id: any): Promise<any> {
    this.Transaction = {
      $class: 'org.svnit.comps.ApprovePendingLandTransactionSeller',
      'pendingLandTransaction': 'resource:org.svnit.comps.PendingLandTransaction#'+id,
      'newDocumentSignature': 'temp',
      'approve': false,
      'transactionId': null,
      'timestamp': null
    };
    return this.serviceApproveSellTransaction.addTransaction(this.Transaction)
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

}

// class HashClass {
//   constructor(pendingLandTransactionComponent: PendingLandTransactionComponent) {
//     this.pendingLandTransactionComponent = pendingLandTransactionComponent;
//   };
//   var pendingLandTransactionComponent:PendingLandTransactionComponent = null;
//   setValue(hash: any) {
//     console.log('@debug',hash);
//     pendingLandTransactionComponent.setHash(hash);
//     pendingLandTransaction = null;
//   }
// } 