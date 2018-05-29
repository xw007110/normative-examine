package com.wesite.normative.examine.service.system;

import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.request.system.UserAddRequest;
import com.wesite.normative.examine.request.system.UserQueryRequest;

import java.util.List;

/**
 * 系统用户service
 *
 * @author XuanMing
 * @create 2018/3/15 10:40
 **/
public interface SysUserService {

    /**
     * 根据用户账号查询用户
     * @param account account
     * @return 用户信息
     */
    List<SysUser> getSysUserByAccount(String account);

    /**
     * 登录成功后处理用户信息 包括记录用户的登录时间 登录次数等
     *
     * @param sysUser sysUser
     * @return 用户信息
     */
    SysUser disposeUserInfo(SysUser sysUser);

    /**
     * 查询用户列表
     * @param request 查询条件
     * @return 用户列表
     */
    List<SysUser> listUser(UserQueryRequest request);

    /**
     * 新增用户
     * @param userAddRequest 新增用户信息
     * @param loginUserInfo 登录用户信息
     * @return 成功状态
     */
    Integer saveUser(UserAddRequest userAddRequest, SysUser loginUserInfo);
}
