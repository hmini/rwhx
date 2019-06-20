<template>
    <div class="page page-xjgl">
        <el-container>
             <el-main>
                    <div>
                        <div class="width100 align-left padding-left-20" >
                            <router-link to='yhgladd'><el-button type="primary"><i class="iconfont icon-jiashang"></i>增加</el-button></router-link>
                            <el-button  @click="dialogVisible = true"><i class="iconfont icon-shanchu"></i>删除选择项</el-button>
                        </div>
                      
                        <div class="over width100 zynr">
                            <div>
                                <el-form :inline="true" class="align-left yhdl-elform">
                                    <el-form-item label="最后登陆" label-position="left"  class="zhdlTime">
                                         <!-- <el-date-picker
                                            v-model="form.date"
                                            align="right"
                                            type="date"
                                            placeholder="选择日期"
                                            value-format="yyyy-MM-dd"
                                            >
                                        </el-date-picker> -->
                                          <el-date-picker
                                                v-model="form.value"
                                                type="daterange"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                value-format="yyyy-MM-dd"
                                                @change="list()">
                                        </el-date-picker>
                                    </el-form-item>
                                     <el-form-item label="角色" class="jsWidth">
                                         <el-select v-model="form.role_id" placeholder="全部"  @change="list()">
                                                <el-option  v-for="item in jsList"
                                                    :key="item.code"
                                                    :label="item.name"
                                                    :value="item.code"
                                                    >
                                                </el-option>
                                            </el-select>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <el-table  ref="tableData"
                                    :data="tableData"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange"
                                    :row-class-name="tableRowClassName"
                                    v-loading="loading"
                                     :default-sort = "{prop: 'last_login', order: 'descending'}">
                                <el-table-column
                                type="selection"
                                    width="55" 
                                    sortable
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    label="姓名"
                                    prop="first_name" 
                                    sortable
                                    align="center">
                                </el-table-column>
                                 <el-table-column
                                    label="登录"
                                     sortable
                                     sort-by="{prop: 'login', order: 'descending'}"
                                    prop="role_id" align="center">
                                </el-table-column>
                                 <el-table-column
                                    label="角色"
                                    prop="rolename" 
                                    sort-by="{prop: 'login', order: 'descending'}"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    label="最后登录"
                                    sortable
                                    prop="last_login" align="center">
                                </el-table-column>
                            </el-table>
                            <div class="fenye over">
                                <div class="left padding-left-20">当前第{{this.page.currentPage}}页</div>
                                <el-pagination  small  layout="prev, pager, next" :total="page.total"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="page.currentPage">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <el-dialog
                        title="学级"
                        :visible.sync="dialogVisible"
                        width="30%" class="align-left">
                        <div>   
                            <el-input></el-input>
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
        </el-container>
       
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import {userList,existUser,addUsers,dicRole} from '@/api';
import { jquery } from '@/script/jquery-1.7.1';
    export default {
        data(){
            return{
                dialogVisible:false,
                dialogVisible2:false,
               loading:true,
                form:{
                    date:'',
                    role_id:'',
                    kssj:'',
                    jssj:'',
                },
                tableData:[],
                jsList:[],
                 page:{
                    pageSize:10,
                    pageNum:1,
                    total:0,
                    firstPage:1,
                    currentPage:1,
                
                }
            }
        },
        methods:{
            addXj(){

            },
            deleteEvent(){

            },
            
            handleSelectionChange(){

            },
            tableRowClassName({row, rowIndex}) {
                // if (rowIndex === 1) {
                // return 'warning-row';
                // } else if (rowIndex === 3) {
                // return 'success-row';
                // }
                return 'className';
            },
            makeTime(){
                var date = new Date();
                    var seperator1 = "-";
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    var strDate = date.getDate();
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    if (strDate >= 0 && strDate <= 9) {
                        strDate = "0" + strDate;
                    }
                    var currentdate = year + seperator1 + month + seperator1 + strDate;
                    return currentdate;
                   
            },
            // 表格list
            async list(){
                this.loading = true;
                var kssj='';
                var jssj="";
                if(this.form.date[0] == undefined){
                    kssj = ''
                }else{
                    kssj = this.form.date[0]
                }
                if(this.form.date[1] == undefined){
                    jssj = ''
                }else{
                    jssj = this.form.date[1]
                }
                var params = {
                    role_id:this.form.role_id,
                    kssj:kssj,
                    jssj:jssj,
                    pageNum:this.page.pageNum,
                    pageSize:10
                };
                var res = await userList(params);
                if(res.code == 200){
                    this.loading = false;
                     this.page.pageNum = res.data.pageNum;
                    this.page.pageSize = res.data.pageSize;
                    this.page.firstPage = res.data.firstPage;
                    this.page.total = res.data.total;
                    this.page.currentPage = res.data.pageNum;
                    this.tableData = res.data.list;
                }else{
                    this.loading = false
                    this.$message(res.message);
                }
            },
       
             handleCurrentChange(val) {
                this.page.pageNum = val;
                this.loading = true;
                this.list();
            },
            async role(){
                var params = {};
                var res = await dicRole(params);
                if(res.code == 200){
                    console.log(res)
                    this.jsList= res.data;
                }else{
                    this.$message(res.message);
                }
            },
        },
        mounted(){
            this.role();
            this.list();
        }
    }
</script>
<style lang="stylus" scoped>
    .page-xjgl{
        .el-main{
            padding:20px 0px;
            .iconfont {
                display:inline-block;
                font-size:14px;
                padding-right:20px;
            }
             .zynr{
                 width:100%;
                 padding:20px 0px;
                 .el-form{
                     background-color:#ECF0F1;
                     height:40px;
                     line-height:40px;
                     padding-left:20px;
                 }
               .el-tabel{
                   width:100%;
                     .warning-row {
                            background: oldlace;
                        }

                        .success-row {
                            background: #f0f9eb;
                        }
               } 
               
            }
        }
       
        
    }
    
</style>