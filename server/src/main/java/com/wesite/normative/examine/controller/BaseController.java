package com.wesite.normative.examine.controller;

import com.wesite.normative.examine.utils.CommonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;
import java.util.Map;

/**
 * 父类Controller
 *
 * @author XuanMing
 * @create 2018/3/14 10:47
 **/
@ApiIgnore
public class BaseController {
    public Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 统一处理参数校验的数据信息,整合错误信息返回给前端
     *
     * @param result 返回的错误信息
     * @return 处理过的返回信息
     */
    public Map<String, Object> disposeErrorMsg(BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> fieldErrors = result.getFieldErrors();
            Map<String, Object> errorMsg = CommonUtils.getHashMap(result.getErrorCount());
            fieldErrors.forEach(fieldError -> {
                errorMsg.put(fieldError.getField(), fieldError.getDefaultMessage());
            });
            return errorMsg;
        } else {
            return null;
        }

    }
}
