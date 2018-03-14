package com.wesite.normative.examine.exception;

/**
 * 参数校验自定义异常
 *
 * @author XuanMing
 * @create 2018/3/14 15:55
 **/
public class ParameterException extends RuntimeException {

    /**
     * 异常信息
     */
    private String errorMsg;

    public ParameterException(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }
}
