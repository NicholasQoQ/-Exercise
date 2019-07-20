<template>
  <div class="publish-container">
    <el-card class="box-card">
      <my-crumbs>发布文章</my-crumbs>
      <el-form ref="form" :model="getText" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="getText.title" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <quill-editor v-model="getText.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-radio-group v-model="getText.cover.type">
            <el-radio :label="1">1张</el-radio>
            <el-radio :label="3">3张</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div v-if="getText.cover.type==1">
            <my-upload v-model="getText.cover.images[0]"></my-upload>
          </div>
          <div v-if="getText.cover.type==3">
            <my-upload v-model="getText.cover.images[0]"></my-upload>
            <my-upload v-model="getText.cover.images[1]"></my-upload>
            <my-upload v-model="getText.cover.images[2]"></my-upload>
          </div>
        </el-form-item>

        <el-form-item label="活动名称">
          <my-channel v-model="getText.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="Issus(false)">发布</el-button>
          <el-button @click="Issus(true)">草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  data () {
    return {
      getText: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      },
      // 判断是否是修改
      editId: null
    }
  },
  created () {
    this.editId = this.$route.query.id
    if (this.editId) {
      this.getEdit()
    }
  },
  watch: {
    $route () {
      if (this.editId) {
        this.getText = {
          title: '',
          content: '',
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  methods: {
    getEdit () {
      this.axios.get(`articles/${this.editId}`).then(res => {
        this.getText = res.data.data
      })
    },
    Issus (draft) {
      this.axios.post(`articles?draft=${draft}`, this.getText).then(res => {
        this.$router.push('/articles')
      })
    }
  },
  components: {
    quillEditor
  }
}
</script>
<style lang="less" scoped>
</style>
