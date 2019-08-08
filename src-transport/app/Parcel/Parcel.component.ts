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
import { ParcelService } from './Parcel.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-parcel',
  templateUrl: './Parcel.component.html',
  styleUrls: ['./Parcel.component.css'],
  providers: [ParcelService]
})
export class ParcelComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  parcelId = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  maxQuantity = new FormControl('', Validators.required);
  currQuantity = new FormControl('', Validators.required);
  pStatus = new FormControl('', Validators.required);
  units = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceParcel: ParcelService, fb: FormBuilder) {
    this.myForm = fb.group({
      parcelId: this.parcelId,
      description: this.description,
      maxQuantity: this.maxQuantity,
      currQuantity: this.currQuantity,
      pStatus: this.pStatus,
      units: this.units,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceParcel.getAll()
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

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceParcel.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'parcelId': null,
        'description': null,
        'maxQuantity': null,
        'currQuantity': null,
        'pStatus': null,
        'units': null,
        'owner': null
      };

      if (result.parcelId) {
        formObject.parcelId = result.parcelId;
      } else {
        formObject.parcelId = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.maxQuantity) {
        formObject.maxQuantity = result.maxQuantity;
      } else {
        formObject.maxQuantity = null;
      }

      if (result.currQuantity) {
        formObject.currQuantity = result.currQuantity;
      } else {
        formObject.currQuantity = null;
      }

      if (result.pStatus) {
        formObject.pStatus = result.pStatus;
      } else {
        formObject.pStatus = null;
      }

      if (result.units) {
        var units_str = new String;
        result.units.forEach(element => {
          var unitstr = new String(element).split('network.')[1];
          units_str +=  (unitstr + '\n');
        });
        // formObject.units = new String(result.units).split('network.')[1];
        formObject.units = units_str;
      } else {
        formObject.units = null;
      }

      if (result.owner) {
        formObject.owner = new String(result.owner).split('network.')[1];
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

  resetForm(): void {
    this.myForm.setValue({
      'parcelId': null,
      'description': "Yêu cầu nhập mô tả",
      'maxQuantity': 100,
      'currQuantity': 0,
      'pStatus': null,
      'units': [],
      'owner': null
      });
  }

}
