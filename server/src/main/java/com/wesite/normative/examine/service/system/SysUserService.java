package com.wesite.normative.examine.service.system;

import com.wesite.normative.examine.entity.system.SysUser;

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

    SysUser disposeUserInfo(SysUser sysUser);
}
