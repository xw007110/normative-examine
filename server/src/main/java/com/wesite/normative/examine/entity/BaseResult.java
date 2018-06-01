package com.wesite.normative.examine.entity;

import com.wesite.normative.examine.contants.SystemMsgBase;
import io.swagger.annotations.ApiModelProperty;

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
    @ApiModelProperty(value = "返回状态;true或false", name = "success")
    private boolean success;

    /**
     * code
     */
    @ApiModelProperty(value = "返回状态码;0为成功，其他均为失败", name = "code")
    private int code;

    /**
     * message
     */
    @ApiModelProperty(value = "返回信息", name = "message")
    private String message;

    /**
     * data
     */
    @ApiModelProperty(value = "返回数据;object对象", name = "message")
    private Object data;

    /**
     * 数据总数
     */
    @ApiModelProperty(value = "数据总数;整形", name = "count")
    private int count;

    private BaseResult(boolean success, int code, String message, Object data, int count) {
        this.success = success;
        this.code = code;
        this.message = message;
        this.data = data;
        this.count = count;
    }

    public static BaseResult ok(Object data, int count) {
        return new BaseResult(true, SystemMsgBase.SUCCESS_COMMON_CODE, SystemMsgBase.SUCCESS_COMMON_MSG, data, count);
    }

    public static BaseResult ok(Object data) {
        return new BaseResult(true, SystemMsgBase.SUCCESS_COMMON_CODE, SystemMsgBase.SUCCESS_COMMON_MSG, data, 0);
    }

    public static BaseResult ok() {
        return new BaseResult(true, SystemMsgBase.SUCCESS_COMMON_CODE, SystemMsgBase.SUCCESS_COMMON_MSG, null, 0);
    }

    public static BaseResult fail(int code, String msg, Object data) {
        return new BaseResult(false, code, msg, data, 0);
    }

    public static BaseResult fail(int code, String msg) {
        return new BaseResult(false, code, msg, null, 0);
    }

    public static BaseResult systemError() {
        return new BaseResult(false, SystemMsgBase.SYSTEM_ERROR_CODE, SystemMsgBase.SYSTEM_ERROR_MSG, null, 0);
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

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
