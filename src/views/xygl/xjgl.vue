<template>
    <div class="page page-xjgl">
        <el-header>
            <div class="left backjt">学院管理</div>
            <div class="left">学级管理</div>
        </el-header>
        <el-main>
            <div>
                <div class="width100 align-left padding-left-20" >
                    <el-button type="primary" @click="dialogVisible = true"><i class="iconfont icon-jiashang"></i>增加</el-button>
                </div>
                <div class="over width100 zynr">
                    <div class="nj-content" v-for="(item,index) in list.xj" :key="index">
                        <div class="left">{{item.grade}}</div>
                        <div class="right">
                            <el-button class="buttonback" @click="bjClick(item.id,item.grade)"><i class="iconfont icon-jiashang"></i>编辑</el-button>
                            <el-button @click="dialogVisible2 = true" class="buttonback"><i class="iconfont icon-jiashang"></i>删除</el-button>
                        </div>
                    </div>
                    <!-- <div class="nj-content">
                        <div class="left">2018</div>
                        <div class="right">
                            <el-button class="buttonback"><i class="iconfont icon-jiashang"></i>编辑</el-button>
                            <el-button class="buttonback" @click="dialogVisible2 = true"><i class="iconfont icon-jiashang"></i>删除</el-button>
                        </div>
                    </div> -->
                    <!-- <div class="nj-content">
                        <div class="left">2018</div>
                        <div class="right">
                            <el-button class="buttonback"><i class="iconfont icon-jiashang"></i>编辑</el-button>
                            <el-button class="buttonback" @click="dialogVisible2 = true"><i class="iconfont icon-jiashang"></i>删除</el-button>
                        </div>
                    </div> -->
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
             <el-dialog
                title="学级"
                :visible.sync="bjxj"
                width="30%" class="align-left">
                <div>   
                    <el-input v-model="form.bjxj"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="bjxj = false">取 消</el-button>
                    <el-button type="primary" @click="addXj()">确 定</el-button>
                </span>
            </el-dialog>
            


            
        </el-main>
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import {collegeGradeList} from '@/api';
    import { jquery } from '@/script/jquery-1.7.1';
    export default {
        data(){
            return{
                form:{
                    xj:'',
                    bjxj:'',
                },
                change:{
                    bjid:'',
                },
                dialogVisible:false,
                dialogVisible2:false,
                bjxj:false,
                list:{
                    xj:'',
                }
            }
        },
        methods:{
            addXj(){

            },
            deleteEvent(){

            },
            bjClick(id,grade){
                this.bjxj = true;
                this.form.bjxj = grade;
                this.change.bjid = id;
                // console.log("form.bjxj==="+this.form.bjxj);
                // console.log("change.bjid==="+this.change.bjid);
            },
            //初始化学级管理
            init_college_GradeList(){
                this.college_GradeList();
            },
            // 学级
            async college_GradeList(){
                var params = {};
                var res =  await collegeGradeList(params);
                if(res.code ==200){
                    this.list.xj = res.data;
                }
            },
        },
        mounted(){
            this.init_college_GradeList();
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
                .nj-content{
                    overflow:hidden;
                    padding:10px 20px;
                    line-height:40px;
                    button{
                        background-color:#EEEFF0;
                        color:#86939D;
                        
                    }
                }
                >div:nth-child(2n){
                    background-color:#ECF0F1;
                    
                }
            }
        }
       
        
    }
    
</style>