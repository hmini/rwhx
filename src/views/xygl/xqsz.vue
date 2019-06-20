<template>
    <div class="page page-xjgl">
        <el-header>
            <div class="left backjt">学院管理</div>
            <div class="left">学期设置</div>
        </el-header>
        <el-main>
            <div>
                <div class="width100 align-left padding-left-20" >
                    <el-button type="primary" @click="add_model = true"><i class="iconfont icon-jiashang"></i>增加</el-button>
                </div>
                <div class="over width100 zynr">
                    <div class="nj-content" v-for="(item,index) in list.xq" :key="index">
                        <div class="left">{{item.term}}</div>
                        <div class="right">
                            <el-button class="buttonback" @click="bjClick(item.id,item.term)"><i class="iconfont icon-jiashang"></i>编辑</el-button>
                            <el-button @click="del(item.id)" class="buttonback"><i class="iconfont icon-jiashang"></i>删除</el-button>
                        </div>
                    </div>
                    <!-- <div class="nj-content">
                        <div class="left">2018</div>
                        <div class="right">
                            <el-button class="buttonback"><i class="iconfont icon-jiashang"></i>编辑</el-button>
                            <el-button class="buttonback" @click="dialogVisible2 = true"><i class="iconfont icon-jiashang"></i>删除</el-button>
                        </div>
                    </div>
                    <div class="nj-content">
                        <div class="left">2018</div>
                        <div class="right">
                            <el-button class="buttonback"><i class="iconfont icon-jiashang"></i>编辑</el-button>
                            <el-button class="buttonback" @click="dialogVisible2 = true"><i class="iconfont icon-jiashang"></i>删除</el-button>
                        </div>
                    </div> -->
                    
                </div>
            </div>
            <el-dialog
                title="编辑学期"
                :visible.sync="bj_model"
                width="30%" class="align-left">
                <div>   
                    <el-input v-model="form.bjterm"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="bj_model = false">取 消</el-button>
                    <el-button type="primary" @click="bjxq_submit()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="添加学期"
                :visible.sync="add_model"
                width="30%" class="align-left">
                <div>   
                    <el-input v-model="form.term"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="bj_model = false">取 消</el-button>
                    <el-button type="primary" @click="addxq_submit()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="删除"
                :visible.sync="del_model"
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
    import {xytermList,editTerm,addTerm,delTerm} from '@/api';
    import { jquery } from '@/script/jquery-1.7.1';
    export default {
        data(){
            return{
                bj_model:false,
                add_model:false,
                del_model:false,
                list:{
                    xq:'',
                },
                form:{
                    bjterm:'',
                    bjid:'',
                    term:'',
                    delid:'',
                }
            }
        },
        methods:{
            addXj(){

            },
            deleteEvent(){
                this.del_Term();
            },
            //初始化学期
            init_xqList(){
                this.xy_termList();
            },
            //编辑点击事件
            bjClick(id,term){
                this.form.bjterm = term;
                this.form.bjid = id;
                this.bj_model = true;
            },
            //编辑框点击确定事件
            bjxq_submit(){
                this.edit_Term();
            },
            addxq_submit(){
                this.add_Term();
            },
            del(id){
                this.del_model = true;
                this.form.delid=id;
            },
            //学期
            async xy_termList(){
                var params = {};
                var res =  await xytermList(params);
                if(res.code ==200){
                    this.list.xq = res.data;
                }
                console.log(res);
            }, 
            async edit_Term(){
                var params = {term:this.form.bjterm,
                              id:this.form.bjid};
                var res =  await editTerm(params);
                if(res.code ==200){
                    this.bj_model = false;
                    this.init_xqList();
                }
                this.$message(res.message);
            },
            async add_Term(){
                var params = {term:this.form.term};
                var res =  await addTerm(params);
                if(res.code ==200){
                    this.add_model = false;
                    this.init_xqList();
                }
                this.$message(res.message);
            },
            async del_Term(){
                var params = {id:this.form.delid};
                var res =  await delTerm(params);
                if(res.code ==200){
                    this.del_model = false;
                    this.init_xqList();
                }
                this.$message(res.message);
            },
        },
        mounted(){
            this.init_xqList();
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