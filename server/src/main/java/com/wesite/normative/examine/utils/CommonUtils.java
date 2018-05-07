package com.wesite.normative.examine.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
     * @param list list
     * @return true 为空 false 不为空
     */
    public static boolean listEmpty(List list){
        if(list == null || list.size() == 0){
            return true;
        }
        return false;
    }

    /**
     * 获取32位的UUID
     * @return
     */
    public static String get32UUID(){
        return UUID.randomUUID().toString().replace("-" , "");
    }

    /**
     * 获取36位的UUID
     * @return
     */
    public static String get36UUID(){
        return UUID.randomUUID().toString();
    }


}
