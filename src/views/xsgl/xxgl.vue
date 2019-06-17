<template>
    <div class="page pagexxgl">
        <el-form :inline="true" :model="form" class="demo-form-inline align-left padding20">
            <el-form-item label="">
                <el-select v-model="form.xj" placeholder="请输入学级">
                    <el-option  v-for="item in searchList.xj"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.kx" placeholder="科系" @change="kxChange">
                    <el-option  v-for="item in searchList.kx"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.zy" placeholder="专业">
                    <el-option  v-for="item in searchList.zy"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.bj" placeholder="专业所在班级">
                   <el-option  v-for="item in searchList.bj"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="align-left padding-left-20">
            <router-link to="/xxglAdd"><el-button type="primary">新增学生</el-button></router-link>
            <el-button type="info">删除选择项</el-button>
            <div class="right search">
                <el-input class=""></el-input>
                <i class="iconfont icon-chaxun"></i>
            </div>
            
        </div>
        <div style="width:100%;padding-top:20px;">
            <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            align="center"
             :row-class-name="tableRowClassName"
             @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="" >
                </el-table-column>
                 <el-table-column
                    label="学号"
                    prop="identity"
                    width="">
                </el-table-column>
                 <el-table-column
                    label="姓名"
                    prop="name"
                    width="">
                </el-table-column>
                 <el-table-column
                    label="班级"
                    prop="team"
                    width="">
                </el-table-column>
                 <el-table-column
                    label="性别"
                    prop="sex"
                    width="">
                </el-table-column>
                 <!-- <el-table-column
                   label="出生日期"
                   prop="birthday"
                    width="">
                </el-table-column> -->
                 <!-- <el-table-column
                    label="身份证号"
                    prop="xb"
                    width="">
                </el-table-column> -->
                <!-- <el-table-column
                    label="籍贯"
                    prop="xb"
                    width="">
                </el-table-column> -->
                <el-table-column
                    label="联系电话"
                    prop="mobile"
                    width="">
                </el-table-column>
                <!-- <el-table-column
                    label="分数"
                    prop="xb"
                    width="">
                </el-table-column> -->
                <el-table-column
                    label="家长姓名"
                    prop="parent"
                    width="">
                </el-table-column>
                <el-table-column
                    label="操作"
                    prop="xb"
                    width="">
                      <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <!-- <el-button type="text" size="small">编辑</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                small
                layout="prev, pager, next"
                :total="page.total"
                 @current-change="handleCurrentChange"
                :current-page.sync="page.currentPage">
            </el-pagination>
            
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import {dicGrade,dicDepartment,dicSpecialty,dicTeam,dicRole,stuList} from '@/api';
  import { jquery } from '@/script/jquery-1.7.1';
export default {
    data(){
        return{
            form:{
                xj:'',
                kx:'',
                zy:'',
                bj:'',
            },
            
            tableData:[],
            searchList:{
                xj:[
                    // {label:'2011',value:'2011'}
                ],
                kx:'',
                zy:'',
                bj:'',
            },
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
        handleSelectionChange(){

        },
        onSubmit(){
          this.studentList();  
        },
        handleCurrentChange(val) {
            this.page.pageNum = val;
            this.studentList();
        },
        kxChange() {
            this.zyList();
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
                return '';
        },
        handleClick(row){

        },
        // 学级
         async studentList(){
            var params = {
                grade_id:this.form.xj,
                department_id:this.form.kx,
                specialty_id:this.form.zy,
                team_id:this.form.bj,
                key:'',
                pageNum:this.page.pageNum,
                pageSize:this.page.pageSize,
            };
            var res =  await stuList(params);
                if(res.code ==200){
                this.tableData = res.data.list;
                this.page.pageNum = res.data.pageNum;
                this.page.pageSize = res.data.pageSize;
                this.page.firstPage = res.data.firstPage;
                this.page.total = res.data.total;
                this.page.currentPage = res.data.pageNum;
            }
                
                console.log(res)
         },

        // 学级
         async xjList(){
            var params = {};
            var res =  await dicGrade(params);
            // console.log(res);
            if(res.code==200){
                this.searchList.xj = res.data;
            }
         },
         // 选择科系
         async kxList(){
            var params = {};
            var res =  await dicDepartment(params);
            // console.log(res)
            if(res.code==200){
                this.searchList.kx = res.data;
            }
         },
         // 选择专业
         async zyList(){
            var params = {id:this.form.kx};
            var res =  await dicSpecialty(params);
            // console.log(res)
            if(res.code==200){
                this.searchList.zy = res.data;
            }
         },
          // 选择班级
         async bjList(){
            var params = { };
            var res =  await dicTeam(params);
                // console.log(res)
            if(res.code==200){
                this.searchList.bj = res.data;
            }
         },

        

    },
    mounted(){
        this.studentList();
        this.kxList();
        this.xjList();
        this.kxList();
        this.bjList();
    }
}
</script>
<style lang="stylus" scoped>
    .pagexxgl{
        .search{
            width:200px;
            height:40px;
            padding-bottom:20px;
            position:relative;
            padding-right:10px;
            .iconfont{
                position:absolute;
                right:20px;
                top:10px;

            }
            // border:1px solid #999;
        }
    }
</style>