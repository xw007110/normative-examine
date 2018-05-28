package com.wesite.normative.examine.entity;

import io.swagger.annotations.ApiModelProperty;

/**
 * 分页父类
 *
 * @author XuanMing
 * @create 2018/3/13 17:14
 **/
public class BasePage {

    /**
     * page
     */
    @ApiModelProperty(value = "起始页", name = "page")
    private int page;

    /**
     * pageSize
     */
    @ApiModelProperty(value = "每页条数", name = "pageSize")
    private int pageSize;


    public int getPage() {
        return (page - 1) * pageSize;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
}
