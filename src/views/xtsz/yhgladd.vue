<template>
    <div class="page page-xjgl">
        <el-container>
            <el-header>
                <div class="left backjt">管理员</div>
                <div class="left">新管理员</div>
            </el-header>
            <el-main>
                <div class="left ztnr">
                    <div class="width100 align-left padding-left-20 line">
                        <div class="left lineone"></div>
                        <div class="left linetwo">
                            账号
                        </div>
                        <div class="left linethree"></div>
                    </div>
                    <div class="over width100 zynr align-left">
                    <el-form :inline="true" :model="form" class="demo-form-inline" label-position="top" ref="form" :rules="rules">
                        <el-form-item label="账号" prop="login">
                            <el-input v-model="form.login" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="姓名"  prop="first_name">
                            <el-input v-model="form.first_name" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="form.password" placeholder="" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input v-model="form.checkPass" placeholder="" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="role_id">
                            <p>角色</p>
                            <span class="fu-title">为当前管理员创建角色</span>
                            <el-radio-group v-model="form.role_id">
                                <p v-for="item in jsList" :key="item.code">
                                    <el-radio :label="item.name"  :value="item.code"></el-radio>
                                </p>
                                
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item style="width:100%">
                                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                                <el-button>取消</el-button>
                        </el-form-item>
                        
                    </el-form>
                        
                    </div>
                </div>
                <div class="left upload">
                    <p class="align-left">上传头像</p>
                        <el-upload
                            action="aaa"
                            ::limit="1"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :before-upload="beforeupload">
                            <i class="iconfont icon-shangchuan"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                </div>
              
            </el-main>
        </el-container>
       
    </div>
</template>
<script>
    import { mapMutations } from 'vuex';
    import {addUsers,dicRole} from '@/api';
    import { jquery } from '@/script/jquery-1.7.1';
    export default {
        data(){
             var validatePass = (rule, value, callback) => {
                        if (value === '') {
                        callback(new Error('请输入密码'));
                        } else {
                        if (this.form.checkPass !== '') {
                            this.$refs.form.validateField('checkPass');
                        }
                        callback();
                        }
                    };
                    var validatePass2 = (rule, value, callback) => {
                        if (value === '') {
                        callback(new Error('请再次输入密码'));
                        } else if (value !== this.form.password) {
                        callback(new Error('两次输入密码不一致!'));
                        } else {
                        callback();
                        }
                    };
            return{
               
                dialogVisible:false,
                dialogVisible2:false,
                dialogImageUrl: '',
                dialogVisible: false,
                dialogImageUrl:'',
                form:{
                    fileName:'',
                    first_name:'', 
                    password:'',
                    role_id:'',    
                    login:'',
                    checkPass:'',

                },
                rules:{
                    login:[
                       { required: true, message: '请输入账号名称', trigger: 'blur' }
                    ],
                    first_name:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    role_id:[
                         { required: true, message:'请选择角色类型', trigger: 'change' },  
                    ],
                    password:[
                        {
                           validator:validatePass, trigger: 'blur' 
                        }
                        
                    ],
                    fileName:[
                        { required: true, message: '请上传图片' }
                    ],
                  
                    checkPass:[
                        { validator: validatePass2, trigger: 'blur' }
                    ]

                },
                jsList:''
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeupload (file) {
                this.form.fileName = file;
                return false

            },
            addXj(){

            },
            deleteEvent(){

            },
            onSubmit(formName){
                 this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addyh();
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
        });
            },
            async addyh(){
                var params = {
                    first_name:this.form.first_name,
                    login:this.form.login,
                    password:this.form.password,
                    role_id:this.form.role_id,
                    fileName:this.form.fileName,
                };
                var res = await addUsers(params);
                if(res.code == 200){
                    console.log(res)
                    this.jsList= res.data;
                }else{
                    this.$message(res.message);
                }
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
            this.role()
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
            padding:0px 0px;
            .iconfont {
                display:inline-block;
                font-size:14px;
                padding-right:20px;
            }
            .line{
                 padding-top:20px;
                .lineone{
                    height:36px;
                    width:80px;
                   
                    border-bottom:2px solid #D0D0D0;
                }
                .linetwo{
                    width:80px;
                    height:36px;
                    text-align:center;
                    line-height:40px;
                    background-image:url('../../image/line.png');
                    background-size:100% 100%;
                }
                .linethree{
                    width:calc(100% - 160px);
                    height:36px;
                     border-bottom:2px solid #D0D0D0;
                     margin-left:-3px;

                }
            }
            .ztnr{
                width:calc(100% - 300px);
                height:100%;
                .zynr{
                     padding:20px;
                     .el-form-item{
                         width:45%;
                         padding:0px 20px;
                         .el-radio-group{
                             width:100%;
                             line-height:40px;
                             .el-radio{
                                 
                             }

                         }
                        p{
                            padding:0px;
                            line-height:26px
                        }
                        .fu-title{
                            color:#8C8B8A;
                        }
                     }
                }
               
            }
             .upload{
                    width:300px;
                    height:100%;
                    background-color:#ECF0F1;
                    padding:20px;
                    p{
                        padding:20px 0px;
                    }
                    .el-upload{
                        width:100%;
                        .iconfont{
                            font-size:80px;
                        }
                    }
                }
             
        }
       
        
    }
    
</style>