<template>
    <div class="page page-xjgl">
        <el-container>
            <el-header>
                <div class="left backjt">管理员</div>
                <div class="left">管理角色</div>
            </el-header>
             <el-main>
                    <div>
                        <div class="width100 align-left padding-left-20" >
                            <!-- <el-button type="primary" @click="dialogVisible = true"><i class="iconfont icon-jiashang"></i>返回管理员列表</el-button> -->
                            <!-- <el-button  @click="dialogVisible = true"><i class="iconfont icon-shanchu"></i>新建角色</el-button> -->
                        </div>
                        <div class="over width100 zynr">
                            <el-table  ref="multipleTable"
                                    :data="tableData"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange"
                                    :row-class-name="tableRowClassName"
                                    :default-sort = "{prop: 'lastLogin', order: 'descending'}">
                                <el-table-column
                                    label="姓名"
                                    prop="name" 
                                    sortable
                                    align="center"
                                    width="200">
                                </el-table-column>
                                 <el-table-column
                                    label="角色功能描述"
                                     sortable
                                     sort-by="{prop: 'login', order: 'descending'}"
                                    prop="description" align="center">
                                </el-table-column>
                                 <el-table-column
                                    label="用户数"
                                    prop="id" 
                                    align="center"
                                    width="200">
                                </el-table-column>
                            </el-table>
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
import {roleList,existUser,addUsers,dicRole} from '@/api';
import { jquery } from '@/script/jquery-1.7.1';
    export default {
        data(){
            return{
                dialogVisible:false,
                dialogVisible2:false,
                tableData:[
                    {
                        name:'高静',
                        login:'1004',
                        js:'班主任',
                        lastLogin:'2018年3月5日下午1点40分'
                    },
                    {
                        name:'阿杰',
                        login:'1003',
                        js:'班主任',
                        lastLogin:'2018年3月5日下午1点40分'
                    },
                    {
                        name:'黄英',
                        login:'1005',
                        js:'班主任',
                        lastLogin:'2018年3月5日下午1点40分'
                    },
                    {
                        name:'李静',
                        login:'1004',
                        js:'班主任',
                        lastLogin:'2018年3月5日下午1点44分'
                    }
                ]
            }
        },
        methods:{
            addXj(){

            },
            deleteEvent(){

            },
            async list(){
                // this.form.date[1] =this.makeTime
                var params = {};
                console.log(params)
                var res = await roleList(params);
                if(res.code == 200){
                    console.log(res)
                    this.tableData = res.data;
                }else{
                    this.$message(res.message);
                }
            },
            handleSelectionChange(){

            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                return 'warning-row';
                } else if (rowIndex === 3) {
                return 'success-row';
                }
                return '';
            }
        },
        mounted(){
            this.list()
        }
    }
</script>
<style lang="stylus" scoped>
    .page-xjgl{
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
            padding:20px 0px;
            .iconfont {
                display:inline-block;
                font-size:14px;
                padding-right:20px;
            }
             .zynr{
                 width:100%;
                 padding:20px;
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