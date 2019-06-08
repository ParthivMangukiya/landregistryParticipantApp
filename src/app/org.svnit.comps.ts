import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.svnit.comps{
   export class LandDepartmentIndividual extends Participant {
      id: string;
      name: string;
      designation: string;
   }
   export class PrivateIndividual extends Participant {
      id: string;
      name: string;
      address: string;
      balance: number;
   }
   export class Bank extends Participant {
      id: string;
      name: string;
      balance: number;
   }
   export class Notary extends Participant {
      id: string;
      name: string;
      address: string;
      balance: number;
   }
   export class Agent extends Participant {
      id: string;
      name: string;
      balance: number;
      feeRate: number;
   }
   export class Land extends Asset {
      id: string;
      address: string;
      squareMeters: number;
      price: number;
      documentSignature: string;
      state: string;
      owner: PrivateIndividual;
   }
   export class PendingLandTransaction extends Asset {
      id: string;
      land: Land;
      buyer: PrivateIndividual;
      seller: PrivateIndividual;
      loan: Loan;
      agent: Agent;
      notary: Notary;
      newDocumentSignature: string;
   }
   export class Loan extends Asset {
      id: string;
      amount: number;
      interestRate: number;
      debtor: PrivateIndividual;
      bank: Bank;
      land: Land;
      durationInMonths: number;
   }
   export class RequestLandTransaction extends Transaction {
      land: Land;
      buyer: PrivateIndividual;
      seller: PrivateIndividual;
      loan: Loan;
      agent: Agent;
      notary: Notary;
      newDocumentSignature: string;
   }

   export class ApprovePendingLandTransactionSeller extends Transaction {
      pendingLandTransaction: PendingLandTransaction;
      newDocumentSignature: string;
      approve: boolean;
   }

   export class ApprovePendingLandTransactionBuyer extends Transaction {
      pendingLandTransaction: PendingLandTransaction;
      newDocumentSignature: string;
      approve: boolean;
   }

   export class GetLandHistoryForId extends Transaction {
      landId: string;
   }

   export class ApprovePendingLandTransaction extends Transaction {
      pendingLandTransaction: PendingLandTransaction;
      newDocumentSignature: string;
      approve: boolean;
   }
   export class ContractingLoan extends Transaction {
      debtor: PrivateIndividual;
      bank: Bank;
      land: Land;
      interestRate: number;
      durationInMonths: number;
   }
   export class SetLandOnSale extends Transaction {
      land: Land;
   }
// }
