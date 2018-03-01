package com.wesite.normative.examine.controller.system;

import com.wesite.normative.examine.entity.system.SysUser;
import com.wesite.normative.examine.service.system.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 测试类
 *
 * @author XuanMing
 * @create 2018/2/27 18:24
 **/
@RestController
@RequestMapping("/system")
public class DemoController {

    @Autowired
    private DemoService demoService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public SysUser hello(@RequestParam(value = "id", required = true) String id) {
        return demoService.getSysUserById(id);
    }

}
