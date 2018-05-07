package com.wesite.normative.examine.service.system.impl;

import com.wesite.normative.examine.dao.system.SysUserMapper;
import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.entity.system.SysUserExample;
import com.wesite.normative.examine.service.system.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * 系统用户service实现类
 *
 * @author XuanMing
 * @create 2018/3/16 14:42
 **/
@Service
public class SysUserServiceImpl implements SysUserService {

    @Autowired
    private SysUserMapper sysUserMapper;

    @Override
    public List<SysUser> getSysUserByAccount(String account) {
        SysUserExample example = new SysUserExample();
        example.createCriteria().andLoginAccountEqualTo(account);
        return sysUserMapper.selectByExample(example);
    }

    @Override
    public SysUser disposeUserInfo(SysUser sysUser) {
        // 当前时间
        Date nowDate = new Date();
        Date loginTime = sysUser.getLoginTime();
        if (loginTime == null) {
            loginTime = nowDate;
        }

        // 记录上次登录时间，上次的登录时间为上一次的登录时间
        sysUser.setLastLoginTime(loginTime);
        sysUser.setLoginTime(nowDate);
        sysUser.setLoginCount(sysUser.getLoginCount() + 1);
        sysUserMapper.updateByPrimaryKey(sysUser);

        return sysUser;
    }
}
