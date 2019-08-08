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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ParcelComponent } from './Parcel/Parcel.component';
import { UnitComponent } from './Unit/Unit.component';

import { MilkCompanyComponent } from './MilkCompany/MilkCompany.component';
import { TransportCompanyComponent } from './TransportCompany/TransportCompany.component';
import { TraderComponent } from './Trader/Trader.component';

import { AddUnitToParcelComponent } from './AddUnitToParcel/AddUnitToParcel.component';
import { Delivering_parcelComponent } from './Delivering_parcel/Delivering_parcel.component';
import { CarouselModule } from 'angular4-carousel';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ParcelComponent,
    UnitComponent,
    MilkCompanyComponent,
    TransportCompanyComponent,
    TraderComponent,
    AddUnitToParcelComponent,
    Delivering_parcelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    CarouselModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
