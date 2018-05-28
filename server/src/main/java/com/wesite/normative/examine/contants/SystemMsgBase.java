package com.wesite.normative.examine.contants;

/**
 * 系统消息公共类
 * @author XuanMing
 * @create 2018/3/13 17:09
 **/
public interface SystemMsgBase {
    /**
     * 0-300 系统使用
     */
    int SUCCESS_COMMON_CODE = 0;
    String SUCCESS_COMMON_MSG = "调用成功";

    int PARAMS_CHECK_FAILED_CODE = 1;
    String PARAMS_CHECK_FAILED_MSG = "参数校验不通过";

    int LACK_PARAMS_CODE = 2;
    String LACK_PARAMS_MSG = "缺少参数";

    int SYSTEM_ERROR_CODE = 99;
    String SYSTEM_ERROR_MSG = "系统出错了,请稍后再试";

    /**
     * 300-400 登录业务逻辑使用
     */
    int VERIFY_CODE_NOT_CORRECT_CODE = 300;
    String VERIFY_CODE_NOT_CORRECT_MSG = "验证码不正确";

    int USER_NOT_EXIST_CODE = 301;
    String USER_NOT_EXIST_MSG = "用户不存在";

    int USER_PWD_INCORRECTNESS_CODE = 302;
    String USER_PWD_INCORRECTNESS_MSG = "用户密码不正确";

}
