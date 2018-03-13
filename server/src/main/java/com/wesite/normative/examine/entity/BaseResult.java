package com.wesite.normative.examine.entity;

import com.wesite.normative.examine.contants.SystemMsgBase;

/**
 * 返回实体类父类
 *
 * @author XuanMing
 * @create 2018/3/13 17:03
 **/
public class BaseResult {

    /**
     * success
     */
    private boolean success;

    /**
     * code
     */
    private int code;

    /**
     * message
     */
    private String message;

    /**
     * data
     */
    private Object data;

    public BaseResult(boolean success, int code, String message, Object data) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static BaseResult ok(Object data){
        return new BaseResult(true , SystemMsgBase.SUCCESS_COMMON_CODE , SystemMsgBase.SUCCESS_COMMON_MSG , data);
    }


    public int getCode() {
        return code;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
