export class OnlineFunds {
  id: string;

  /* 产品名称 */
  name: string;

  /* 金额 */
  amount: string;
  /* 金额类型 */
  amountUnit: string;

  /* 金额类型描述 */
  amountUnitDesc: string;

  /* 期限值类型 */
  dateValueType: string;

  /* 期限值类型描述 */
  dateValueTypeDesc: string;

  /* 期限单位 */
  dateUnit: string;

  /* 期限单位描述 */
  dateUnitDesc: string;

  /* 期限起 */
  dateStart: string;

  /* 期限止 */
  dateEnd: string;

  /* 模式 */
  patterns: string;
  patternsDesc: Map<string,string>;

  /* 信用等级 */
  creditrating: string;

  /* 信用等级描述 */
  creditratingDesc: string;

  /* 利率单位 */
  interestrateUnit: string;

  /* 利率单位描述 */
  interestrateUnitDesc: string;

  /* 利率 */
  interestrate: string;

  /* 对手 */
  rivals: string;
  rivalsDesc: Map<string,string>;
  
  /* 产品状态 */
  state: string;

  /* 产品状态描述 */
  stateDesc: string;

  /* 备注 */
  remark: string;

  /* 创建人 */
  memberId: string;

  /* 创建人所属机构 */
  orgName: string;

  createTime: string;

  updateTime: string;



}







