package com.wesite.normative.examine.utils;


import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.springframework.cache.annotation.CacheConfig;

/**
 * ehcashe工具类
 *
 * @author XuanMing
 * @create 2018/2/28 16:01
 **/
@CacheConfig
public class EhCacheUtils {

    public static final String APPLICATION_CACHE = "appCache";

    private CacheManager cacheManager;

    private Cache<String, String> appCache;

    private static EhCacheUtils ehCacheUtils;

    private EhCacheUtils() {
        cacheManager = CacheManagerBuilder.newCacheManagerBuilder().withCache(APPLICATION_CACHE,
                CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class, String.class,
                        ResourcePoolsBuilder.heap(100)).build()).build(true);
        appCache = cacheManager.getCache(APPLICATION_CACHE, String.class, String.class);
    }

    public static EhCacheUtils getInstence() {
        if (ehCacheUtils == null) {
            ehCacheUtils = new EhCacheUtils();
        }
        return ehCacheUtils;
    }

    public void putAppElement(String key, String value) {
        appCache.put(key, value);
    }

    public String getAppElement(String key) {
        return appCache.get(key);
    }

}
