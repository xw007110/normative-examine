export class Bill {
  id: string;

  /* 产品名称 */
  name: string;

  /* 金额 */
  amount: string;
  /* 金额类型 */
  amountUnit: string;
  /* 金额类型描述 */
  amountUnitDesc: string;

  /* 交易种类 */
  kinds: string;
  /* 交易种类描述 */
  kindsDesc: string;

  /* 票据类型 */
  type: string;
  /* 票据类型描述 */
  typeDesc: string;

  /* 剩余期限单位 */
  deadlineUnit: string;
  /* 剩余期限单位描述 */
  deadlineUnitDesc: string;
  /* 剩余期限 */
  deadline: string;

  /* 利率单位 */
  interestrateUnit: string;
  /* 利率单位描述 */
  interestrateUnitDesc: string;
  /* 利率 */
  interestrate: string;

  /* 承兑行 */
  acceptance: string;
  acceptanceDesc: Map<string,string>;

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



