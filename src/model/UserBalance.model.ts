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
export class UserBalance extends Model<UserBalance> {

    @PrimaryKey
    @Column
    id: number;
  
    @Column
    value: number;

  }

  export default UserBalance;