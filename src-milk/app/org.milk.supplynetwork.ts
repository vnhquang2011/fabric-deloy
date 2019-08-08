import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.milk.supplynetwork{
   export enum ParcelStatus {
      PREPARING,
      DELIVERING,
      INSTOCK,
   }
   export class Parcel extends Asset {
      parcelId: string;
      description: string;
      maxQuantity: number;
      currQuantity: number;
      pStatus: ParcelStatus;
      units: Unit[];
      owner: Organization;
   }
   export enum UnitStatus {
      PREPARING,
      DELIVERING,
      INSTOCK,
      SELLING,
      SOLD,
   }
   export class Unit extends Asset {
      unitName: string;
      unitId: string;
      parcelId: string;
      description: string;
      sellingDate: Date;
      soldDate: Date;
      uStatus: UnitStatus;
      owner: Organization;
   }
   export abstract class Organization extends Participant {
      orgId: string;
      name: string;
      country: string;
      phone: string;
      email: string;
   }
   export class MilkCompany extends Organization {
      description: string;
   }
   export class TransportCompany extends Organization {
      description: string;
   }
   export class Trader extends Organization {
      description: string;
   }
   export class Guest extends Participant {
      guestId: string;
   }
   export class AddUnitToParcel extends Transaction {
      parcel: Parcel;
      unit: Unit;
   }
   export enum ShipperGender {
      MALE,
      FEMALE,
   }
   export class Delivering_parcel extends Transaction {
      shipper_name: string;
      shipper_id: string;
      transcomp_id: string;
      parcel: Parcel;
      newOwner: Organization;
   }
   export class PutParcelIntoStockOfStore extends Transaction {
      parcel: Parcel;
   }
   export class ForSaleOnStore extends Transaction {
      unit: Unit;
   }
   export class Sold extends Transaction {
      unit: Unit;
   }
// }
