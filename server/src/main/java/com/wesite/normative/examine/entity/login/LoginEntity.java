package com.wesite.normative.examine.entity.login;

import com.wesite.normative.examine.systemConfig.valid.Check;
import io.swagger.annotations.ApiModelProperty;

/**
 * 登录实体类
 *
 * @author XuanMing
 * @create 2018/5/7 14:40
 **/
public class LoginEntity {

    /**
     * 账号
     */
    @ApiModelProperty(value="用户账号",name="account")
    @Check(notNull = true, name = "用户账号")
    private String account;

    /**
     * 密码
     */
    @ApiModelProperty(value="密码",name="passWord")
    @Check(notNull = true , name = "密码")
    private String passWord;

    /**
     * 验证码
     */
    @ApiModelProperty(value="验证码",name="verifyCode")
    @Check(notNull = true , name = "验证码")
    private String verifyCode;


    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getVerifyCode() {
        return verifyCode;
    }

    public void setVerifyCode(String verifyCode) {
        this.verifyCode = verifyCode;
    }
}
