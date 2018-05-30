package com.wesite.normative.examine.controller;

import com.wesite.normative.examine.contants.SystemContants;
import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.utils.CommonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 父类Controller
 *
 * @author XuanMing
 * @create 2018/3/14 10:47
 **/
@ApiIgnore
public class BaseController {
    public Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 得到登录用户信息
     */
    public SysUser getUserInfo() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        SysUser sysUser = (SysUser) request.getSession().getAttribute(SystemContants.SEESION_USER_INFO_KEY);
        return sysUser;
    }

}
