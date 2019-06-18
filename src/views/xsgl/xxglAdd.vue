<template>
    <div class="page page-xjgl">
        <el-container>
            <el-header>
            <div class="left backjt">学生</div>
            <div class="left colorhs">新 学生</div>
        </el-header>
        <el-main>
                <el-form :inline="true"  ref="form" :rules="rules" :model="form" class="demo-form-inline" label-position="top">
                    <el-form-item label="学号" prop="identity">
                        <el-input v-model="form.identity" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  prop="password">
                        <el-input v-model="form.password" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码"  prop="ddpassword">
                        <el-input v-model="form.ddpassword" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="学级"  prop="grade_id">
                       <el-select v-model="form.grade_id" placeholder="请输入学级">
                            <el-option  v-for="item in searchList.xj"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="科系"  prop="department_id">
                        <el-select v-model="form.department_id" placeholder="科系" @change="kxchange()">
                            <el-option  v-for="item in searchList.kx"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专业" prop="specialty_id">
                        <el-select v-model="form.specialty_id" placeholder="请选择专业" @change="bjList()">
                         <el-option  v-for="item in searchList.zy"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级" prop="team_id">
                     <el-select v-model="form.team_id" placeholder="请选择班级">
                       <el-option  v-for="item in searchList.bj"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="性别"  prop="sex">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出生日期" prop="birthday">
                       <el-date-picker
                            v-model="form.birthday"
                            type="date"
                            placeholder="出生日期">
                        </el-date-picker>
                    </el-form-item>
                     <el-form-item label="民族" >
                        <el-input v-model="form.nation" ></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" >
                        <el-input v-model="form.card"></el-input>
                    </el-form-item>
                    <el-form-item label="籍贯" >
                        <el-input v-model="form.origin" ></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" >
                        <el-input v-model="form.mobile" ></el-input>
                    </el-form-item>
                    <el-form-item label="家长姓名" >
                        <el-input v-model="form.xh" ></el-input>
                    </el-form-item>
                    <el-form-item label="家长电话" >
                        <el-input v-model="form.parent" ></el-input>
                    </el-form-item>
                    <el-form-item label="家庭住址" style="width:100%;">
                        <el-input v-model="form.address" ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="上传头像" style="width:100%;">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">新增</el-button>
                    </el-form-item>
                </el-form>
        </el-main>
        </el-container>
       
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import {dicGrade,dicDepartment,dicSpecialty,dicTeam,dicRole,stuList} from '@/api';
import { jquery } from '@/script/jquery-1.7.1';
    export default {
        data(){
             var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.form.ddpassword !== '') {
                    this.$refs.form.validateField('ddpassword');
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
                 searchList:{
                    xj:[],
                    kx:[],
                    zy:[],
                    bj:[],
            },
                form:{
                    name:'',
                    identity:'',
                    sex:'',
                    birthday:'',
                    nation:'',
                    card:'',
                    origin:'',
                    mobile:'',
                    grade_id:'',
                    department_id:'',
                    specialty_id:'',
                    team_id:'',
                    parent:'',
                    parentmobile:'',
                    address:'',
                    password:'',
                    ddpassword:'',
                },
                rules:{
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    identity: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                    ],
                    password: [
                        { required:true,validator: validatePass, trigger: 'blur',message: '请输入密码' }
                    ],
                    ddpassword: [
                        { required:true,validator: validatePass2, trigger: 'blur',message: '请再次输入密码' }
                    ],
                    grade_id: [
                        { required: true, message: '请选择学级', trigger: 'change',type: 'number' },
                    ],
                    department_id: [
                        { required: true, message: '请输入科系', trigger: 'change',type: 'number' },
                    ],
                    specialty_id: [
                        { required: true, message: '请选择专业',trigger: 'change',type: 'number' },
                    ],
                    team_id: [
                        { required: true, message: '请输入班级', trigger: 'change',type: 'number'},
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' },
                    ],
                    birthday: [
                        { required: true, type: 'date',message: '请选择出生日期', trigger: 'blur' },
                    ],
                },
                imageUrl:''
            }
        },
        methods:{
            addXj(){

            },
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log(this.form)
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            deleteEvent(){

            },
            kxchange(){
                this.zyList();
            },
            // 学级
            async xjList(){
                var params = {};
                var res =  await dicGrade(params);
                // console.log(res);
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
            // 选择专业
            async zyList(){
                var params = {id:this.form.department_id};
                var res =  await dicSpecialty(params);
                // console.log(res)
                if(res.code==200){
                    this.searchList.zy = res.data;
                }else{
                    this.$message(res.message);  
                }
            },
            // 选择班级
            async bjList(){
                var params = {
                    grade_id:this.form.grade_id,
                    specialty_id:this.form.specialty_id

                };
                var res =  await dicTeam(params);
                if(res.code==200){
                    this.searchList.bj = res.data;
                }else{
                    this.$message(res.message);  
                }

            },
        },
          mounted() {
            this.xjList();
            this.kxList();
        },
      
    }
</script>
<style lang="stylus" scoped>
    .page-xjgl{
        .el-header{
            background-color:#D0D9DD;
            padding:0px;
            line-height:60px;
           
            >div{
                width:120px;
                font-size:16px;
            }
            .backjt{
                background-image:url('../../image/jt.png');
                background-size:100% 100%;
                 color:#fff;
            }
        }
        .el-main{
            .el-form{
                .el-form-item{
                    width:48%;
                    text-align:left;
                     .el-select{
                        width:100%; 
                    }
                    .avatar-uploader{
                         
                        .el-upload{
                            border: 1px dashed #d9d9d9;
                            border-radius: 6px;
                            cursor: pointer;
                            position: relative;
                            overflow: hidden; 
                        }
                       
                    }
                    .avatar {
                            width: 178px;
                            height: 178px;
                            display: block;
                    }
                }
               
            }
        }
       
        
    }
    
</style>