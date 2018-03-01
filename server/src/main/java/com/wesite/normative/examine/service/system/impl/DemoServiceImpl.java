package com.wesite.normative.examine.service.system.impl;

import com.wesite.normative.examine.dao.system.SysUserMapper;
import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.service.system.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 测试service实现类
 *
 * @author XuanMing
 * @create 2018/2/28 15:34
 **/
@Service
public class DemoServiceImpl implements DemoService {

    @Autowired
    private SysUserMapper sysUserMapper;

    @Override
    public SysUser getSysUserById(String id) {
        return sysUserMapper.selectByPrimaryKey(id);
    }
}
