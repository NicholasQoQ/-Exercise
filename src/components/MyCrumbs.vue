<template>
   <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:60px" >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'MyCrumbs'
}
</script>

<style>

</style>
