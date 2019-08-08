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

/**
 * Track the add unit to parcel transaction
 * @param {org.milk.supplynetwork.AddUnitToParcel} u2p - the unit-to-parcel transaction need to be processed
 * @transaction
 */
async function addUnitToParcel(u2p) {
    if (u2p.parcel.currQuantity < u2p.parcel.maxQuantity) {
        // set unit's parcelId = parcelId
        u2p.unit.parcelId = u2p.parcel.parcelId;
        // push this unit to the parcel it belongs to
        u2p.parcel.units.push(u2p.unit);
        // update current units number
        u2p.parcel.currQuantity += 1;

        /** Update Unit asset then Parcel asset */
        // get the asset registry for the Unit asset
        let unitRegistry = await getAssetRegistry('org.milk.supplynetwork.Unit');
        // update the unit asset in the asset registry
        await unitRegistry.update(u2p.unit);
        // get the asset registry for the Parcel asset
        let parcelRegistry = await getAssetRegistry('org.milk.supplynetwork.Parcel');
        // update the parcel asset in the asset registry
        await parcelRegistry.update(u2p.parcel);
    } else {
        throw new Error("The number of units must not exceed the maximum quantity per parcel");
    }
}

/**
 * Delieving a parcel from one organization to another
 * @param {org.milk.supplynetwork.Delivering_parcel} delive - the trade to be processed
 * @transaction
 */
async function Delivering_parcel(delive) {
    // update parcel owner to the new one
    delive.parcel.owner = delive.newOwner;
    // change parcel's status to DELIVERING
    delive.parcel.pStatus = "DELIVERING";
  	// loop to update new owner for all units belongs to this parcel
  	for (var i=0; i<delive.parcel.units.length; i++) {
        delive.parcel.units[i].owner = delive.parcel.owner;
        delive.parcel.units[i].uStatus = delive.parcel.pStatus;
      	// get the asset registry for the Unit asset
      	let unitRegistry = await getAssetRegistry('org.milk.supplynetwork.Unit');
      	// update the asset in the asset registry
      	await unitRegistry.update(delive.parcel.units[i]);
    }
    // get the asset registry for the Parcel asset
    let parcelRegistry = await getAssetRegistry('org.milk.supplynetwork.Parcel');
    // update the asset in the asset registry
    await parcelRegistry.update(delive.parcel);
}

/**
 * Track the for-sale transaction of a unit product
 * @param {org.milk.supplynetwork.PutParcelIntoStockOfStore} pis - the for-sale transaction to be processed
 * @transaction
 */
async function PutParcelIntoStockOfStore(pis) {
  if (pis.parcel.pStatus == "DELIVERING") {
      // loop to update new status for all units belongs to this parcel
      for (var i=0; i<pis.parcel.units.length; i++) {
        pis.parcel.units[i].uStatus = "INSTOCK";
          // get the asset registry for the Unit asset
          let unitRegistry = await getAssetRegistry('org.milk.supplynetwork.Unit');
          // update the asset in the asset registry
          await unitRegistry.update(pis.parcel.units[i]);
      }
      // change parcel's status to INSTOCK
      pis.parcel.pStatus = "INSTOCK";
      // get the asset registry for the Parcel asset
      let parcelRegistry = await getAssetRegistry('org.milk.supplynetwork.Parcel');
      // update the asset in the asset registry
      await parcelRegistry.update(pis.parcel);
  	} 
  else {
        throw new Error("Cannot put parcel into stock, please check parcel's status");
    }
}

/**
 * Track the for-sale transaction of a unit product
 * @param {org.milk.supplynetwork.ForSaleOnStore} fs - the for-sale transaction to be processed
 * @transaction
 */
async function forSaleOnStore(fs) {
  if (fs.unit.uStatus == "INSTOCK") {
      // update unit status to SELLING
      fs.unit.uStatus = "SELLING";
      fs.unit.sellingDate = new Date();
      // get the asset registry for the Unit asset
      let unitRegistry = await getAssetRegistry('org.milk.supplynetwork.Unit');
      // update the asset in the asset registry
      await unitRegistry.update(fs.unit);
  }
  else {
        throw new Error("Cannot doing, plaese put unit's parcel into stock of store first");
    }
}

/**
 * Track the sold transaction of a unit product
 * @param {org.milk.supplynetwork.Sold} s - the sold transaction to be processed
 * @transaction
 */
async function sold(s) {
  if (s.unit.uStatus == "SELLING"){
    // update unit status to SOLD
    s.unit.uStatus = "SOLD";
    s.unit.soldDate = new Date();
    // get the asset registry for the Unit asset
    let unitRegistry = await getAssetRegistry('org.milk.supplynetwork.Unit');
    // update the unit asset in the asset registry
    await unitRegistry.update(s.unit);
  } 
  else {
    throw new Error("Cannot sell this unit, plaese doing forSale on this unit first");
  }
}
