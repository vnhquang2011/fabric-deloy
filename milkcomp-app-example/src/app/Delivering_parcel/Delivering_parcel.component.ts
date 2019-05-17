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
import { Delivering_parcelService } from './Delivering_parcel.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-delivering_parcel',
  templateUrl: './Delivering_parcel.component.html',
  styleUrls: ['./Delivering_parcel.component.css'],
  providers: [Delivering_parcelService]
})
export class Delivering_parcelComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  shipper_name = new FormControl('', Validators.required);
  shipper_gender = new FormControl('', Validators.required);
  transcomp_id = new FormControl('', Validators.required);
  parcel = new FormControl('', Validators.required);
  newOwner = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private serviceDelivering_parcel: Delivering_parcelService, fb: FormBuilder) {
    this.myForm = fb.group({
      shipper_name: this.shipper_name,
      shipper_gender: this.shipper_gender,
      transcomp_id: this.transcomp_id,
      parcel: this.parcel,
      newOwner: this.newOwner,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDelivering_parcel.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.milk.supplynetwork.Delivering_parcel',
      'shipper_name': this.shipper_name.value,
      'shipper_gender': this.shipper_gender.value,
      'transcomp_id': this.transcomp_id.value,
      'parcel': this.parcel.value,
      'newOwner': this.newOwner.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'shipper_name': null,
      'shipper_gender': null,
      'transcomp_id': null,
      'parcel': null,
      'newOwner': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.serviceDelivering_parcel.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'shipper_name': null,
        'shipper_gender': null,
        'transcomp_id': null,
        'parcel': null,
        'newOwner': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.milk.supplynetwork.Delivering_parcel',
      'shipper_name': this.shipper_name.value,
      'shipper_gender': this.shipper_gender.value,
      'transcomp_id': this.transcomp_id.value,
      'parcel': this.parcel.value,
      'newOwner': this.newOwner.value,
      'timestamp': this.timestamp.value
    };

    return this.serviceDelivering_parcel.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceDelivering_parcel.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.serviceDelivering_parcel.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'shipper_name': null,
        'shipper_gender': null,
        'transcomp_id': null,
        'parcel': null,
        'newOwner': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.shipper_name) {
        formObject.shipper_name = result.shipper_name;
      } else {
        formObject.shipper_name = null;
      }

      if (result.shipper_gender) {
        formObject.shipper_gender = result.shipper_gender;
      } else {
        formObject.shipper_gender = null;
      }

      if (result.transcomp_id) {
        formObject.transcomp_id = result.transcomp_id;
      } else {
        formObject.transcomp_id = null;
      }

      if (result.parcel) {
        formObject.parcel = result.parcel;
      } else {
        formObject.parcel = null;
      }

      if (result.newOwner) {
        formObject.newOwner = result.newOwner;
      } else {
        formObject.newOwner = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'shipper_name': null,
      'shipper_gender': null,
      'transcomp_id': null,
      'parcel': null,
      'newOwner': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
