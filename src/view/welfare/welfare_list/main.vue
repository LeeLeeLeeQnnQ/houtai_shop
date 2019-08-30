<template>
  <div>
    <!-- 厨房表格数据 -->
    <Card>
      <p slot="title">
          红包申领列表
      </p>
      <tables ref="tables" v-model="applyList" :columns="columns" 
          @data-view-img="handleViewImg" 
      />
      <Page :total="page.total" :page-size="page.list_rows" @on-change="getNewPage" style="margin-top:10px;"/>
    </Card>
    <!-- 申领凭证 -->
    <Modal title="充值凭证预览" v-model="showApplyImgList">
      <Form :model="evaluateInfo" :label-width="120" inline>
        <FormItem label="店铺名称">
          <Input v-model="evaluateInfo.shop_name" type="textarea" :rows="2" readonly style="width: 300px"></Input>
        </FormItem>
        <FormItem label="实付金额">
          <Input v-model="evaluateInfo.order_total" readonly style="width: 300px"></Input>
        </FormItem>
        <FormItem label="订单日期">
          <Input v-model="evaluateInfo.order_time" readonly style="width: 300px"></Input>
        </FormItem>
        <FormItem label="图片凭证">
          <div class="img-upload-list" v-for="item in applyImgList">
            <div>
              <img :src="item">
              <div class="img-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              </div>
            </div>
          </div>
        </FormItem>
      </Form>
    </Modal>
    <!-- 查看图片 -->
    <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
// 权限
// UserOrder/index
import Tables from '_c/tables'
import { getSpreadUserOrderList , searchByOrdersn} from '@/api/spread'
export default {
  name: 'welfare_list',
  components: {
    Tables
  },
  data () {
    return {
      // 搜索
      sreach:{
        openid:'',
      },
      columns: [
        {title: '申领ID', key: 'id', width: 80},
        {title: '申领日期', key: 'create_time'},
        {title: '区域', key: 'area_name'},
        {title: '订单号', key: 'order_sn'},
        {title: '店铺名称', key: 'shop_name'},
        {title: '红包金额', key: 'coupon_value'},
        { title: '返现规则', key: 'rules'},
        { title: '审批状态',
          render: (h, params) => {
            let order_state = params.row.order_state*1
            if(order_state == 0){
              return h('span', { style: {color: '#19be6b'}}, '未审核')
            }else if (order_state == 1) {
              return h('span', { style: {color: '#2d8cf0'}}, '已发放')
            }else if (order_state == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '发放中')
            }else if (order_state == 3) {
              return h('span', { style: {color: 'red'}}, '发放失败')
            }else if (order_state == 4) {
              return h('span', { style: {color: 'red'}}, '未通过')
            }  
          }
        },
        {title: '实发金额', key: 'order_price'},
        { title: '审批结果',
          render: (h, params) => {
            let order_state = params.row.order_state*1
            let remark = params.row.remark
            let order_price = params.row.order_price*1
            let approve_time_num =  new Date(params.row.approve_time*1000)
            let approve_time  =  approve_time_num.toLocaleDateString().replace(/\//g, "-") + " " + approve_time_num.toTimeString().substr(0, 8)
            if(order_state == 0){
              return h('span', { style: {color: '#19be6b'}}, '未审核')
            }else if (order_state == 1) {
              let str = approve_time +'/已发放'+ order_price.toFixed(2) + '红包'
              return h('span', { style: {color: '#2d8cf0'}}, str )
            }else if (order_state == 2) {
              return h('span', { style: {color: '#2d8cf0'}}, '发放中请等待')
            }else if (order_state == 3) {
              return h('span', { style: {color: 'red'}}, remark )
            }else if (order_state == 4) {
              return h('span', { style: {color: 'red'}}, remark )
            }  
          }
        },
        {
          title: '查看',
          key: 'handle',
          button: [
            (h, params, vm) => {
              let comment_state = params.row.comment_state*1
              if(comment_state == 1){
                return h('Button', {
                  style:{
                    margin:"0"
                  },
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    'click': () => {
                      vm.$emit('data-show-evaluate', params)
                    }
                  }},
                '查看评价')
              }else{
                return h('Button', {
                  style:{
                    margin:"0"
                  },
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    'click': () => {
                      vm.$emit('data-view-img', params)
                    }
                  }},
                '查看凭证')
              }
            }, 
          ]
        },
      ],
      page: {
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      applyList: [],
      // 
      showApplyImgList:false,
      applyImgList:[],
      // 
      evaluateInfo:{},
      // 
      showApplyReturnModal:false,
      showApplyPassModal:false,
      // 图片
      imgUrl: '',
      visible: false,
      // 驳回原因
      return_remark:{},
      // 发放金额
      apply_money:{},
    }
  },
  methods: {
    // 搜索
    sreachKeyword(){
      this.init({});
    },
    // 图片预览
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    // 选择新页面
    getNewPage(page){
      this.init({page:page})
    },
    // 查看凭证
    handleViewImg(params){
      this.applyImgList = [];
      this.evaluateInfo= {};
      let voucher = [];
      if(!!params.row.shop_image){
        voucher.push(params.row.shop_image)
      }
      if(!!params.row.comment_image){
        voucher.push(params.row.comment_image)
      }
      if(!!params.row.order_image){
        voucher.push(params.row.order_image)
      }
      this.applyImgList = voucher;
      let order_sn = params.row.order_sn
      searchByOrdersn({order_sn:order_sn}).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.evaluateInfo = dbody.data.order
        this.showApplyImgList = true;
      })
    },
    init(data){
      data.openid = !!this.sreach.openid ? this.sreach.openid.trim() : '';
      getSpreadUserOrderList(data).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.applyList = dbody.data.list || [];
        this.page = dbody.data.page;
      })
    }
  },
  mounted () {
    this.init({});
  },
  computed: {

  }
}
</script>

<style scoped>
  .img-upload-list{
      display: inline-block;
      width: 60px;
      min-height: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      margin-right: 4px;
  }
  .img-upload-list img{
      width: 100%;
      height: 100%;
  }
  .img-upload-list-cover{
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
  }
  .img-upload-list:hover .img-upload-list-cover{
      display: block;
  }
  .img-upload-list-cover i{
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
  }
</style>
