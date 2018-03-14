package com.wesite.normative.examine.systemConfig;

import com.wesite.normative.examine.contants.SystemMsgBase;
import com.wesite.normative.examine.entity.BaseResult;
import com.wesite.normative.examine.exception.ParameterException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 全局异常处理类
 *
 * @author XuanMing
 * @create 2018/3/14 15:59
 **/
@ControllerAdvice
public class BaseExceptionHandler {

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public BaseResult handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        return BaseResult.fail(SystemMsgBase.LACK_PARAMS_CODE , SystemMsgBase.LACK_PARAMS_MSG , null);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    BaseResult handleException(Exception e) {
        if (e instanceof ParameterException) {
            ParameterException exception = (ParameterException) e;
            return BaseResult.fail(SystemMsgBase.PARAMS_CHECK_FAILED_CODE, exception.getErrorMsg(), null);
        }
        return BaseResult.systemError();
    }
}
