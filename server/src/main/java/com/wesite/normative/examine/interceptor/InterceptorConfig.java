package com.wesite.normative.examine.interceptor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * 拦截器
 *
 * @author XuanMing
 * @create 2018/2/28 9:39
 **/
@Configuration
public class InterceptorConfig extends WebMvcConfigurerAdapter {

    @Bean
    public InterceptorController interceptor() {
        return new InterceptorController();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //添加拦截器
        registry.addInterceptor(interceptor()).addPathPatterns("/**").excludePathPatterns("/login/**");
    }

}
