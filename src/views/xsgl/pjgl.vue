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
                <el-select v-model="form.zy" placeholder="专业" @change="zychange">
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
                <el-button type="primary" @click="onSubmit()" v-loading="loading">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="align-left padding-left-20">
        <!-- <el-button type="primary" @click="linkPage()">新增学生</el-button> -->
            <!-- <el-button type="info">删除选择项</el-button> -->
            <div class="right search">
                <el-input class="" v-model="form.key"></el-input>
                <i class="iconfont icon-chaxun" @click="onSubmit()"></i>
            </div>
            
        </div>
        <div style="width:100%;padding-top:20px;" v-loading="tableLoading">
            <el-table
            ref="multipleTable"
            :data="tableData"
            style="width: 100%"
            align="center"
             :row-class-name="tableRowClassName"
             @selection-change="handleSelectionChange"
             >
                <!-- <el-table-column
                    type="selection"
                    width="" >
                </el-table-column> -->
                 <el-table-column
                    label="学号"
                    prop="identity"
                   >
                </el-table-column>
                 <el-table-column
                    label="姓名"
                    prop="name"
                    width="">
                     <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.name}}</el-button>
                    </template>
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
            </el-table>
            <div class="fenye over">
                <div class="left padding-left-20">当前第{{this.page.currentPage}}页</div>
                 <el-pagination  small  layout="prev, pager, next" :total="page.total"
                 @current-change="handleCurrentChange"
                :current-page.sync="page.currentPage">
            </el-pagination>
            </div>
           
            <el-dialog
                title="删除"
                :visible.sync="dialogVisible"
                width="30%">
                <span>您确定要删除这个指标</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteList()">确 定</el-button>
                </span>
            </el-dialog>
            
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import {dicGrade,dicDepartment,dicSpecialty,dicTeam,dicRole,stuList,delStu} from '@/api';
  import { jquery } from '@/script/jquery-1.7.1';
export default {
    data(){
        return{
            form:{
                xj:'',
                kx:'',
                zy:'',
                bj:'',
                key:''
            },
            
            dialogVisible:false,
            loading:false,
            tableLoading:false,
            tableData:[],
            searchList:{
                xj:[
                    // {label:'2011',value:'2011'}
                ],
                kx:'',
                zy:'',
                bj:'',
            },
            deleteid:'',
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
        handleSelectionChange(val){
            console.log(val);

        },
       
        onSubmit(){
        this.loading = true;
          this.studentList();  
        },
        handleCurrentChange(val) {
            this.page.pageNum = val;
            this.studentList();
        },
        kxChange() {
            this.zyList();
        },
        zychange(){
            this.bjList();
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
             this.$router.push({path: '/PjDetail',query:{id:row.id}});

        },
        // 学生信息list
         async studentList(){
             this.tableLoading = true;
            var params = {
                grade_id:this.form.xj,
                department_id:this.form.kx,
                specialty_id:this.form.zy,
                team_id:this.form.bj,
                key:this.form.key,
                pageNum:this.page.pageNum,
                pageSize:this.page.pageSize,
            };
            var res =  await stuList(params);
                if(res.code ==200){
                this.loading = false;
                this.tableLoading = false;
                this.tableData = res.data.list;
                this.page.pageNum = res.data.pageNum;
                this.page.pageSize = res.data.pageSize;
                this.page.firstPage = res.data.firstPage;
                this.page.total = res.data.total;
                this.page.currentPage = res.data.pageNum;
            }else{
               this.loading = false;
                this.tableLoading = false;
                this.$message(res.message);
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
            var params = {id:this.form.kx};
            var res =  await dicSpecialty(params);
            // console.log(res)
            if(res.code==200){
                this.searchList.zy = res.data;
            }
         },
          // 选择班级
         async bjList(){
            var params = {
                grade_id:this.form.xj,
                specialty_id:this.form.bj

             };
            var res =  await dicTeam(params);
            if(res.code==200){
                this.searchList.bj = res.data;
            }else{
             this.$message(res.message);  
           }
         },
    },
    mounted(){
        this.studentList();
        this.kxList();
        this.xjList();
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
        .fenye{
            width:100%;
            padding-top:20px;
            .el-pagination{
                float:right;
            }
        }
    }
</style>