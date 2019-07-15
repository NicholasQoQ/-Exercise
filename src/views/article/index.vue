<template>
    <div>
        <el-card class="box-card" style="margin-bottom:20px">
            <my-crumbs>内容</my-crumbs>
            <el-form label-width="50px" :model="FormArticle" size="small">
                <el-form-item label="频道">
                    <el-radio-group v-model="FormArticle.channel_id">
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核未通过</el-radio>
                        <el-radio :label="4">已删除</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态" size='small'>
                    <el-select v-model="FormArticle.status" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="时间" size='small'>
                    <div class="block">
                        <el-date-picker
                        v-model="begin"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                    <el-button type="primary" size='small' >筛选</el-button>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      FormArticle: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      begin: [],
      options: [{
        value: null,
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      tableData: []
    }
  }
}
</script>

<style>
    .el-form-item__label{
       text-align:left
    }
</style>
