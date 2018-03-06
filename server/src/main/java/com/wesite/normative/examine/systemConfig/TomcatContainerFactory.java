package com.wesite.normative.examine.systemConfig;

import org.apache.catalina.connector.Connector;
import org.apache.coyote.http11.Http11NioProtocol;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.EmbeddedServletContainer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.servlet.ServletContextInitializer;
import org.springframework.stereotype.Component;

/**
 * tomcat连接优化
 *
 * @author XuanMing
 * @create 2018/3/6 9:35
 **/
@Component
public class TomcatContainerFactory extends TomcatEmbeddedServletContainerFactory{

    @Value("${tomcat.port}")
    private int tomcatPort;

    @Override
    public EmbeddedServletContainer getEmbeddedServletContainer(ServletContextInitializer... initializers)
    {
        //设置端口
        this.setPort(tomcatPort);
        return super.getEmbeddedServletContainer(initializers);
    }

    @Override
    protected void customizeConnector(Connector connector)
    {
        super.customizeConnector(connector);
        Http11NioProtocol protocol = (Http11NioProtocol)connector.getProtocolHandler();
        //设置最大连接数
        protocol.setMaxConnections(2000);
        //设置最大线程数
        protocol.setMaxThreads(2000);
        protocol.setConnectionTimeout(30000);
    }
}
