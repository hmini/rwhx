<template>
    <div class="page page-kxgl">
        <el-header>
            <div class="left backjt">学院管理</div>
            <div class="left">科系</div>
        </el-header>
        <el-main>
            <div>
                <div class="width100 align-left" >
                    <el-button type="primary" @click="dialogVisible = true"><i class="iconfont icon-jiashang"></i>增加科系</el-button>
                </div>
                <div class="width100 zynr">
                   <table class="width100">
                      <tbody v-for="(item,index) in list.kx" :key="index">
                          <tr class="">
                              <td :rowspan="item.sonMenu.length+1">{{item.mainMenu.department}}</td>
                          </tr>
                          <tr class="border-bottom" v-for="(item2,index2) in item.sonMenu" :key="index2">
                              <td>{{item2.specialty}}</td>
                              <td>
                                  <!-- <el-button class="buttonback" @click="dialogVisible = true">编辑</el-button>
                                  <el-button class="buttonback" @click="dialogVisible2 = true">删除</el-button> -->
                                  <el-button class="buttonback" @click="zybj(item2.id,item2.specialty)">编辑</el-button>
                                  <el-button class="buttonback" @click="dialogVisible2 = true">删除</el-button>
                              </td>·
                          </tr>
                    </tbody>
                          <!-- <tr class="border-bottom">
                              <td>11</td>
                              <td>
                                  <el-button class="buttonback">编辑</el-button>
                                  <el-button class="buttonback">删除</el-button>
                              </td>
                          </tr> -->
                          <!-- <tr class="">
                              <td :rowspan="item">111</td>
                          </tr>
                          <tr class="border-bottom">
                              <td>11</td>
                              <td>
                                  <el-button class="buttonback">编辑</el-button>
                                  <el-button class="buttonback">删除</el-button>
                              </td>
                          </tr>
                          <tr class="border-bottom">
                              <td>11</td>
                              <td>
                                  <el-button class="buttonback">编辑</el-button>
                                  <el-button class="buttonback">删除</el-button>
                              </td>
                          </tr>
                          <tr class="border-bottom">
                              <td>11</td>
                              <td>
                                  <el-button class="buttonback">编辑</el-button>
                                  <el-button class="buttonback">删除</el-button>
                              </td>
                          </tr> -->
                      <!-- </tbody> -->
                   </table>
                   
                    
                </div>
            </div>
            <el-dialog
                title="学级"
                :visible.sync="dialogVisible"
                width="30%" class="align-left">
                <div>   
                    <el-form>
                        <!-- <el-form-item label="专业名称">
                            <el-select v-model="form.zy" >
                                    <el-option label="shneme"  value="0"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item label="专业名称">
                               <el-input></el-input> 
                        </el-form-item>
                    </el-form>
                   
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addXj()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="删除"
                :visible.sync="dialogVisible2"
                width="30%">
                <span>您确定要删除这个年级</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="deleteEvent()">确 定</el-button>
                </span>
            </el-dialog> 
        </el-main>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import {specialtyList} from '@/api';
    import { jquery } from '@/script/jquery-1.7.1';
    export default {
        data(){
            return{
                dialogVisible:false,
                dialogVisible2:false,
                item:4,
                list:{
                    kx:'',
                    kxSonList:'',
                },
                form:{
                    kx:'',
                    zy:
                }
            }
        },
        methods:{
            addXj(){
            },
            deleteEvent(){

            },
            //初始化科系列表
            initKxList(){
                this.init_KxList();
            },
            //编辑点击事件
            zybj(id,specialty){
                this.dialogVisible= true;
            },
            async init_KxList(){
                var params = {};
                var res =  await specialtyList(params);
                if(res.code ==200){
                    this.list.kx = res.data;
                    console.log(this.list.kx);
                }
            },
        },
        mounted(){
            this.initKxList();
        }
    }
</script>
<style lang="stylus" scoped>
    .page-kxgl{
        .el-header{
            background-color:#D0D9DD;
            color:#fff;
            padding:0px;
            line-height:60px;
            >div{
                width:120px;
                font-size:16px;
            }
            .backjt{
                background-image:url('../../image/jt.png');
                background-size:100% 100%;
            }
        }
        .el-main{
            padding:20px 20px;
            .iconfont {
                display:inline-block;
                font-size:14px;
                padding-right:20px;
            }
             .zynr{
                    background-color:#fff;
                    border:1px solid #dedede;
                    border-radius:10px;
                    margin-top:20px;
                    table{
                        td{
                                line-height:60px;
                                border-bottom:1px solid #dcdcdc;
                            }
                        .border-bottom{
                            
                        }
                    }
            }
            
        }
       
        
    }
    
</style>