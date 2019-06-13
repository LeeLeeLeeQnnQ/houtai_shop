<template>
  <div>
    <!-- 厨房表格数据 -->
    <Card>
      <p slot="title">
          推广商户列表
      </p>
      <a href="#" slot="extra" @click.prevent="showAddStoreModal">
          新建推广商户
      </a>
      <tables ref="tables" v-model="spreadList" :columns="columns" 
          @data-view-recharge-list="handleViewRechargeList" 
          @data-edit-info="handleEditInfo" 
          @data-recharge="saveRechargeInfo" 
          @data-edit-tag="handleEditTagModal"
          @data-eidt-status = "handleEditStatus"
      />
      <Page :total="page.total" :page-size="page.list_rows" @on-change="getNewPage" style="margin-top:10px;"/>
    </Card>
    <!-- 查看图片 -->
    <Modal title="预览图" v-model="visible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
    <!-- 添加店铺 -->
    <Modal 
      v-model="showAddModal"
      title="添加推广商户"
      @on-ok="saveAddModalInfo" >
        <Form :model="addItem" :label-width="120" inline>
          <FormItem label="经营品类">
            <Input v-model="addItem.category" placeholder="不超过6个字" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="地区选择">
            <Select v-model="addItem.area_id" @on-change="getNewArea" style="width: 200px">
              <Option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.area_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="商铺名称">
            <Input v-model="addItem.shop_name" placeholder="输入商铺名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="经营者">
            <Input v-model="addItem.shopkeeper" placeholder="输入商铺名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="商铺电话">
            <Input v-model="addItem.shop_phone" placeholder="输入商铺电话" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="店铺LOGO" style="width: 200px">
            <div>
              <img v-if="!!addItem.shop_logo" class="store_logo" :src="addItem.shop_logo">
            </div>
            <Upload
              ref="uploadLetter"
              :show-upload-list="false"
              :on-success="uploadStoreLogo"
              :format="['jpg','jpeg','png']"
              :max-size="4200"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              action="/api/Index/upload"
              style="display: inline-block;width:60px;">
              <div style="width: 60px;height:60px;line-height: 60px;">
                  <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="满减优惠">
            <Input v-model="addItem.activities" placeholder="输入满减金额（满30-15,满40-15）" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="返利规则">
            <Input v-model="addItem.rules" placeholder="输入返利规则（返8元现金红包）" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="红包金额">
            <Input v-model="addItem.coupon_value" placeholder="输入红包金额" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="美团二维码">
            <div style="width: 200px">
              <div>
                <img v-if="!!addItem.meituan_qrcode" class="store_erweima" :src="addItem.meituan_qrcode">
              </div>
              <Upload
                :show-upload-list="false"
                :on-success="uploadMeituanStoreErweima"
                :format="['jpg','jpeg','png']"
                :max-size="4200"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                type="drag"
                action="/api/Index/upload"
                style="display: inline-block;width:60px;">
                <div style="width: 60px;height:60px;line-height: 60px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </div>
          </FormItem>
          <FormItem label="饿了么二维码" >
            <div style="width: 200px">
              <div>
                <img v-if="!!addItem.ele_qrcode" class="store_erweima" :src="addItem.ele_qrcode">
              </div>
              <Upload
                ref="uploadLetter"
                :show-upload-list="false"
                :on-success="uploadElemeStoreErweima"
                :format="['jpg','jpeg','png']"
                :max-size="4200"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                type="drag"
                action="/api/Index/upload"
                style="display: inline-block;width:60px;">
                <div style="width: 60px;height:60px;line-height: 60px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </div>
          </FormItem>
        </Form>
    </Modal>
    <!-- 修改店铺 -->
    <Modal 
      v-model="showEditModal"
      title="修改推广商户"
      @on-ok="saveEditModalInfo" >
        <Form :model="editItem" :label-width="120" inline>
          <FormItem label="经营品类">
            <Input v-model="editItem.category" placeholder="不超过6个字" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="地区选择">
            <Select v-model="editItem.area_id" @on-change="getEditArea" style="width: 200px">
              <Option v-for="item in areaList" :value="item.id" :key="item.id">{{ item.area_name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="商铺名称">
            <Input v-model="editItem.shop_name" placeholder="输入商铺名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="经营者">
            <Input v-model="editItem.shopkeeper" placeholder="输入商铺名称" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="商铺电话">
            <Input v-model="editItem.shop_phone" placeholder="输入商铺电话" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="店铺LOGO" style="width: 200px">
            <div>
              <img v-if="!!editItem.shop_logo" class="store_logo" :src="editItem.shop_logo">
            </div>
            <Upload
              ref="uploadLetter"
              :show-upload-list="false"
              :on-success="updateStoreLogo"
              :format="['jpg','jpeg','png']"
              :max-size="4200"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              action="/api/Index/upload"
              style="display: inline-block;width:60px;">
              <div style="width: 60px;height:60px;line-height: 60px;">
                  <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
          </FormItem>
          <FormItem label="满减优惠">
            <Input v-model="editItem.activities" placeholder="输入满减金额（满30-15,满40-15）" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="返利规则">
            <Input v-model="editItem.rules" placeholder="输入返利规则（返8元现金红包）" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="红包金额">
            <Input v-model="editItem.coupon_value" placeholder="输入红包金额" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="使用美团二维码" >
            <Checkbox v-model="meituanSwitch" style="width: 200px" >使用美团二维码</Checkbox>
          </FormItem>
          <FormItem label="美团二维码" >
            <div style="width: 200px">
              <div>
                <img v-if="!!editItem.meituan_qrcode" class="store_erweima" :src="editItem.meituan_qrcode">
              </div>
              <Upload
                ref="uploadLetter"
                :show-upload-list="false"
                :on-success="updateMeituanStoreErweima"
                :format="['jpg','jpeg','png']"
                :max-size="4200"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="/api/Index/upload"
                style="display: inline-block;width:60px;">
                <div style="width: 60px;height:60px;line-height: 60px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </div>
          </FormItem>
          <FormItem label="使用饿了么二维码" >
            <Checkbox v-model="eleSwitch" style="width: 200px">使用饿了么二维码</Checkbox>
          </FormItem>
          <FormItem label="饿了么二维码">
            <div  style="width: 200px">
              <div>
                <img v-if="!!editItem.ele_qrcode" class="store_erweima" :src="editItem.ele_qrcode">
              </div>
              <Upload
                ref="uploadLetter"
                :show-upload-list="false"
                :on-success="updateElemeStoreErweima"
                :format="['jpg','jpeg','png']"
                :max-size="4200"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="/api/Index/upload"
                style="display: inline-block;width:60px;">
                <div style="width: 60px;height:60px;line-height: 60px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
            </div>
          </FormItem>
        </Form>
    </Modal>
    <!-- 修改店铺状态 -->
    <Modal 
      v-model="showEditStatusModal"
      title="修改店铺状态"
      @on-ok="saveEditStatusModalInfo" >
        <Form :model="editItem" :label-width="120" inline>
          <FormItem label="更改状态">
            <Select v-model="statusItem" style="width: 200px">
              <Option :value="1" :key="1">上线</Option>
              <Option :value="2" :key="2">敬请期待</Option>
              <Option :value="3" :key="3">禁用</Option>
            </Select>
          </FormItem>
        </Form>
    </Modal>
    <!-- 充值 -->
    <Modal 
      v-model="showRechargeModal"
      title="添加推广商户"
      @on-ok="saveRechargeModalInfo" >
        <Form :model="rechargeItem" :label-width="120" inline>
          <FormItem label="充值金额">
            <Input v-model="rechargeItem.money" placeholder="输入金额" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="rechargeItem.remark" placeholder="输入金额" style="width: 200px"></Input>
          </FormItem>
<!--           <FormItem label="本次缴纳凭证">
            <div class="img-upload-list" v-for="item in rechargeImgList">
              <div>
                <img :src="item">
                <div class="img-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item,'rechargeImgList')"></Icon>
                </div>
              </div>
            </div>
            <Upload
                :show-upload-list="false"
                :on-success="uploadRechargeImg"
                :format="['jpg','jpeg','png']"
                :max-size="4200"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="/api/Index/upload"
                style="display: inline-block;width:60px;">
                <div style="width: 60px;height:60px;line-height: 60px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
          </FormItem> -->
        </Form>
    </Modal>
    <!-- 标签编辑 -->
    <Modal 
      v-model="showEditTagModal"
      title="添加标签"
      @on-ok="saveEditTagModalInfo" >
        <Form :model="tagItem" :label-width="120" inline>
          <FormItem label="标签1">
            <Input v-model="tagItem.tag1" placeholder="例如：人均17元" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="标签2">
            <Input v-model="tagItem.tag2" placeholder="例如：月销3000+" style="width: 200px"></Input>
          </FormItem>
          <FormItem label="标签3">
            <Input v-model="tagItem.tag3" placeholder="请输入标签" style="width: 200px"></Input>
          </FormItem>
        </Form>
    </Modal>
    <!-- 充值列表 -->
    <Modal title="充值列表" v-model="showRechargeModalList">
        <tables
          ref="tables"
          v-model="rechargeBillList"
          :columns="rechargeColumns"
        />
        <!-- @voucher-view="showStoreBudgetVoucher" -->
        <Page :total="recharge_page.total" :page-size="recharge_page.list_rows" @on-change="getRechargeNewPage" style="margin-top:10px;"/>
    </Modal>
    <!-- 充值凭证 -->
    <Modal title="充值凭证预览" v-model="showRechargeBudgetList">
      <div class="img-upload-list" v-for="item in storeRechargeList">
        <div>
          <img :src="item">
          <div class="img-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
// 权限
// Shop/index,Shop/add,Shop/edit,Shop/state,Area/getAreaList,Shop/deposit,ShopPay/index
import { getSpreadStoreList , addSpreadStore , editSpreadStore , changeStateSpreadStore , getAreaList , depositSpreadStore , getShopPayList } from '@/api/spread'
import Tables from '_c/tables'
export default {
  name: 'spread_list',
  components: {
    Tables
  },
  data () {
    return {
      // 图片
      imgUrl: '',
      visible: false,
      // 当前充值店铺id
      recharge_store_id:'',
      // 
      columns: [
        {title: '推广店铺ID', key: 'id',width:100},
        {title: '店铺名称', key: 'shop_name'},
        {title: '店铺电话', key: 'shop_phone'},
        { title: '余额',
          render: (h, params) => {
            let yue = params.row.shop_account*1
            if(yue > 50){
              return h('span', { style: {color: '#19be6b'}}, yue)
            }else if (yue > 0) {
              return h('span', { style: {color: '#2d8cf0'}}, yue)
            }else if (yue <= 0) {
              return h('span', { style: {color: 'red'}}, yue)
            }  
          }
        },
        {title: '建立日期', key: 'create_time'},
        {title: '返单数', key: 'order_count'},
        { title: '状态',
          render: (h, params) => {
            let status = params.row.shop_state;
            if(status == '1'){
              return h('span', { style: {color: '#19be6b'}}, '上线')
            }else if (status == '2') {
              return h('span', { style: {color: '#2d8cf0'}}, '敬请期待')
            }else if (status == '3') {
              return h('span', { style: {color: 'red'}}, '禁用')
            }
          }
        },
        {
          title: '查看',
          key: 'handle',
          width:90,
          button: [
            (h, params, vm) => {
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
                    vm.$emit('data-view-recharge-list', params)
                  }
                }},
              '充值列表')
            }, 
          ]
        },
        {
          title: '编辑',
          key: 'handle',
          width:180,
          button: [
            (h, params, vm) => {
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
                    vm.$emit('data-edit-tag', params)
                  }
                }},
              '标签编辑')
            },
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {margin: '5px'},
                on: {
                  'click': () => {
                    vm.$emit('data-eidt-status', params)
                  }
                }},
              '状态变更')
            },
          ]
        },
        {
          title: '操作',
          key: 'handle',
          width : 160 ,
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                style: {
                  margin:'5px 0 ',
                },
                props: {
                  confirm: true,
                  title: '修改店铺推广信息！'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('data-edit-info', params)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {marginLeft: '0px'}
                }, '修改信息')
              ])
            },
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {margin: '5px'},
                on: {
                  'click': () => {
                    vm.$emit('data-recharge', params)
                  }
                }},
              '充值')
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
      // 区域下拉
      areaList:[],
      spreadList: [],
      currentId:'',
      // 
      showAddModal: false,
      addItem: {},

      showEditModal: false,
      editItem: {},

      showRechargeModal:false,
      rechargeItem:{},
      rechargeImgList:[],
      // 缴费列表
      showRechargeModalList:false,
      rechargeBillList:[],
      // 充值col
      rechargeColumns: [
        {title: '充值时间', key: 'create_time'},
        {title: '充值金额', key: 'money'},
        {title: '备注', key: 'remark'},
        // {
        //   title: '查看凭证',
        //   key: 'handle',
        //   button: [
        //     (h, params, vm) => {
        //       return h('Button', {
        //         style: {},
        //         props: {
        //           type: 'primary',
        //           size: 'small'
        //         },
        //         on: {
        //           'click': () => {
        //             vm.$emit('voucher-view', params)
        //           }
        //         }},
        //       '查看凭证')
        //     }
        //   ]
        // },
      ],
      recharge_page:{
        current_page: 1,
        last_page: '',
        list_rows: 0,
        total: 0
      },
      // 充值凭证
      showRechargeBudgetList:false,
      storeRechargeList:[],
      // 标签编辑
      showEditTagModal:false,
      tagItem:{},
      // 更改店铺状态
      showEditStatusModal:false,
      statusItem:'',
      // id
      spread_store_id: '',
      // 
      source_list:['美团','饿了么'],
      // Switch
      eleSwitch:true,
      meituanSwitch:true,
    }
  },
  methods: {
    // 图片预览
    handleView (imgUrl) {
      this.imgUrl = imgUrl
      this.visible = true
    },
    // 删除图片
    handleRemove (file, name) {
      const fileList = this.$refs[name].fileList
      this.$refs[name].fileList.splice(fileList.indexOf(file), 1)
      this[name].splice(fileList.indexOf(file), 1)
    },  
    // 错误提示
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: '文件 ' + file.name + ' 格式错误, 请上传jpg／jpeg／png格式.'
      })
    },
    // 超大提示
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过最大限制',
        desc: '文件  ' + file.name + ' 过大, 不能超过 2M.'
      })
    },
    // 发送触发
    handleBeforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
      }
    },
    uploadStoreLogo (res, file) {
      if (res.code == 0) {
        this.addItem.shop_logo = res.data;
        this.showAddModal = false;
        this.showAddModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    uploadMeituanStoreErweima(res, file) {
      if (res.code == 0) {
        this.addItem.meituan_qrcode = res.data;
        this.showAddModal = false;
        this.showAddModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    uploadElemeStoreErweima(res, file) {
      if (res.code == 0) {
        this.addItem.ele_qrcode = res.data;
        this.showAddModal = false;
        this.showAddModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    // 修改
    updateStoreLogo(res, file) {
      if (res.code == 0) {
        this.editItem.shop_logo = res.data;
        this.showEditModal = false;
        this.showEditModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    updateElemeStoreErweima(res, file) {
      if (res.code == 0) {
        this.editItem.ele_qrcode = res.data;
        this.showEditModal = false;
        this.showEditModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    updateMeituanStoreErweima(res, file) {
      if (res.code == 0) {
        this.editItem.meituan_qrcode = res.data;
        this.showEditModal = false;
        this.showEditModal = true;
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    // 退场其他
    uploadRechargeImg (res, file) {
      if (res.code == 0) {
        this.rechargeImgList.push(res.data)
      }else{
        this.$Notice.warning({
          title: res.msg
        })
      }
    },
    // 显示添加
    showAddStoreModal(){
      this.addItem= {};
      this.showAddModal = true;
    },
    // 查看充值列表
    handleViewRechargeList(params) {
      this.recharge_store_id = params.row.id;
      this.rechargeBillList = [];
      getShopPayList( { id : this.recharge_store_id } ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.rechargeBillList = dbody.data.list || [];
        this.recharge_page = dbody.data.page;
        this.showRechargeModalList = true;
      })
    },
    // 获取新区域
    getNewArea(){
      this.areaList.forEach((item) => {
        if(this.addItem.area_id == item.id){
          this.addItem.area_name = item.title
        }
      })
    },
    getEditArea(){
      this.areaList.forEach((item) => {
        if(this.editItem.area_id == item.id){
          this.editItem.area_name = item.title
        }
      })
    },
    // 编辑推广商户
    handleEditInfo(params) {
      this.editItem = params.row;
      this.showEditModal = true;
    },
    // 验证数据完整
    testObj( data ){
      if(!data.shop_name){
        this.$Notice.warning({
          title: '店铺名称错误！'
        })
        return false
      }
      if(!data.shop_phone ){
        this.$Notice.warning({
          title: '店铺电话错误！'
        })
        return false
      }
      if(!data.shopkeeper){
        this.$Notice.warning({
          title: '经营者错误！'
        })
        return false
      }
      if(!data.shop_logo){
        this.$Notice.warning({
          title: '商户logo错误！'
        })
        return false
      }
      if(!data.area_id){
        this.$Notice.warning({
          title: '区域商圈错误！'
        })
        return false
      }
      if(!data.category){
        this.$Notice.warning({
          title: '经营品类错误！'
        })
        return false
      }
      if(!data.activities){
        this.$Notice.warning({
          title: '满减优惠错误！'
        })
        return false
      }
      if(!data.rules){
        this.$Notice.warning({
          title: '返利规则错误！'
        })
        return false
      }
      return true
    },
    // 创建推广商户
    saveAddModalInfo(){
      if(this.testObj(this.addItem)){
        addSpreadStore( this.addItem ).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.$Notice.warning({
            title: "添加成功！"
          })
          this.init({ page:this.current_page });
        })
      }
    },
    // 保存修改
    saveEditModalInfo(){
      if(this.testObj(this.editItem)){
        let data = Object.assign({}, this.editItem);
        delete data.update_time;
        delete data.create_time;
        if( !this.eleSwitch ){
          data.ele_qrcode = ''
        }
        if( !this.meituanSwitch ){
          data.meituan_qrcode = ''
        }
        editSpreadStore( data ).then(res => {
          const dbody = res.data
          if (dbody.code != 0) {
            this.$Notice.warning({
              title: dbody.msg
            })
            return
          }
          this.$Notice.warning({
            title: "修改成功！"
          })
          this.init({ page:this.current_page });
        })
      }
    },
    // 保存充值记录
    saveRechargeModalInfo(){
      if(isNaN(this.rechargeItem.money)){
        this.$Notice.warning({
          title: '充值金额错误！'
        })
        return
      }
      depositSpreadStore( this.rechargeItem ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "充值成功！"
        })
        this.init({ page:this.current_page });
      })
    },
    // 商户充值登记
    saveRechargeInfo(params){
      this.recharge_store_id = params.row.id;
      // this.rechargeImgList = [];
      this.rechargeItem = {
        id:this.recharge_store_id,
      };
      this.showRechargeModal = true;
    },
    // 展示凭证
    showStoreBudgetVoucher(params){
      let voucher = !!params.row.images ? params.row.images.split(',') : [];
      this.storeBudgetList = [];
      this.storeBudgetList = voucher;
      this.showRechargeBudgetList = true;
    },
    // showEditTagModal 展示
    handleEditTagModal(params){
      let arr = !!params.row.tags? params.row.tags.split(',') : [];
      this.tagItem = {};
      arr.map((item,index) => {
        let str = 'tag'+(index+1)
        this.tagItem[str] = item;
      })
      this.currentId = params.row.id || '';
      this.showEditTagModal = true;
    },
    // saveEditTagModalInfo 保存标签
    saveEditTagModalInfo(){
      let tagArr = [];
      for( let key in this.tagItem ){
        if(!!this.tagItem[key]){
          tagArr.push(this.tagItem[key])
        }
      }
      let data = {
        id : this.currentId,
        tags : tagArr.join(','),
      }
      editSpreadStore( data ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "编辑成功！"
        })
        this.init({ page:this.current_page });
      })
    },
    // 选择新页面
    getNewPage(page){
      this.init({ page : page });
    },
    // 充值页面新
    getRechargeNewPage(page){
      getShopPayList( { id : this.recharge_store_id , page: page } ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.rechargeBillList = dbody.data.list || [];
        this.recharge_page = dbody.data.page;
        this.showRechargeModalList = false;
        this.showRechargeModalList = true;
      })
    },
    // 显示更改店铺状态
    handleEditStatus(params){
      this.currentId = params.row.id || '';
      this.statusItem = params.row.status || '';
      this.showEditStatusModal = true;
    },
    // 保存变更
    saveEditStatusModalInfo(){
      let data = {
        id : this.currentId , 
        shop_state : this.statusItem , 
      }
      changeStateSpreadStore( data ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.$Notice.warning({
          title: "修改成功！"
        })
        this.init({ page:this.current_page });
      })
    },
    // 初始化
    init( data ){
      getSpreadStoreList( data ).then(res => {
        const dbody = res.data
        if (dbody.code != 0) {
          this.$Notice.warning({
            title: dbody.msg
          })
          return
        }
        this.spreadList = dbody.data.list || [];
        if(!!dbody.data.page){
          this.page = dbody.data.page;
        } 
      })
    },
  },
  mounted () {
    getAreaList().then(res => {
      const dbody = res.data
      if (dbody.code != 0) {
        this.$Notice.warning({
          title: dbody.msg
        })
        return
      }
      this.areaList = dbody.data || [];
      this.init();
    })
  },
  computed: {

  }
}
</script>

<style scoped>
  .store_logo{
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border:1px solid #ddd;
  }
  .store_erweima{
    width: 200px;
    height: 200px;
    border-radius: 5px;
    border:1px solid #ddd;
  }
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
