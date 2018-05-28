package com.wesite.normative.examine.utils;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;

import java.util.Properties;

/**
 * Kaptcha验证码配置
 *
 * @author XuanMing
 * @create 2018/5/3 14:52
 **/
public class KaptchaUtil {

    private DefaultKaptcha defaultKaptcha;

    private static KaptchaUtil kaptchaUtil;

    private KaptchaUtil() {
        Properties properties = new Properties();
        properties.put("kaptcha.border", "no");
        properties.put("kaptcha.textproducer.font.color", "black");
        properties.put("kaptcha.textproducer.char.space", "10");
        properties.put("kaptcha.textproducer.char.length", "4");
        properties.put("kaptcha.image.height", "34");
        properties.put("kaptcha.textproducer.font.size", "25");

        properties.put("kaptcha.noise.impl", "com.google.code.kaptcha.impl.NoNoise");
        Config config = new Config(properties);
        DefaultKaptcha defaultKaptcha = new DefaultKaptcha();
        defaultKaptcha.setConfig(config);
        this.defaultKaptcha = defaultKaptcha;
    }

    public static KaptchaUtil getInstence() {
        if (kaptchaUtil == null) {
            kaptchaUtil = new KaptchaUtil();
        }
        return kaptchaUtil;
    }

    public DefaultKaptcha getDefaultKaptcha() {
        return defaultKaptcha;
    }


}
