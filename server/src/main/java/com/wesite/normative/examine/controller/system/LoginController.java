package com.wesite.normative.examine.controller.system;

import com.wesite.normative.examine.entity.system.SysUser;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 登录Controller
 *
 * @author XuanMing
 * @create 2018/3/13 17:17
 **/
@Controller
@RequestMapping("/login")
public class LoginController {


    @ApiOperation(value="登录接口", notes="登录接口")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "account", value = "登录账号", required = true, dataType = "String"),
            @ApiImplicitParam(name = "passWord", value = "登录密码", required = true, dataType = "String")
    })
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public SysUser hello(@RequestParam(value = "account", required = true) String account,
                         @RequestParam(value = "passWord", required = true) String passWord) {
        return null;
    }
}
