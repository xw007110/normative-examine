export class InterestDebt {
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

  /* 期限 */
  dateStart: string;
  /* 期限单位 */
  dateUnit: string;
  /* 期限单位描述 */
  dateUnitDesc: string;

  /* 券种 */
  quanzhong: string;
  /* 券种描述 */
  quanzhongDesc: string;
  /* 票面利率 */
  couponRateStart: string;
  couponRateEnd: string;
  
  /* 手续费 */
  commission: string;

  /* 招标时间 */
  biddingTime: string;

  /* 停止投标 */
  stopBidding: string;

  /* 停止投标描述 */
  stopBiddingDesc: string;

  /* 上市市场 */
  market: string;
  /* 上市市场描述 */
  marketDesc: string;

  /* 招标方式 */
  biddingMethod: string;
  /* 招标方式描述 */
  biddingMethodDesc: string;

  /* 缴款日 */
  paymentDate: string;
  /* 上市日 */
  listingDate: string;
  /* 起息日 */
  valueDay: string;

  /* 预测区间起 */
  forecastStart: string;
  /* 预测区间止 */
  forecastEnd: string;

  /* 建议 */
  advise: string;
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



