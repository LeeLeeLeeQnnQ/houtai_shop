<template>
  <div>
    <Card>
      <p slot="title">
          账户余额：{{total_money}}
      </p>
      <tables ref="tables" v-model="recharge_list" :columns="columns" />
      <Page :total="page.total" :page-size="page.list_rows" @on-change="getNewPage" style="margin-top:10px;"/>
    </Card>
  </div>
</template>
<script>
import { getStoreId  } from '@/libs/util'
import Tables from '_c/tables'
import { getShopPayList , getShopTotalMoney } from '@/api/spread'
export default {
  name: 'recharge_list',
  components: {
    Tables
  },
  data () {
    return {
      // 搜索
      sreach:{
        openid:'',
      },
      total_money:'',
      columns: [
        {title: 'ID', key: 'id'},
        { title: '消费状态',
          render: (h, params) => {
            let pay_type = params.row.pay_type*1
            if(pay_type == 1){
              return h('span', { style: {color: '#19be6b'}}, '充值')
            }else if (pay_type == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '扣款')
            } 
          }
        },
        {title: '启始金额', key: 'before_money'},
        {title: '消费后金额', key: 'after_money'},
        {title: '消费金额', key: 'money'},
        {title: '消费日期', key: 'create_time'},
        
      ],
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      recharge_list: [],
    }
  },
  methods: {
    // 搜索
    sreachKeyword(){
      this.init({});
    },
    // 选择新页面
    getNewPage(page){
      this.init({page:page})
    },
    init(data){
      data.openid = !!this.sreach.openid ? this.sreach.openid.trim() : '';
      getShopPayList(data).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.recharge_list = dbody.data.list || [];
        this.page = dbody.data.page;
      })
    },
    getTotalMoney(){
      let data = { id : getStoreId()}
      getShopTotalMoney(data).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.total_money = dbody.data.shop_account;
      })
    },
  },
  mounted () {
    this.init({});
    this.getTotalMoney();
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
