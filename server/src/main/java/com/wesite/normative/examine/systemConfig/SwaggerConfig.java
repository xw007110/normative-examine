package com.wesite.normative.examine.systemConfig;

import com.wesite.normative.examine.entity.system.SysUser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * swagger配置类
 *
 * @author XuanMing
 * @create 2018/3/13 17:23
 **/
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.wesite.normative.examine.controller"))
                .paths(PathSelectors.any())
                .build()
                .ignoredParameterTypes(SysUser.class);
    }
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("代码规范考核系统的接口API文档")
                .description("")
                .termsOfServiceUrl("")
                .version("1.0")
                .build();
    }
}
