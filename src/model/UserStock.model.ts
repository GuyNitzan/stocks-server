import { Stock, Transaction } from '../model';
import {
    Model, 
    Column, 
    Table, 
    PrimaryKey,
} from "sequelize-typescript";

@Table
export class UserStock extends Model<UserStock> {

    @PrimaryKey
    @Column
    name: string;
  
    @Column
    amount: number;
    
    @Column
    value: number;
  
    @Column
    averagePurchasePrice: number;
  }

  export default UserStock;