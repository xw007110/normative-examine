package com.wesite.normative.examine.controller.system;

import com.wesite.normative.examine.controller.BaseController;
import com.wesite.normative.examine.entity.BaseResult;
import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.request.system.UserQueryRequest;
import com.wesite.normative.examine.service.system.SysUserService;
import com.wesite.normative.examine.systemConfig.valid.Valid;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 用户Controller
 *
 * @author XuanMing
 * @create 2018/5/16 17:00
 **/
@Controller
@RequestMapping("/user")
public class UserController extends BaseController {

    @Autowired
    private SysUserService sysUserService;

    @ApiOperation(value = "用户列表接口", notes = "用户列表接口,返回用户信息列表")
    @GetMapping("/listUser")
    @ResponseBody
    public BaseResult listUser(@Valid @ModelAttribute UserQueryRequest request) {
        List<SysUser> userList = sysUserService.listUser(request);
        return BaseResult.ok(userList);
    }

}
