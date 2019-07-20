<template>
  <div class="UploadBox">
    <img :src="value|| imgUrl" alt @click="dialogVisible = true" />
    <el-dialog title="提示" :visible.sync="dialogVisible" width="700px">
      <span>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="全部" name="first">
            <div>
              <el-radio-group v-model="imagesFrom.collect" size="small" @change="collectImages">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
            </div>

            <div
              class="ImageBox"
              v-for="item in imagesList"
              :key="item.id"
              :class="{selected:selectedImageUrl==item.url}"
              @click="pitch(item.url)"
            >
              <img :src="item.url" alt />
              <div class="fot">
                <span
                  class="el-icon-star-off"
                  :class="{red:item.is_collected}"
                  @click="collecThis(item)"
                ></span>
                <span class="el-icon-delete"></span>
              </div>
            </div>
            <div style="text-align: center;">
              <el-pagination
                v-if="total>imagesFrom.per_page"
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="imagesFrom.per_page"
                :current-page="imagesFrom.page"
                @current-change="imagePage"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="上传" name="second">
            配置管理
            <div>
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
            </div>
          </el-tab-pane>
        </el-tabs>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CheckedDefault from '../assets/images/pic_bg.png'
export default {
  name: 'MyUpload',
  props: ['value'],
  data () {
    return {
      imagesFrom: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 对话框隐藏
      dialogVisible: false,
      // tab显示
      activeName: 'first',
      // 素材列表
      imagesList: [],
      // 总条数
      total: 0,
      // 上传地址
      imageUrl: null,
      // 请求头
      header: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('heima')).token
      },
      // 选中的地址
      selectedImageUrl: null,
      // 显示的地址
      imgUrl: CheckedDefault
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    confirm () {
      if (this.activeName === 'first') {
        if (this.selectedImageUrl) {
          this.$emit('input', this.selectedImageUrl)
          this.dialogVisible = false
          this.selectedImageUrl = null
        } else {
          this.$message({
            message: '请选择图片',
            type: 'warning'
          })
        }
      } else {
        if (this.imageUrl) {
          this.$emit('input', this.imageUrl)
          this.dialogVisible = false
          this.imageUrl = null
        } else {
          this.$message({
            message: '请上传图片',
            type: 'warning'
          })
        }
      }
    },
    pitch (url) {
      this.selectedImageUrl = url
    },
    handleAvatarSuccess (data) {
      this.imageUrl = data.data.url
    },
    collecThis (item) {
      this.axios
        .put(`/user/images/${item.id}`, { collect: !item.is_collected })
        .then(res => {
          this.getImages()
        })
    },
    imagePage (page) {
      this.imagesFrom.page = page
      this.getImages()
    },
    collectImages (label) {
      this.imagesFrom.collect = label
      this.getImages()
    },
    getImages () {
      this.axios.get('user/images', { params: this.imagesFrom }).then(res => {
        console.log(res.data.data)
        this.imagesList = res.data.data.results
        this.total = res.data.data.total_count
      })
    }
  }
}
</script>

<style lang="less" scoped>
.UploadBox {
  width: 160px;
  height: 160px;
  border: 1px dashed #cccccc;
  display: inline-block;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .ImageBox {
    width: 140px;
    height: 150px;
    border: 1px dashed #cccccc;
    position: relative;
    margin: 5px 10px;
    display: inline-block;
    &.selected {
      &::before {
        // .img-item.selected::before{} 加上selected class加遮罩层
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center / 50px 50px;
      }
    }
    img {
      width: 100%;
      height: 120px;
      object-fit: contain;
    }
    .fot {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      span {
        margin: 0 15px;
      }
      .red {
        color: red;
      }
    }
  }
}
</style>
