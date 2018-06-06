
export class Result<T> {

    code:number;// 返回状态码;0为成功，其他均为失败 ,
    data :T; // 返回数据;object对象 ,
    message :string;// 返回信息 ,
    success :boolean; // 返回状态;true或false
    count:number;//分页数量
    constructor() {}
}
