package com.wesite.normative.examine.entity;

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
    private int page;

    /**
     * pageSize
     */
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
