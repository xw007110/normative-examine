export class InterBankConfig {

  private BASE_URL = 'http://32.51.154.105:8090/interbank-ws/api/';
  //private BASE_URL = 'api/';
  public API = {
    login: this.BASE_URL + 'base/login/admin',
    logout: this.BASE_URL + '',
    orgTree: this.BASE_URL + 'organization/findByParent',
    // admin : this.BASE_URL + 'admin',
    admin: {
      base: this.BASE_URL + 'admin',
      page: this.BASE_URL + 'admin/page',
      resetPassword: this.BASE_URL + 'admin/resetPassword',
      updatePassword: this.BASE_URL + 'admin/updatePassword',
      changeStatus: this.BASE_URL + 'admin/freezeUnfreeze',
      getRoles: this.BASE_URL + 'admin/getRoles', 
      authorization: this.BASE_URL + 'admin/authorization',
      lockup: this.BASE_URL + 'admin/lockup',
      forbidden: this.BASE_URL + 'admin/freezeUnfreeze',
      update:this.BASE_URL + 'user',
      add:this.BASE_URL + 'user',
    },
    permission: {
      base: this.BASE_URL + 'permission',
      getPermissions: this.BASE_URL + 'permission/getPermission'
    },
    member: {
      base: this.BASE_URL + 'member',
      page: this.BASE_URL + 'member/page',
      lockup: this.BASE_URL + 'member/lockup',
      authenticate: this.BASE_URL + 'member/checkAuthentication',
      modifyMobile: this.BASE_URL + 'member/adminModifyRegMobile',
      forbidden:this.BASE_URL + 'member/freezeUnfreeze',
      integralRule: {
        base: this.BASE_URL + 'integralRule',
        list: this.BASE_URL + 'integralRule/list',
        lockup: this.BASE_URL + 'integralRule/lockup'
      },
      profit: {
        base: this.BASE_URL + 'profit',
        list: this.BASE_URL + 'profit/list',
        lockup: this.BASE_URL + 'profit/lockup',
      },
      memberGrade: {
        base: this.BASE_URL + 'memberGrade',
        list: this.BASE_URL + 'memberGrade/list',
        lockup: this.BASE_URL + 'memberGrade/lockup',
        updateProfits: this.BASE_URL + 'memberGrade/updateProfits'
      }
    },
    integralRecord: {
      base: this.BASE_URL + 'integralRecord',
      page: this.BASE_URL + 'integralRecord/page',
    },
    merchant: {
      base: this.BASE_URL + 'organization',
      page: this.BASE_URL + 'organization/page',
      lockup: this.BASE_URL + 'organization/lockup'
    },
    role: {
      base: this.BASE_URL + 'role',
      page: this.BASE_URL + 'role/page',
      list: this.BASE_URL + 'role/list',
      lockup: this.BASE_URL + 'role/lockup'
    },
    organization: {
      base: this.BASE_URL + 'organization',
      page: this.BASE_URL + 'organization/page',
      lockup: this.BASE_URL + 'organization/lockup'
    },
    person: {
      base: this.BASE_URL + 'person',
      page: this.BASE_URL + 'person/page',
      lockup: this.BASE_URL + 'person/lockup'
    },
    advertising: {
      base: this.BASE_URL + 'advertising',
      page: this.BASE_URL + 'advertising/page',
      lockup: this.BASE_URL + 'advertising/lockup'
    },
    feedback: {
      base: this.BASE_URL + 'feedback',
      page: this.BASE_URL + 'feedback/page',
      checking: this.BASE_URL + 'feedback/checking',
      checked: this.BASE_URL + 'feedback/checked'
    },
    keywords: {
      base: this.BASE_URL + 'keywords',
      page: this.BASE_URL + 'keywords/page'
    },
    announcement: {
      base: this.BASE_URL + 'announcement',
      page: this.BASE_URL + 'announcement/page',
      lockup: this.BASE_URL + 'announcement/lockup'
    },
    messageTemplateService: {
      base: this.BASE_URL + 'MessageTemplateService',
      page: this.BASE_URL + 'MessageTemplateService/page',
      lockup: this.BASE_URL + 'MessageTemplateService/lockup'
    },
    publicCircle: {
      base: this.BASE_URL + 'publicCircle',
      page: this.BASE_URL + 'publicCircle/page'
    },
    circleFriend: {
      base: this.BASE_URL + 'circleFriend',
      page: this.BASE_URL + 'circleFriend/page',
      speak: this.BASE_URL + 'circleFriend/updateSpeak'
    },
    market: {
      offlineFunds: {
        base: this.BASE_URL + 'base/product/offlineMoney',
        page: this.BASE_URL + 'base/product/offlineMoney/page',
        updateState: this.BASE_URL + 'product/offlineMoney/updateState'
      },
      onlineFunds: {
        base: this.BASE_URL + 'base/product/onlineMoney',
        page: this.BASE_URL + 'base/product/onlineMoney/page',
        updateState: this.BASE_URL + 'product/onlineMoney/updateState'
      },
      financing: {
        base: this.BASE_URL + 'base/product/tradeFinancial',
        page: this.BASE_URL + 'base/product/tradeFinancial/page',
        updateState: this.BASE_URL + 'product/tradeFinancial/updateState'
      },
      financialDebt: {
        base: this.BASE_URL + 'base/product/bondFinance',
        page: this.BASE_URL + 'base/product/bondFinance/page',
        updateState: this.BASE_URL + 'product/bondFinance/updateState'
      },
      interestDebt: {
        base: this.BASE_URL + 'base/product/bondInterestrate',
        page: this.BASE_URL + 'base/product/bondInterestrate/page',
        updateState: this.BASE_URL + 'product/bondInterestrate/updateState'
      },
      creditDebt: {
        base: this.BASE_URL + 'base/product/bondCredit',
        page: this.BASE_URL + 'base/product/bondCredit/page',
        updateState: this.BASE_URL + 'product/bondCredit/updateState'
      },
      depositReceipt: {
        base: this.BASE_URL + 'base/product/depositReceipt',
        page: this.BASE_URL + 'base/product/depositReceipt/page',
        updateState: this.BASE_URL + 'product/depositReceipt/updateState'
      },
      bill: {
        base: this.BASE_URL + 'base/product/bills',
        page: this.BASE_URL + 'base/product/bills/page',
        updateState: this.BASE_URL + 'product/bills/updateState'
      },
      funds: {
        base: this.BASE_URL + 'base/product/funds',
        page: this.BASE_URL + 'base/product/funds/page',
        updateState: this.BASE_URL + 'product/funds/updateState'
      },
      ABS: {
        base: this.BASE_URL + 'base/product/abs',
        page: this.BASE_URL + 'base/product/abs/page',
        updateState: this.BASE_URL + 'product/abs/updateState'
      },
      managementPlan: {
        base: this.BASE_URL + 'base/product/capitalmngPlan',
        page: this.BASE_URL + 'base/product/capitalmngPlan/page',
        updateState: this.BASE_URL + 'product/capitalmngPlan/updateState'
      },
      trustPlan: {
        base: this.BASE_URL + 'base/product/trustPlan',
        page: this.BASE_URL + 'base/product/trustPlan/page',
        updateState: this.BASE_URL + 'product/trustPlan/updateState'
      },
      otherAssets: {
        base: this.BASE_URL + 'base/product/othersAssets',
        page: this.BASE_URL + 'base/product/othersAssets/page',
        updateState: this.BASE_URL + 'product/othersAssets/updateState'
      },
      commonStockFunds: {
        base: this.BASE_URL + 'base/product/stockFunds',
        page: this.BASE_URL + 'base/product/stockFunds/page',
        updateState: this.BASE_URL + 'product/stockFunds/updateState'
      },
      commonServiceDemand: {
        base: this.BASE_URL + 'base/product/publicService',
        page: this.BASE_URL + 'base/product/publicService/page',
        updateState: this.BASE_URL + 'product/publicService/updateState'
      }
    },
    productQuote: {
      page: this.BASE_URL + 'productQuote/page'
    },
    productOrder: {
      base: this.BASE_URL + 'productOrder',
      page: this.BASE_URL + 'productOrder/page',
      list: this.BASE_URL + 'productOrder/list',
    },
    msgNotify: {
      findAll: this.BASE_URL + 'msgNotify/findAll'
      
    },
    labelSort:{
      base: this.BASE_URL + 'base/productOrder',
      page: this.BASE_URL + 'base/productOrder/page',
      list: this.BASE_URL + 'base/productOrder/list',
    },
    uploadUrl:'http://218.2.101.90:7081/interbank-file-ws/api/resource/upload'
    //uploadUrl:'http://32.51.154.105:7081/interbank-file-ws/api/resource/upload'
  }

  constructor() {

  }

}
