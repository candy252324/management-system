<template>
  <div>
    <el-form :model="formData">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="formData.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级" :label-width="formLabelWidth" class="tree-ct">
        <el-input  v-model="formData.parentName"  @focus="showTree=true"></el-input>
        <transition name="el-zoom-in-top">
          <div class="tree" v-show="showTree">
            <el-tree
              :data="c_tree"
              default-expand-all
              :expand-on-click-node="false"
              node-key="id"
              ref="tree"
              :props="defaultProps"
              @node-click="getNodes">
            </el-tree>
          </div>
        </transition>
      </el-form-item>
      <el-form-item label="路径" :label-width="formLabelWidth">
        <el-input v-model="formData.route" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import * as util from '@/utils'
  import { getDetail} from '@/api/menu'

  export default{
    name:"DialogForm",
    props:["tree"],
    data(){
      return {
        showTree:false,
        nodeName:"",
        formData: {
          id:"",
          parentId:"",
          parentName:"",
          name: '',
          route:"",
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        formLabelWidth: '80px'
      }
    },
    computed:{
      c_tree(){
        var c_tree=[{}];
        c_tree[0].id=0;
        c_tree[0].name="根节点";
        c_tree[0].children=util.deepClone(this.tree);
        return c_tree;
      },
    },
    methods:{
      getNodes(data){
        this.formData.parentId=data.id.toString();
        this.formData.parentName=data.name;
        this.showTree=false;
      },
      getDetail(id){
        this.loading=true;
        getDetail({id:id}).then(res=>{
          this.formData=JSON.parse(res.data);
          this.loading=false;
        })
      },
      clearForm(){
        for(var key in this.formData){
          this.formData[key]="";
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .tree-ct{
    position: relative;
    .tree{
      position: absolute;
      left:0;
      top:45px;
      right:0;
      padding:10px;
      border:1px solid $g-border-color;
      border-radius: 3px;
      background: #fff;
      z-index:12;
    }
  }
</style>
