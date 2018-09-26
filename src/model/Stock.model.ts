import {Model, Column, Table,  PrimaryKey,AutoIncrement, ForeignKey} from "sequelize-typescript";

@Table
export class Stock extends Model<Stock> {

    @PrimaryKey
    @Column
    name: string;
    
    @Column
    value: number;
    
    @Column
    lastValue: number;

    @Column
    openValue: number;
  
  }

  export default Stock;