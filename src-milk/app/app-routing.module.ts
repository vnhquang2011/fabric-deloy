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

import { ParcelComponent } from './Parcel/Parcel.component';
import { UnitComponent } from './Unit/Unit.component';

import { MilkCompanyComponent } from './MilkCompany/MilkCompany.component';
import { TransportCompanyComponent } from './TransportCompany/TransportCompany.component';
import { TraderComponent } from './Trader/Trader.component';

import { AddUnitToParcelComponent } from './AddUnitToParcel/AddUnitToParcel.component';
import { Delivering_parcelComponent } from './Delivering_parcel/Delivering_parcel.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Parcel', component: ParcelComponent },
  { path: 'Unit', component: UnitComponent },
  { path: 'MilkCompany', component: MilkCompanyComponent },
  { path: 'TransportCompany', component: TransportCompanyComponent },
  { path: 'Trader', component: TraderComponent },
  { path: 'AddUnitToParcel', component: AddUnitToParcelComponent },
  { path: 'Delivering_parcel', component: Delivering_parcelComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
