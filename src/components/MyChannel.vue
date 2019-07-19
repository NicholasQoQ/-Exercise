<template>
  <div>
    <el-select :value="value" placeholder="请选择" @change="fn">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: ['value'],
  name: 'my-channel',
  data () {
    return {
      options: []
    }
  },
  created () {
    this.getChannel()
  },
  methods: {
    fn (data) {
      this.$emit('input', data)
    },
    getChannel () {
      this.axios.get('channels').then(res => {
        this.options = res.data.data.channels
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
