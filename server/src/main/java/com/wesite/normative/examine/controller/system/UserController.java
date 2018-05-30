package com.wesite.normative.examine.controller.system;

import com.alibaba.druid.support.json.JSONUtils;
import com.wesite.normative.examine.controller.BaseController;
import com.wesite.normative.examine.entity.BaseResult;
import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.request.system.UserAddRequest;
import com.wesite.normative.examine.request.system.UserDeleteRequest;
import com.wesite.normative.examine.request.system.UserQueryRequest;
import com.wesite.normative.examine.request.system.UserUpdateRequest;
import com.wesite.normative.examine.service.system.SysUserService;
import com.wesite.normative.examine.systemConfig.valid.Valid;
import com.wesite.normative.examine.utils.CommonUtils;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
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
        logger.info("查询用户列表");
        List<SysUser> userList = sysUserService.listUser(request);
        logger.info("结束查询用户列表,查询结果为{}" , JSONUtils.toJSONString(userList));
        return BaseResult.ok(userList);
    }

    @ApiOperation(value = "新增用户接口", notes = "新增用户接口,新增成功返回成功状态")
    @PostMapping("/saveUser")
    @ResponseBody
    public BaseResult saveUser(@Valid @RequestBody UserAddRequest request){
        logger.info("新增用户");
        Integer result = sysUserService.saveUser(request , this.getUserInfo());
        logger.info("结束新增用户,新增结果为{}" , result);
        return BaseResult.ok(result);
    }

    @ApiOperation(value = "删除用户接口", notes = "删除用户接口,删除成功返回成功状态")
    @PostMapping("/deleteUser")
    @ResponseBody
    public BaseResult deleteUser(@Valid @RequestBody UserDeleteRequest request){
        logger.info("删除用户");
        Integer result = sysUserService.deleteUser(request);
        logger.info("结束删除用户,删除结果为{}" , result);
        return BaseResult.ok(result);
    }


    @ApiOperation(value = "修改用户接口", notes = "修改用户接口,修改成功返回成功状态")
    @PostMapping("/updateUser")
    @ResponseBody
    public BaseResult updateUser(@Valid @RequestBody UserUpdateRequest request){
        logger.info("修改用户");
        Integer result = sysUserService.updateUser(request , this.getUserInfo());
        logger.info("结束修改用户,修改结果为{}" , result);
        return BaseResult.ok(result);
    }

}
