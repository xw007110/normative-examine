package com.wesite.normative.examine.systemConfig;

import com.wesite.normative.examine.contants.SystemMsgBase;
import com.wesite.normative.examine.entity.BaseResult;
import com.wesite.normative.examine.exception.ParameterException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    public Logger logger = LoggerFactory.getLogger(getClass());

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public BaseResult handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        return BaseResult.fail(SystemMsgBase.LACK_PARAMS_CODE , SystemMsgBase.LACK_PARAMS_MSG  + e.getParameterName(), null);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    BaseResult handleException(Exception e) {
        if (e instanceof ParameterException) {
            // 参数校验不记录异常日志，避免日志过多
            ParameterException exception = (ParameterException) e;
            return BaseResult.fail(SystemMsgBase.PARAMS_CHECK_FAILED_CODE, exception.getErrorMsg(), null);
        }

        logger.info("异常信息{}" , e);
        return BaseResult.systemError();
    }
}
