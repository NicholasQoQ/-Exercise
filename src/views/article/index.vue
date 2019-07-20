<template>
  <div>
    <el-card class="box-card" style="margin-bottom:20px">
      <my-crumbs>内容</my-crumbs>
      <el-form label-width="50px" :model="FormArticle" size="small">
        <el-form-item label="状态">
          <el-radio-group v-model="FormArticle.status" @change="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核未通过</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" size="small">
          <my-channel v-model="FormArticle.channel_id"></my-channel>
        </el-form-item>

        <el-form-item label="时间" size="small">
          <div class="block">
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="getTime"
              v-model="begin"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-button type="primary" size="small" @click="screen">筛选</el-button>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header">共查询到 {{total}} 条结果：</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope="scope">
            <div class="demo-image">
              <el-image style="width: 100px; height: 100px" :src="scope.row.cover.images[0]"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="scope.row.title" label="标题" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.status===0">草稿</el-tag>
            <el-tag size="medium" v-if="scope.row.status===1">待审核</el-tag>
            <el-tag size="medium" v-if="scope.row.status===2">审核通过</el-tag>
            <el-tag size="medium" v-if="scope.row.status===3">审核未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="发布时间">
          <template slot-scope="scope">
            <span>{{ scope.row.pubdate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              round
              class="el-icon-edit"
              @click="editor(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              round
              class="el-icon-delete"
              @click="del(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="currentPage"
      :total="total"
      :page-size="FormArticle.per_page"
      :current-page="FormArticle.page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      FormArticle: {
        // 状态
        status: null,
        // 频道
        channel_id: null,
        // 起始时间
        begin_pubdate: '',
        // 截止时间
        end_pubdate: '',
        // 页数
        page: 1,
        // 每页数量
        per_page: 10
      },
      // 时间
      begin: [],
      // 表格数据
      tableData: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    editor (id) {
      this.$router.push('/publish?id=' + id)
    },
    del (id) {
      this.axios.delete(`articles/${id}`).then(res => {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.getData()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
    },
    screen () {
      // console.log(this.FormArticle)
      this.getData()
    },
    status (id) {
      this.FormArticle.status = id
    },
    getTime (newTime) {
      this.FormArticle.begin_pubdate = newTime[0]
      this.FormArticle.end_pubdate = newTime[1]
    },
    currentPage (newPage) {
      this.FormArticle.page = newPage
      this.getData()
    },
    getData () {
      this.axios.get('articles', { params: this.FormArticle }).then(res => {
        const data = res.data.data
        this.tableData = data.results
        this.total = data.total_count
      })
    }
  }
}
</script>

<style>
.el-form-item__label {
  text-align: left;
}
</style>
