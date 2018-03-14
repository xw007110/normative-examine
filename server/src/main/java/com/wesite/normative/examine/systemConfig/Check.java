package com.wesite.normative.examine.systemConfig;

/**
 * 校验参数check注解
 *
 * @author XuanMing
 * @create 2018/3/14 15:24
 **/

import java.lang.annotation.*;

@Target({ ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Check {
    /**
     * 是否非空
     */
    public boolean notNull() default false;

    /**
     * 是否为数值
     */
    public boolean numeric() default false;

    /**
     * 最大长度
     */
    public int maxLen() default -1;

    /**
     * 最小长度
     */
    public int minLen() default -1;

    /**
     * 最小数值
     */
    public long minNum() default -999999;
}
