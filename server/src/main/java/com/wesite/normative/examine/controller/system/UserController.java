package com.wesite.normative.examine.controller.system;

import com.wesite.normative.examine.controller.BaseController;
import com.wesite.normative.examine.entity.BaseResult;
import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.request.login.UserQueryRequest;
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
public class UserController {
}
