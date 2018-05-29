package com.wesite.normative.examine.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 工具类
 *
 * @author XuanMing
 * @create 2018/3/14 14:18
 **/
public class CommonUtils {

    /**
     * 获取一个MAP
     * ：initialCapacity = (需要存储的元素个数 / 负载因子) + 1。
     * 注意 负载因子（即loader factor）默认为 0.75，如果 暂时无法 确定 初始值大小，请设置为 16（即默认值）。
     *
     * @param initialCapacity 初始容量
     * @return map
     */
    public static Map<String, Object> getHashMap(int initialCapacity) {
        if (initialCapacity == 0) {
            initialCapacity = 16;
        }
        return new HashMap<String, Object>(initialCapacity, 0.75f);
    }

    /**
     * 判断list 是否为空
     *
     * @param list list
     * @return true 为空 false 不为空
     */
    public static boolean listEmpty(List list) {
        if (list == null || list.size() == 0) {
            return true;
        }
        return false;
    }

    /**
     * 获取32位的UUID
     *
     * @return
     */
    public static String get32UUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * 获取36位的UUID
     *
     * @return
     */
    public static String get36UUID() {
        return UUID.randomUUID().toString();
    }

    /**
     * 验证手机号是否合法
     *
     * @param mobile 手机号码
     * @return
     */
    public static boolean checkMobile(String mobile) {
        if (mobile.length() != 11) {
            return false;
        } else {
            /**
             * 移动号段正则表达式
             */
            String pat1 = "^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))\\d{8}|(1705)\\d{7}$";
            /**
             * 联通号段正则表达式
             */
            String pat2 = "^((13[0-2])|(145)|(15[5-6])|(176)|(18[5,6]))\\d{8}|(1709)\\d{7}$";
            /**
             * 电信号段正则表达式
             */
            String pat3 = "^((133)|(153)|(177)|(18[0,1,9])|(149)|(199))\\d{8}$";
            /**
             * 虚拟运营商正则表达式
             */
            String pat4 = "^((170))\\d{8}|(1718)|(1719)\\d{7}$";

            Pattern pattern1 = Pattern.compile(pat1);
            Matcher match1 = pattern1.matcher(mobile);
            boolean isMatch1 = match1.matches();
            if (isMatch1) {
                return true;
            }
            Pattern pattern2 = Pattern.compile(pat2);
            Matcher match2 = pattern2.matcher(mobile);
            boolean isMatch2 = match2.matches();
            if (isMatch2) {
                return true;
            }
            Pattern pattern3 = Pattern.compile(pat3);
            Matcher match3 = pattern3.matcher(mobile);
            boolean isMatch3 = match3.matches();
            if (isMatch3) {
                return true;
            }
            Pattern pattern4 = Pattern.compile(pat4);
            Matcher match4 = pattern4.matcher(mobile);
            boolean isMatch4 = match4.matches();
            if (isMatch4) {
                return true;
            }
            return false;
        }
    }

    /**
     * 验证邮箱
     *
     * @param email 邮箱
     * @return
     */
    public static boolean checkEmail(String email) {
        // 验证邮箱的正则表达式
        String format = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$";
        if (email.matches(format)) {
            return true;
        } else {
            return false;
        }
    }


}
