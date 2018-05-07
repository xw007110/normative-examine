export class ABS {
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

  /* 场所 */
  place: string;
  placeDesc: string;

  /* 是否结构化 */
  structurization: string;

  /* 资金来源（是否匹配，是自行提供；否，紫金提供） */
  capitalSource: string;

  /* 缴款日 */
  paymentTime: string;

  /* 底层资产类别 */
  underlyingAssetsType: string;
  underlyingAssetsTypeDesc: string;

  /* 附件 */
  enclosure: string;

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
