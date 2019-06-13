<template>
  <div>
    <Card shadow>
      <Row :gutter="20">
        <i-col :xs="3" :md="3" :lg="3">
          <Select v-model="monthSelect">
            <Option v-for="item in months" :value="item.key" :key="item.key">{{ item.title }}</Option>
          </Select>
        </i-col>
        <Button @click="handleSearch" type="primary">
          <Icon type="search"/>&nbsp;&nbsp;搜索
        </Button>
        <slot></slot>
      </Row>
    </Card>
  </div>
</template>
<script>
export default {
  name: 'head-months-select',
  data () {
    return {
      kitchen: [
        {title: '工体厨房', key: '1'},
        {title: '四道口厨房', key: '2'}
      ],
      months: [
        {title: '一月', key: '1'},
        {title: '二月', key: '2'},
        {title: '三月', key: '3'},
        {title: '四月', key: '4'},
        {title: '五月', key: '5'},
        {title: '六月', key: '6'},
        {title: '七月', key: '7'},
        {title: '八月', key: '8'},
        {title: '九月', key: '9'},
        {title: '十月', key: '10'},
        {title: '十一月', key: '11'},
        {title: '十二月', key: '12'}
      ],
      kitchenKey: '',
      kitchenTitle: '',
      monthSelect: ''
    }
  },
  methods: {
    handleSearch () {
      this.$emit('searchkitchen', {kitchenId: this.kitchenKey, kitchenTitle: this.kitchenTitle, monthSelect: this.monthSelect})
    },
    setDefault () {
      this.kitchenKey = this.kitchen[0].title !== 'handle' ? this.kitchen[0].key : (this.kitchen.length > 1 ? this.kitchen[1].key : '')
      this.kitchenTitle = this.kitchen[0].title !== 'handle' ? this.kitchen[0].title : (this.kitchen.length > 1 ? this.kitchen[1].title : '')
      this.monthSelect = this.months[0].key
    },
    changeType () {
      let obj = this.kitchen.filter(item => item.key == this.kitchenKey)[0]
      this.kitchenTitle = obj.title
    }
  },
  created () {
    this.setDefault()
  }
}
</script>
