package com.wesite.normative.examine.request.user;

import com.wesite.normative.examine.entity.BasePage;
import com.wesite.normative.examine.systemConfig.valid.Check;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * 用户查询request
 *
 * @author XuanMing
 * @create 2018/5/28 14:13
 **/
public class UserQueryRequest extends BasePage{

    /**
     * 用户姓名
     */
    @ApiModelProperty(value = "用户姓名", name = "userName")
    private String userName;

    /**
     * 用户手机号
     */
    @ApiModelProperty(value = "用户手机号", name = "mobile")
    @Check(maxLen = 11, name = "用户手机号")
    private String mobile;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}
