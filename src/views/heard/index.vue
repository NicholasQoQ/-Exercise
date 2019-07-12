<template>
    <div class="heard-container">
        <el-container style="width: 100%;height:100%">
            <el-aside height="100%" class="my-aside" :width="isCllapse?'260px':'60px'" >
                <div class="loge"></div>
                <el-menu :collapse="!isCllapse" :collapse-transition=false style="border-right:none" default-active="1" class="el-menu-vertical-demo"  background-color="#002033" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-setting"></i>
                        <span slot="title">内容管理</span>
                    </el-menu-item>
                     <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">素材管理</span>
                    </el-menu-item>
                     <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">发布文章</span>
                    </el-menu-item>
                     <el-menu-item index="5">
                        <i class="el-icon-setting"></i>
                        <span slot="title">评论管理</span>
                    </el-menu-item>
                     <el-menu-item index="6">
                        <i class="el-icon-setting"></i>
                        <span slot="title">粉丝管理</span>
                    </el-menu-item>
                     <el-menu-item index="7">
                        <i class="el-icon-setting"></i>
                        <span slot="title">个人设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
        <el-container>
            <el-header class="header">
                <span class="el-icon-s-fold" @click="toggleMenu()"></span>
                <span class="txt-header">江苏传智播客科技教育有限公司</span>
                <el-dropdown style="float: right">
                <img style="vertical-align:middle" width="30" height="30" src="../../assets/images/avatar.jpg" alt />
                <span class="el-dropdown-link">
                    <b style="vertical-align:middle;padding-left:5px">黑马小哥</b>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人设置</el-dropdown-item>
                    <el-dropdown-item>个人推出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>

            </el-header>
            <el-main>Main</el-main>
        </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isCllapse: true
    }
  },
  methods: {
    toggleMenu () {
      this.isCllapse = !this.isCllapse
    }

  }
}
</script>

<style lang="less">
.heard-container{
    width: 100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    .my-aside{
        background: #002033;
    }
    .loge{
        width: 100%;
        height: 60px;
        background: #024 url(../../assets/images/logo_admin.png) no-repeat center /
        140px auto;
    }
    .header{
        line-height:60px ;
        border-bottom: 1px solid #ddd;
        .el-icon-s-fold{
            font-size: 25px;
            padding-right:10px;
            vertical-align: middle;
        }
        .txt-header{
            vertical-align: middle;
        }
    }
}

</style>
