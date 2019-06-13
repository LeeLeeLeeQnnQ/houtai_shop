<template>
  <div>
    <Card shadow>
      <Row :gutter="20">
        <i-col :xs="5" :md="5" :lg="5">
          <Select v-model="kitchenKey" @on-change="changeType">
            <Option v-for="item in kitchen" :value="item.key" :key="item.key">{{ item.title }}</Option>
          </Select>
        </i-col>
        <Button @click="handleSearch" type="primary">
          <Icon type="search"/>&nbsp;&nbsp;搜索
        </Button>
        <slot></slot>
      </Row>
    </Card>
    <div style="margin-top: 10px;margin-bottom: 10px;font-size: 18px;padding-left: 20px;border-bottom: 1px solid #d7dde4;line-height: 2em;color: #657180;">
        <h3>{{kitchenTitle}}</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'head-select',
  data () {
    return {
      kitchen: [
        {title: '工体厨房', key: '1'},
        {title: '四道口厨房', key: '2'}
      ],
      kitchenKey: '',
      kitchenTitle: ''
    }
  },
  methods: {
    handleSearch () {
      this.$emit('searchkitchen', {kitchenId: this.kitchenKey, kitchenTitle: this.kitchenTitle})
    },
    setDefaultKitchen () {
      this.kitchenKey = this.kitchen[0].title !== 'handle' ? this.kitchen[0].key : (this.kitchen.length > 1 ? this.kitchen[1].key : '')
      this.kitchenTitle = this.kitchen[0].title !== 'handle' ? this.kitchen[0].title : (this.kitchen.length > 1 ? this.kitchen[1].title : '')
    },
    changeType () {
      let obj = this.kitchen.filter(item => item.key == this.kitchenKey)[0]
      this.kitchenTitle = obj.title
    }
  },
  created () {
    this.setDefaultKitchen()
  }
}
</script>
