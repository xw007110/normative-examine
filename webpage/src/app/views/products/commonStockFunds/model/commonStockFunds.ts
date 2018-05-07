export class CommonStockFunds {
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

  /* 收益率值类型 */
  earningsValueType: string;
  /* 收益率值类型描述 */
  earningsValueTypeDesc: string;
  /* 收益率起 */
  earningsStart: string;
  /* 收益率止 */
  earningsEnd: string;

  /* 目标资产 */
  targetAssets: string;
  targetAssetsDesc:Map<string,string>;

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
  bondTypeStr:string;
}
