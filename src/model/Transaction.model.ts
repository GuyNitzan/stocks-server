import { Stock, UserStock } from '../model';
import {
    Model, 
    Column, 
    Table, 
    HasMany, 
    // Scopes, 
    PrimaryKey,
    AutoIncrement,
    CreatedAt, 
    UpdatedAt,
    ForeignKey
} from "sequelize-typescript";

@Table
export class Transaction extends Model<Transaction> {

    @Column
    stockName: string;
    
    @Column
    amount: number;
    
    @Column
    price: number;
  
    @Column
    type: string;

    @Column
    date: string;
  }

  export default Transaction;

  // module.exports = (sequelize, DataTypes) => {

  //   const User = sequelize.define('User', {
  //     first_name: DataTypes.STRING,
  //     last_name: DataTypes.STRING,
  //     email: DataTypes.STRING
  //   });
  
  //   User.associate = function(models) {
  //     models.User.hasMany(models.Post);
  //   };
  
  //   return User;
  // };