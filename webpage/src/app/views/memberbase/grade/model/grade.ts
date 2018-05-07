import { Profit } from '../../profit/model/profit';

export class Grade {
  id:string;
  name:string;
  profits;
  score:string;
  lockup:boolean;
  operatorId:string;
  remark:string;
  createTime: string;
  updateTime: string;

  constructor() {
   this.profits = new Profit()
  }

}
