package com.wesite.normative.examine.request.system;

import com.wesite.normative.examine.systemConfig.valid.Check;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

/**
 * 用户修改request
 *
 * @author XuanMing
 * @create 2018/5/29 9:43
 **/
public class UserUpdateRequest {

    /**
     * 用户ID
     */
    @ApiModelProperty(value = "用户ID", name = "guid")
    @Check(notNull = true, name = "用户ID")
    private String guid;

    /**
     * 用户姓名
     */
    @ApiModelProperty(value="用户姓名",name="userName")
    @Check(notNull = true , maxLen = 15 , minLen = 2 , name = "用户姓名")
    private String userName;

    /**
     * 登录账号
     */
    @ApiModelProperty(value="登录账号",name="loginAccount")
    @Check(notNull = true , maxLen = 20 , minLen = 6 , name = "登录账号")
    private String loginAccount;

    /**
     * 登录密码
     */
    @ApiModelProperty(value="登录密码",name="userPassword(MD5加密)")
    @Check(notNull = true , name = "登录密码")
    private String userPassword;

    /**
     * 0:男 1:女
     */
    @ApiModelProperty(value="性别",name="sex")
    @Check(maxLen = 1 , name = "性别")
    private String sex;

    /**
     * 生日
     */
    @ApiModelProperty(value="生日",name="birthday")
    private Date birthday;

    /**
     * 手机号码
     */
    @ApiModelProperty(value = "手机号码", name = "mobile")
    @Check(isMobile = true , name = "手机号码")
    protected String mobile;

    /**
     * 邮箱
     */
    @ApiModelProperty(value = "邮箱", name = "email")
    @Check(isEmail = true , name = "邮箱")
    private String email;

    /**
     * 角色ID
     */
    @ApiModelProperty(value = "角色ID", name = "roleGuid")
    @Check(notNull = true , name = "角色")
    private String roleGuid;

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getLoginAccount() {
        return loginAccount;
    }

    public void setLoginAccount(String loginAccount) {
        this.loginAccount = loginAccount;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRoleGuid() {
        return roleGuid;
    }

    public void setRoleGuid(String roleGuid) {
        this.roleGuid = roleGuid;
    }
}
