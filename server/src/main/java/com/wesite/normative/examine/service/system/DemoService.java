package com.wesite.normative.examine.service.system;

import com.wesite.normative.examine.entity.system.SysUser;

/**
 * 测试service
 *
 * @author XuanMing
 * @create 2018/2/28 14:56
 **/
public interface DemoService {

    /**
     * 根据ID查询用户
     * @param id id
     * @return 用户信息
     */
    SysUser getSysUserById(String id);
}
