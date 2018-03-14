package com.wesite.normative.examine.controller.system;

import com.wesite.normative.examine.controller.BaseController;
import com.wesite.normative.examine.entity.BaseResult;
import com.wesite.normative.examine.utils.RandomValidateCodeUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 登录Controller
 *
 * @author XuanMing
 * @create 2018/3/13 17:17
 **/
@RestController
public class LoginController extends BaseController {


    @ApiOperation(value = "登录接口", notes = "登录接口,登录成功返回用户基本信息")
    @RequestMapping(value = "/login/{account}", method = RequestMethod.GET)
    @ResponseBody
    public BaseResult doLogin(@ApiParam(name = "account", value = "用户账号", required = true) @PathVariable String account,
                              @ApiParam(name = "pwd", value = "用户密码(MD5)", required = true) @RequestParam String pwd) {

        return null;
    }

    @ApiOperation(value = "获取验证码", notes = "获取验证码")
    @RequestMapping(value = "/getVerify", method = RequestMethod.GET)
    public void getVerify(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            //设置相应类型,告诉浏览器输出的内容为图片
            response.setContentType("image/jpeg");
            //设置响应头信息，告诉浏览器不要缓存此内容
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            RandomValidateCodeUtil randomValidateCode = new RandomValidateCodeUtil();
            //输出验证码图片方法
            randomValidateCode.getRandcode(request, response);
        } catch (Exception e) {
            logger.error("获取验证码失败>>>>   ", e);
        }
    }
}
