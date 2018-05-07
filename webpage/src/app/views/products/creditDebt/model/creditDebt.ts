export class CreditDebt {
  id: string;
  /* 产品名称 */
  name: string;
  /* 产品代码 */
  code: string;

  /* 金额 */
  amount: string;
  /* 金额类型 */
  amountUnit: string;
  /* 金额类型描述 */
  amountUnitDesc: string;

  /* 预测区间起 */
  forecastStart: string;
  /* 预测区间止 */
  forecastEnd: string;

  /* 期限 */
  dateStart: string;
  /* 期限单位 */
  dateUnit: string;
  /* 期限单位描述 */
  dateUnitDesc: string;

  /* 发行人类型 */
  publisherType: string;
  /* 发行人类型描述 */
  publisherTypeDesc: string;
  /* 发行人 */
  issuer: string;

  /* 券种 */
  quanzhong: string;
  /* 券种描述 */
  quanzhongDesc: string;

  /* 市场 */
  market: string;
  /* 市场描述 */
  marketDesc: string;

  /* 担保 */
  guarantee: boolean;

  /* 主体评级 */
  company: string;
  /* 主体评级 */
  companyDesc: string;
  /* 债项评级 */
  obligation: string;
  /* 债项评级 */
  obligationDesc: string;
  /* 评级公司 */
  ratingFirm: string;
  /* 评级公司 */
  ratingFirmDesc: string;

  /* 发行日 */
  releaseDate: string;
  /* 缴款日 */
  paymentDate: string;
  /* 上市日 */
  listingDate: string;

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



