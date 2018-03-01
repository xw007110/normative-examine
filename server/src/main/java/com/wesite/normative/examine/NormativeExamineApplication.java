package com.wesite.normative.examine;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
* spring boot 启动类
* @author XuanMing
* @create 2018/2/27 17:57
**/
@SpringBootApplication
@MapperScan("com.wesite.normative.examine.dao")
@EnableCaching
public class NormativeExamineApplication {

    //ceshi
    public static void main(String[] args) {
        SpringApplication.run(NormativeExamineApplication.class, args);
    }
}
