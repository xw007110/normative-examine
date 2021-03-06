package com.wesite.normative.examine.service.system.impl;

import com.wesite.normative.examine.dao.system.SysUserMapper;
import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.entity.system.SysUserExample;
import com.wesite.normative.examine.request.system.UserAddRequest;
import com.wesite.normative.examine.request.system.UserDeleteRequest;
import com.wesite.normative.examine.request.system.UserQueryRequest;
import com.wesite.normative.examine.request.system.UserUpdateRequest;
import com.wesite.normative.examine.service.system.SysUserService;
import com.wesite.normative.examine.utils.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.Timestamp;
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
        Timestamp nowTime = new Timestamp(System.currentTimeMillis());
        Timestamp loginTime = null;
        if (sysUser.getLoginTime() == null) {
            loginTime = nowTime;
        }else{
            loginTime = new Timestamp(sysUser.getLoginTime().getTime());
        }

        // 记录上次登录时间，上次的登录时间为上一次的登录时间
        sysUser.setLastLoginTime(loginTime);
        sysUser.setLoginTime(nowTime);
        sysUser.setLoginCount(sysUser.getLoginCount() + 1);
        sysUserMapper.updateByPrimaryKey(sysUser);

        return sysUser;
    }

    @Override
    public List<SysUser> listUser(UserQueryRequest request) {
        SysUserExample example = new SysUserExample();
        example.setLimit(request.getPageSize());
        example.setOffset(request.getPage());
        if (!StringUtils.isEmpty(request.getUserName())) {
            example.createCriteria().andUserNameLike(request.getUserName());
        }
        if (!StringUtils.isEmpty(request.getUserName())) {
            example.createCriteria().andMobileLike(request.getUserName());
        }
        return sysUserMapper.selectByExample(example);
    }

    @Override
    public Integer saveUser(UserAddRequest userAddRequest , SysUser loginUserInfo) {
        SysUser sysUser = new SysUser();
        sysUser.setGuid(CommonUtils.get32UUID());
        sysUser.setUserName(userAddRequest.getUserName());
        sysUser.setLoginAccount(userAddRequest.getLoginAccount());
        sysUser.setUserPassword(userAddRequest.getUserPassword());
        sysUser.setSex(userAddRequest.getSex());
        sysUser.setBirthday(userAddRequest.getBirthday());
        sysUser.setMobile(userAddRequest.getMobile());
        sysUser.setEmail(userAddRequest.getEmail());
        sysUser.setRoleGuid(userAddRequest.getRoleGuid());
        sysUser.setCreateBy(loginUserInfo == null ? "" : loginUserInfo.getUserName());
        sysUser.setCreateTime(new Date());
        sysUser.setLoginCount(0L);
        sysUser.setUpdateBy(loginUserInfo == null ? "" : loginUserInfo.getUserName());
        return sysUserMapper.insertSelective(sysUser);
    }

    @Override
    public Integer deleteUser(UserDeleteRequest request) {
        return sysUserMapper.deleteByPrimaryKey(request.getGuid());
    }

    @Override
    public Integer updateUser(UserUpdateRequest userUpdateRequest, SysUser loginUserInfo) {
        SysUser sysUser = new SysUser();
        sysUser.setGuid(userUpdateRequest.getGuid());
        sysUser.setUserName(userUpdateRequest.getUserName());
        sysUser.setLoginAccount(userUpdateRequest.getLoginAccount());
        sysUser.setUserPassword(userUpdateRequest.getUserPassword());
        sysUser.setSex(userUpdateRequest.getSex());
        sysUser.setBirthday(userUpdateRequest.getBirthday());
        sysUser.setMobile(userUpdateRequest.getMobile());
        sysUser.setEmail(userUpdateRequest.getEmail());
        sysUser.setRoleGuid(userUpdateRequest.getRoleGuid());
        sysUser.setLoginCount(0L);
        sysUser.setUpdateBy(loginUserInfo == null ? "" : loginUserInfo.getUserName());
        return sysUserMapper.updateByPrimaryKey(sysUser);
    }

    @Override
    public int countListUser(UserQueryRequest request) {
        SysUserExample example = new SysUserExample();
        example.setLimit(request.getPageSize());
        example.setOffset(request.getPage());
        if (!StringUtils.isEmpty(request.getUserName())) {
            example.createCriteria().andUserNameLike(request.getUserName());
        }
        if (!StringUtils.isEmpty(request.getUserName())) {
            example.createCriteria().andMobileLike(request.getUserName());
        }
        return sysUserMapper.countByExample(example);
    }
}
