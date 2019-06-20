<template>
    <div class="page page-bjgl">
        <el-container>
              <el-main>
                  <div class="selectButton over" >
                      <div class="left kx-title" >科系:</div> 
                      <div class="left" >
                            <el-button  v-bind:class="{active:showBack == '全部'}" @click="kxClick('','全部')">全部</el-button>
                            <el-button v-for="(item,index) in searchList.kx" :key="index" :bh="item.code"  v-bind:class="{active:showBack == item.name}" @click="kxClick(item.code,item.name)">{{item.name}}</el-button>
                      </div>
                  </div>
                  <div class="selectButton over" >
                      <div class="left kx-title" >学级:</div> 
                      <div class="left clickEvent">
                            <el-button  v-bind:class="{active:showBack2 == '全部'}" @click="njClick('','全部')">全部</el-button>
                            <el-button v-for="(item,index) in searchList.xj" :key="index" :bh="item.code"  v-bind:class="{active:showBack2 == item.name}" @click="njClick(item.code,item.name)">{{item.name}}</el-button>
                      </div>
                  </div>
                    <div>
                        <div class="over width100 zynr">
                            <div class="xi-contain">
                                <div v-for="(item,index) in list" :key="index">
                                    <div class="main-title border-bottom">{{item.mainMenu.department}}</div>
                                    <div v-for="(son,index2) in item.sonMenu" :key="index2">
                                        <div class="main-title">{{son.mainMenu.specialty}}</div>
                                        <ul class="bzuren">
                                            <li v-for="(sun,index3) in son.sonMenu" :key="index3">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td class="width200">{{sun.mainMenu.grade}}</td>
                                                            <td>
                                                                <div class="selectbox left" v-for="(zsun,index4) in sun.sonMenu" :key="index4">
                                                                    <el-form :inline="true" v-bind:class="{activeborder:dianji !== zsun.team_id}">
                                                                        <el-input v-model="zsun.name" class="nianjixz left" :disabled="dianji !== zsun.team_id"></el-input>
                                                                            <el-select v-model="zsun.teacher_id"  class="nianjixz left mingcheng" :disabled="dianji !== zsun.team_id">
                                                                                <el-option  v-for="item in searchList.laoshi"
                                                                                :key="item.code"
                                                                                :label="item.name"
                                                                                :value="item.code">
                                                                            </el-option>
                                                                        </el-select>
                                                                        <div class="clear"></div>
                                                                    </el-form>
                                                                    <div class="set" v-show="dianji !== zsun.team_id">
                                                                        <i class="iconfont icon-set1" @click.stop="setBj(zsun.grade_id,zsun.specialty_id,zsun.teacher_id,zsun.department_id,zsun.team_id,zsun.name)"></i>
                                                                        <i class="iconfont icon-shanchu" @click="deleteset(zsun.team_id)"></i>
                                                                    </div>
                                                                    <div class="set"  v-show="dianji == zsun.team_id">
                                                                        <i class="iconfont" @click.stop="setBjCg(zsun.grade_id,zsun.specialty_id,zsun.teacher_id,zsun.department_id,zsun.team_id,zsun.name)">√</i>
                                                                        <i class="iconfont" @click="dianji=''">〈</i>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </td>
                                                            <td class="width200">
                                                                <el-button class="buttonback" @click="addFunction(item.mainMenu.id,son.mainMenu.id,sun.mainMenu.id)"><i class="iconfont icon-jiashang" ></i>增加</el-button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                    
                            </div>
                           
                        </div>
                    </div>
                    <el-dialog
                        title=""
                        :visible.sync="dialogVisible"
                        width="30%" class="align-left">
                        <el-form label-position="top" :model="edit" :rules="rules" ref="addForm" class="selectBottom">
                            <el-form-item label="班级名" prop="name">
                                <el-input v-model="addForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="老师" prop="teacher_id">
                            <el-select v-model="addForm.teacher_id">
                                    <el-option  v-for="item in searchList.laoshi"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                            </el-form-item>
                            
                        </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
                            <el-button type="primary" @click="submitForm('addForm')">保存</el-button>
                        </span>
                 </el-dialog>
                    <el-dialog
                        title="删除"
                        :visible.sync="dialogVisible2"
                        width="30%">
                        <span>您确定删除</span>
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
  import {dicGrade,dicDepartment,teamList,usersList,dicTeam,editTeam,delTeam,addTeam} from '@/api';
  import { jquery } from '@/script/jquery-1.7.1';
    export default {
        data(){
            return{
                dialogVisible:false,
                dialogVisible2:false,
                dialogVisible3:false,
                active:'',
                xh:0,
                key:0,
                value:'16-17',
                label:'',
                showBack:'全部',
                showBack2:'全部',
                disabled:true,
                searchList:{
                    xj:[],
                    kx:'',
                    zy:'',
                    bj:'',
                    laoshi:'',
                },
                specialty_id:'',
                kxCode:'',
                njCode:'',
                kxName:'',
                njName:'',
                borderSty:true,
                list:'',
                disabled:true,
                edit:{
                    team_id:'',
                    teacher_id:'',
                    id:'',
                    name:'',
                },
                dianji:'',
                addForm:{
                    department_id:'',
                    specialty_id:'',
                    grade_id:'',
                    name:'',
                    teacher_id:'',
                },
                deleteId:'',
                 rules:{
                    //  name:[
                    //     { required: true, message: '请输入班级名称', trigger: 'blur',type :"string"  }
                    // ],
                    // teacher_id:[
                    //     { required: true, message: '请选择老师', trigger: 'change',type :"string" }
                    // ],   
                    },
                }
            },
      
        methods:{
            deleteset(id){
               this.deleteId =  id;
                this.dialogVisible2 = true;  
            },
            // 班级列表
            async deleteEvent(){
                var params = {
                    id:this.deleteId
                   
                };
                var res =  await delTeam(params);
                if(res.code==200){
                    this.dialogVisible2 = false;
                    this.$message(res.message);  
                    this.bjList();
                    
                }else{
                this.$message(res.message);  
                }
            },
              
            kxClick(code,name){
                this.showBack = name;
                this.kxCode = code;
                this.kxName = name;
                this.bjList();
            },
            njClick(code,name){
                this.showBack2 = name;
                this.njCode = code;
                this.njName = name
                this.bjList();
            },
            qbClick(){
                this.showBack = 'qb';
            },
            inputFocus(){
                $(this).addClass('addborder');
            },
            // 设置
            setBj(grade_id,specialty_id,teacher_id,department_id,team_id,name){
                this.edit.team_id = team_id;
                this.specialty_id = specialty_id;
                this.dianji = team_id;
                this.bjoption();

            },
            setBjCg(grade_id,specialty_id,teacher_id,department_id,team_id,name){
                 this.edit.name = name;
                 this.edit.teacher_id = teacher_id;
                 this.editList();
            },
            // 班级列表
            async bjList(){
                var params = {
                    specialty_parent_id:this.kxCode,
                    grade_id:this.njCode,
                    department:this.kxName,
                    grade_name:this.njName       
                };
                var res =  await teamList(params);
                console.log(res)
                if(res.code==200){
                    this.list = res.data;
                    
                }else{
                this.$message(res.message);  
                }
            },
            // 修改
            async editList(){
                var params = {
                    id:this.edit.team_id,
                    name:this.edit.name,
                    teacher_id:this.edit.teacher_id,
                    
                };
                var res =  await editTeam(params);
                console.log(res)
                if(res.code==200){
                    this.dianji='';
                    this.$message(res.message); 
                }else{
                this.$message(res.message);  
                }
            },
            addFunction(department_id,specialty_id,grade_id){
                this.addForm.department_id = department_id;
                this.addForm.specialty_id = specialty_id;
                this.addForm.grade_id = grade_id;
                this.dialogVisible = true;

            },
            submitForm(formName){
                    this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.addForm.name);
                         console.log(this.addForm.teacher_id);
                        this.addList()
                    } else {
                        console.log(this.addForm.name);
                        console.log(this.addForm.teacher_id);
                        return false;
                    }
                });
            },
            // 增加
            async addList(){
                var params = {
                    department_id:this.addForm.department_id,
                    specialty_id:this.addForm.specialty_id,
                    grade_id:this.addForm.grade_id,
                    name:this.addForm.name,
                    teacher_id:this.addForm.teacher_id
                };
                var res =  await addTeam(params);
                console.log(res)
                if(res.code==200){
                    this.dialogVisible = false;
                    this.$message(res.message); 
                    this.bjList();
                }else{
                this.$message(res.message);  
                }
            },
            // 学级
            async xjList(){
                var params = {};
                var res =  await dicGrade(params);
                console.log(res);
                if(res.code==200){
                    this.searchList.xj = res.data;
                }else{
                     this.$message(res.message);  
                }
            },
            // 选择科系
            async kxList(){
                var params = {};
                var res =  await dicDepartment(params);
                // console.log(res)
                if(res.code==200){
                    this.searchList.kx = res.data;
                }else{
                this.$message(res.message);  
                }
            },
            // 选择老师
            async lsList(){
                var params = {};
                var res =  await usersList(params);
                console.log(res)
                if(res.code==200){
                    this.searchList.laoshi = res.data;
                }else{
                this.$message(res.message);  
                }
            },
             // 选择班级
            async bjoption(id){
                var params = {
                    grade_id:this.njCode,
                    specialty_id:this.specialty_id
                };
                var res =  await dicTeam(params);
                console.log(res)
                if(res.code==200){
                     this.searchList.bj = res.data;
                }else{
                    this.$message(res.message);  
                }
            },
        },
        mounted(){
            this.kxList();
            this.xjList();
            this.lsList();
            // this.bjoption();
            this.bjList();
        }
    }
</script>
<style lang="stylus" scoped>
    .page-bjgl{

        .el-main{
            padding:20px 0px;
            .iconfont {
                display:inline-block;
                font-size:14px;
                padding-right:20px;
            }
            .selectButton{
                padding-left:20px;
                .kx-title{
                    padding:10px 5px;
                }
                .el-button{
                    background-color:#BCC3C7;
                    color:#fff;
                    padding:10px 5px;
                }
                .active{
                    background-color:#E67E22;
                    color:#fff
                }
               
            }
             .zynr{
                 padding:20px;
                 .xi-contain{
                     >div{
                         width:100%;
                         text-align:left;
                         .main-title{
                             line-height:40px;
                            
                         }
                         .border-bottom{
                             border-bottom:1px solid #999
                                 
                        }
                        .bzuren{
                            width:100%;
                            >li{
                                width:100%;
                                background-color:#F5F5F5;
                                padding:10px 20px;
                                margin-bottom:10px;
                                table{
                                    width:100%;
                                    .width200{
                                        width:200px;
                                    }
                                    .selectbox{
                                        width:250px;
                                        margin-left:10px;
                                        border:1px solid #999;
                                        height:100%;
                                        position:relative;
                                        .el-form{
                                            width:calc(100% - 50px);
                                            height:70px;
                                        }
                                        .el-input{
                                            width:40%;
                                            height:40px;
                                        }
                                        .el-select{
                                            width:calc(60%);
                                            height:40px;
                                            i{
                                                display:none;
                                            }
                                        }
                                        .set{
                                            position:absolute;
                                            right:5px;
                                            top:5px;
                                            width:30px;
                                            .el-input{
                                                width:30px;
                                            }
                                            .el-select{
                                                width:100px;
                                            }
                                            .iconfont{
                                                font-size:20px;
                                            }
                                        }
                                    }
                                    
                                }
                            }
                        }
                     }
                 }

            }
        }    
    }
    
</style>