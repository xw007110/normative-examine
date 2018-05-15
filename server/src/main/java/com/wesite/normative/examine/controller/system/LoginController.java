package com.wesite.normative.examine.controller.system;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.wesite.normative.examine.contants.SystemContants;
import com.wesite.normative.examine.contants.SystemMsgBase;
import com.wesite.normative.examine.controller.BaseController;
import com.wesite.normative.examine.entity.BaseResult;
import com.wesite.normative.examine.entity.login.LoginEntity;
import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.service.system.SysUserService;
import com.wesite.normative.examine.systemConfig.valid.Valid;
import com.wesite.normative.examine.utils.CommonUtils;
import com.wesite.normative.examine.utils.KaptchaUtil;
import com.wesite.normative.examine.utils.RandomValidateCodeUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 登录Controller
 *
 * @author XuanMing
 * @create 2018/3/13 17:17
 **/
@Controller
@RequestMapping("/login")
public class LoginController extends BaseController {

    @Autowired
    private SysUserService sysUserService;

    @ApiOperation(value = "登录接口", notes = "登录接口,登录成功返回用户基本信息")
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    @ResponseBody
    public BaseResult doLogin(@Valid @RequestBody LoginEntity loginEntity, HttpServletRequest request) {
        // 校验验证码是否正确
        String sessionVerifyCode = (String) request.getSession().getAttribute(SystemContants.SESSION_VERIFY_CODE_KEY);
        if (StringUtils.isEmpty(loginEntity.getVerifyCode()) || !loginEntity.getVerifyCode().equals(sessionVerifyCode)) {
            return BaseResult.fail(SystemMsgBase.VERIFY_CODE_NOT_CORRECT_CODE, SystemMsgBase.VERIFY_CODE_NOT_CORRECT_MSG);
        }

        // 根据用户账号查询用户信息
        List<SysUser> sysUserList = sysUserService.getSysUserByAccount(loginEntity.getAccount());
        if (CommonUtils.listEmpty(sysUserList)) {
            // 用户不存在
            return BaseResult.fail(SystemMsgBase.USER_NOT_EXIST_CODE, SystemMsgBase.USER_NOT_EXIST_MSG);
        }

        // 校验密码
        SysUser sysUser = sysUserList.get(0);
        if (!loginEntity.getPassWord().equals(sysUser.getUserPassword())) {
            return BaseResult.fail(SystemMsgBase.USER_PWD_INCORRECTNESS_CODE, SystemMsgBase.USER_PWD_INCORRECTNESS_MSG);
        }

        // 登录成功后处理用户信息 包括记录用户的登录时间 登录次数等
        SysUser newUserInfo = sysUserService.disposeUserInfo(sysUser);

        return BaseResult.ok(newUserInfo);
    }

    @ApiOperation(value = "获取验证码", notes = "获取验证码")
    @RequestMapping(value = "/getVerify", method = RequestMethod.GET)
    @ResponseBody
    public BaseResult getVerify(HttpServletRequest request) throws IOException {
        Map<String, Object> result = CommonUtils.getHashMap(0);
        ByteArrayOutputStream outputStream = null;
        try {
            DefaultKaptcha kaptcha = KaptchaUtil.getInstence().getDefaultKaptcha();
            // 生成文字验证码
            String text = kaptcha.createText();
            // 生成图片验证码
            outputStream = new ByteArrayOutputStream();
            BufferedImage image = kaptcha.createImage(text);
            ImageIO.write(image, "jpg", outputStream);
            BASE64Encoder encoder = new BASE64Encoder();
            result.put("img", encoder.encode(outputStream.toByteArray()));
            request.getSession().setAttribute(SystemContants.SESSION_VERIFY_CODE_KEY, text);

            return BaseResult.ok(result);
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
        }

    }
}