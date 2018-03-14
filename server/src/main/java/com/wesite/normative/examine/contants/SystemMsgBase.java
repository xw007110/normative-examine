package com.wesite.normative.examine.contants;

/**
 * 系统消息公共类
 * @author XuanMing
 * @create 2018/3/13 17:09
 **/
public interface SystemMsgBase {
    int SUCCESS_COMMON_CODE = 0;
    String SUCCESS_COMMON_MSG = "调用成功";

    int PARAMS_CHECK_FAILED_CODE = 300;
    String PARAMS_CHECK_FAILED_MSG = "参数校验不通过";

    int LACK_PARAMS_CODE = 301;
    String LACK_PARAMS_MSG = "缺少参数";

    int SYSTEM_ERROR_CODE = 999;
    String SYSTEM_ERROR_MSG = "系统出错了,请稍后再试";

}
