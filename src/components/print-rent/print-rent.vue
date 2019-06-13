<template>
  <div class="page">
    <h4>橘猫精选商户租金账单</h4>
    <div class="page_head">
      <p>尊敬的商户:</p>
      <p class="ti2">您好！</p>
      <p class="ti2">
        以下是您在橘猫精选四道口店所租档口的房租明细，请您于
        <span>{{year}}年{{month}}月{{lastday}}日</span>
        0时之前，将下述租金支付至我公司财务部。</p>
    </div>
    <div class="page_main">
        <div class="page_main_item">
          <span><i>1.</i>商户名称：</span>
          <p>{{print_info.store_name}}</p>
        </div>
        <div class="page_main_item">
          <span><i>2.</i>档口号位置：</span>
          <p>{{print_info.store_no}}</p>
        </div>
        <div class="page_main_item">
          <span><i>3.</i>商户负责人：</span>
          <p>{{print_info.shopkeeper}}</p>
        </div>
        <div class="page_main_item">
          <span><i>4.</i>款项类型：</span>
          <p>场地使用费+管理费</p>
        </div>
        <div class="page_main_item">
          <span><i>5.</i>款项明细日期：</span>
          <p>{{print_info.rent_start_date}}至{{print_info.rent_end_date}}</p>
        </div>
        <div class="page_main_item">
          <span><i>6.</i>滞纳金起算日：</span>
          <p></p>
        </div>
        <div class="page_main_item">
          <span><i>7.</i>末付滞纳金金额：</span>
          <p>{{print_info.rent_overdue_fee}}元</p>
        </div>
        <div class="page_main_item">
          <span><i>8.</i>房租减免金额：</span>
          <p>{{print_info.rent_exempt_fee}}元</p>
        </div>
        <div class="page_main_item">
          <span><i>9.</i>应付款合计：</span>
          <p>{{total}}元 </p>
        </div>
    </div>
    <div class="page_footer">
        <div class="page_footer_top">
          <p>我公司严格履行合同条款，对逾期不按规定付款的客户，将按迟交天数收取滞纳金，请您于每月收到账单日起5日内支付，如未能按时缴费的，每超出1日按全部费用的1%作为未按时缴费的滞纳金。若产生滞纳金超过五日包含第五天的，我司将停止您店铺的能源供应，若超过十天包含第十天的，我司有权终止服务合同，并没收您全部保证金，收回您使用的铺位，并保留行使其它索赔的权利。</p>
          <p>如有疑问请咨询本店运维管理部</p>
        </div>
        <div class="page_footer_main">
          <p>汇款信息：</p>
          <p class="ti2">
            <span>账户名称：王乙同</span>
          </p>
          <p  class="ti2">
            <span>开户行：中国邮政储蓄银行北京昌平区北七家支行</span>
          </p>
          <p  class="ti2">
            <span>卡号：6217991000006021260</span>
          </p>
        </div>
        <div class="page_footer_bottom">
          <p>北京金同餐饮管理有限公司</p>
          <p>{{currentdate}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'print-rent',
  props: {
    print_info: {
      type:Object,
      default: {}
    },
  },
  data () {
    return {
      year:'',
      month:'',
      lastday:'',
      currentdate:'',
      total:'',
    }
  },
  watch: {
    print_info (newInfo, oldInfo) {
      this.formValue(newInfo);
      this.print_info = newInfo;
    }
  },
  methods: {
    getCurentTime () {
      var date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = date.getFullYear() + '年' + month + '月' + strDate+ '日'
      return currentdate
    },
    // 获取当前月最后一天
    getCurrentMonthLast (date){
     var endDate = new Date(date); //date 是需要传递的时间如：2018-08
     var month=endDate.getMonth();
     var nextMonth=++month;
     var nextMonthFirstDay=new Date(endDate.getFullYear(),nextMonth,1);
     var oneDay=1000*60*60*24;
     var dateString=new Date(nextMonthFirstDay-oneDay);
     var dateYar = dateString.toLocaleDateString(); //toLocaleDateString() 返回 如：2018/8/31
      var arr = dateString.toLocaleDateString().replace(new RegExp('/','g'),"-").split("-");
     return arr[arr.length-1];
    },
    formValue(info){
      let date = info.month ? info.month :  '0000-00';
      let arr = date.split('-');
      this.year = arr[0] || '';
      this.month = arr[1] || '';
      this.lastday = this.getCurrentMonthLast(date);
      this.currentdate = this.getCurentTime();
      this.total = (info.rent_fee*1 + info.rent_overdue_fee*1 - info.rent_exempt_fee*1).toFixed(2);
    },
  },
  created () {
    this.formValue(this.print_info);
  },
}
</script>

<style>
    @page {
      size: A4;
      margin: 0;
    }
    @media print {
        *{
          font-size: 10pt;
          line-height: 11pt;
          font-family: "宋体"
        }
        .page {
          margin: 0;
          border: initial;
          border-radius: initial;
          width: initial;
          min-height: initial;
          box-shadow: initial;
          background: initial;
          page-break-after: always;
        }
    }
    .ti2{
      text-indent: 2em;
    }
    .page{
      box-sizing: border-box;
      padding: 70px 110px 50px;
    }
    
    .page h4{
      text-align: center;
      margin-bottom: 5px;
      font-size: 22px;
    }
    .page_head{
      width: 100%;
      overflow:hidden;
      line-height: 12pt;
    }
    
    .page_main{

    }
    .page_main .page_main_item{
      text-indent: 2em;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 3em;
    }
    .page_main .page_main_item span{
      width: 150px;
    }
    .page_main .page_main_item i{
      font-style:normal; 
      font-weight:400; 
    }
    .page_main .page_main_item p{
      border-bottom: 1px solid #000;
      text-align: center;
      text-indent: 0em;
      /*padding: 0 3em 2px;*/
      padding-bottom: 2px;
      width: 300px;
      height: 2em;
    }

    .page_footer{
        padding: 5px;
        line-height: 0.9em;
    }
    .page_footer_top{
      text-indent: 2em;
      line-height: 12pt;
      margin: 2em 0;
    }
    .page_footer_main{
      line-height: 15pt;
      margin: 2em 0;
    }
    .page_footer_bottom{
      line-height: 15pt;
      text-align: right;
    }
</style>
