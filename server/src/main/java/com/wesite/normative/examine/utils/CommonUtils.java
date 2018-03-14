package com.wesite.normative.examine.utils;

import com.wesite.normative.examine.contants.SystemMsgBase;

import java.util.HashMap;
import java.util.Map;

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
}
