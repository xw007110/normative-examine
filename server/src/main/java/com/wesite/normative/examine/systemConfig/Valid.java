package com.wesite.normative.examine.systemConfig;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 校验参数valid注解
 *
 * @author XuanMing
 * @create 2018/3/14 15:23
 **/
@Target({ElementType.METHOD,ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface Valid {
}
