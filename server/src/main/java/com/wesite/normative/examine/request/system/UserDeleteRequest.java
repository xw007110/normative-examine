package com.wesite.normative.examine.request.system;

import com.wesite.normative.examine.systemConfig.valid.Check;
import io.swagger.annotations.ApiModelProperty;

/**
 * 用户删除request
 *
 * @author XuanMing
 * @create 2018/5/30 10:00
 **/
public class UserDeleteRequest {
    /**
     * 用户ID
     */
    @ApiModelProperty(value = "用户ID", name = "guid")
    @Check(notNull = true, name = "用户ID")
    private String guid;

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }
}
