export class DepositReceipt {
  id: string;
  /* 产品名称 */
  name: string;

  /* 金额 */
  amount: string;
  /* 金额类型 */
  amountUnit: string;
  /* 金额类型描述 */
  amountUnitDesc: string;

  /* 市场 */
  market: string;
  /* 市场描述 */
  marketDesc: string;

  /* 发行方式 */
  distribution: string;
  /* 发行方式描述 */
  distributionDesc: string;

  /* 票息类型 */
  coupon: string;
  /* 票息类型描述 */
  couponDesc: string;

  /* 主体评级 */
  creditrating: string;
  /* 主体评级描述 */
  creditratingDesc: string;


  /* 期限起 */
  dateStart: string;
  /* 期限单位 */
  dateUnit: string;
  /* 期限单位描述 */
  dateUnitDesc: string;

  /* 收益率值类型 */
  interestrateValueType: string;
  /* 收益率值类型描述 */
  interestrateValueTypeDesc: string;
  /* 收益率起 */
  interestrateStart: string;
  /* 收益率止 */
  interestrateEnd: string;

  /* 发行日 */
  releaseDate: string;

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



