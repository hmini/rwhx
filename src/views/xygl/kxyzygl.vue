<template>
    <div class="page page-kxgl">
        <el-header>
            <div class="left backjt">学院管理</div>
            <div class="left">科系</div>
        </el-header>
        <el-main>
            <div>
                <!-- <div class="width100 align-left" >
                    <el-button type="primary" @click="add_model = true"><i class="iconfont icon-jiashang"></i>增加科系</el-button>
                </div> -->
                <div class="width100 zynr">
                   <table class="width100">
                      <tbody v-for="(item,index) in list.kx" :key="index">
                          <tr class="">
                              <td :rowspan="item.sonMenu.length+1">{{item.mainMenu.department}}</td>
                          </tr>
                          <tr class="border-bottom" v-for="(item2,index2) in item.sonMenu" :key="index2">
                              <td>{{item2.specialty}}</td>
                              <td>
                                  <el-button class="buttonback" @click="zybj(item2.id,item2.specialty)">编辑</el-button>
                                  <el-button class="buttonback" @click="zydel(item2.id)">删除</el-button>
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
                title="编辑专业"
                :visible.sync="bj_model"
                width="30%" class="align-left">
                <div>   
                    <el-form>
                        <el-form-item label="专业名称">
                               <el-input v-model="form.bjzy"></el-input> 
                        </el-form-item>
                    </el-form>
                   
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="bj_model = false">取 消</el-button>
                    <el-button type="primary" @click="editZy()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="增加专业"
                :visible.sync="add_model"
                width="30%" class="align-left">
                <div>   
                    <el-form>
                        <el-form-item label="专业名称">
                               <el-input v-model="form.zy"></el-input> 
                        </el-form-item>
                    </el-form>
                   
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="add_model = false">取 消</el-button>
                    <el-button type="primary" @click="addZy()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="删除"
                :visible.sync="del_model"
                width="30%">
                <span>您确定要删除这个年级</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="del_model = false">取 消</el-button>
                    <el-button type="primary" @click="deleteEvent()">确 定</el-button>
                </span>
            </el-dialog> 
        </el-main>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import {specialtyList,editSpecialty,addSpecialty,delSpecialty} from '@/api';
    import { jquery } from '@/script/jquery-1.7.1';
    export default {
        data(){
            return{
                bj_model:false,
                add_model:false,
                del_model:false,
                item:4,
                list:{
                    kx:'',
                    kxSonList:'',
                },
                form:{
                    kx:'',
                    zy:'',
                    bjzy:'',
                },
                change:{
                    bjid:'',
                    id:'',
                    delid:'',
                },
            }
        },
        methods:{
            addZy(){
                this.add_Specialty();
            },
            editZy(){
                this.edit_Specialty();
            },
            deleteEvent(){
                this.del_Specialty();
            },
            //初始化科系列表
            initKxList(){
                this.init_KxList();
            },
            //编辑专业点击事件
            zybj(id,specialty){
                this.bj_model= true;
                this.form.bjzy = specialty;
                this.change.bjid = id;
            },
            //编辑专业点击事件
            zydel(id){
                this.del_model= true;
                this.change.delid = id;
            },
            async init_KxList(){
                var params = {};
                var res =  await specialtyList(params);
                if(res.code ==200){
                    this.list.kx = res.data;
                    console.log(this.list.kx);
                }
            },
            async edit_Specialty(){
                var params = {specialty:this.form.bjzy,
                                id:this.change.bjid
                            };
                var res =  await editSpecialty(params);
                if(res.code ==200){
                    this.init_KxList();
                    this.bj_model= false;
                }
                this.$message(res.message);
            },
            async add_Specialty(){
                var params = {specialty:this.form.zy
                            };
                var res =  await addSpecialty(params);
                if(res.code ==200){
                    this.init_KxList();
                    this.add_model= false;
                }
                this.$message(res.message);
            },
            async del_Specialty(){
                var params = {id:this.change.delid
                            };
                var res =  await delSpecialty(params);
                if(res.code ==200){
                    this.init_KxList();
                }
                this.del_model= false;
                this.$message(res.message);
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