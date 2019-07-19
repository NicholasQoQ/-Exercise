<template>
  <div class="images-container">
    <el-card>
      <my-crumbs>素材管理</my-crumbs>
      <div>
        <el-radio-group v-model="serveFrom.collect" size="small" @change="collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="small"
          style="float: right;"
          type="success"
          @click="dialogVisible = true"
        >默认按钮</el-button>
      </div>
      <div class="imageBox" v-for="item in imagesList" :key="item.id">
        <img :src="item.url" alt />
        <div class="imageBoxFoot">
          <span
            class="el-icon-star-off"
            :class="{red:item.is_collected}"
            @click="collectImage(item)"
          ></span>
          <span class="el-icon-delete"></span>
        </div>
      </div>
      <!-- 分页 -->
      <div style="text-align: center;">
        <el-pagination
          v-if="total>serveFrom.per_page"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="serveFrom.per_page"
          :current-page="serveFrom.page"
          @current-change="currentPage"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="30%">
      <span style="margin-top: 20px;text-align: center;">
        <el-upload
          name="image"
          :headers="header"
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      serveFrom: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      imagesList: [],
      // 总条数
      total: 0,
      // 对话框隐藏
      dialogVisible: false,
      // 显示图片路径
      imageUrl: null,
      // 请求头
      header: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('heima')).token
      }
    }
  },
  created () {
    this.getIages()
  },
  methods: {
    collectImage (item) {
      this.axios
        .put(`user/images/${item.id}`, { collect: !item.is_collected })
        .then(res => {
          console.log(res)
          this.$message.success('收藏成功')
          this.getIages()
        })
    },
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        this.getIages()
        this.imageUrl = null
      }, 2000)
    },
    currentPage (page) {
      this.serveFrom.page = page
      this.getIages()
    },
    getIages () {
      this.axios.get('user/images', { params: this.serveFrom }).then(res => {
        const {
          data: { data }
        } = res
        // console.log(data)
        this.imagesList = data.results
        this.total = data.total_count
      })
    },
    collect (label) {
      this.serveFrom.collect = label
      this.getIages()
    }
  }
}
</script>
<style lang="less" scoped>
.images-container {
  .imageBox {
    width: 150px;
    height: 150px;
    border: 1px solid #ebeef5;
    margin-top: 20px;
    margin-right: 40px;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
    img {
      width: 100%;
      height: 120px;
      object-fit: contain;
    }
    .imageBoxFoot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      span {
        margin: 0 20px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
