<template>
    <div class="page page-pjsz">
      <el-container>
        <el-header class="align-left">
           <span>{{this.$route.query.grade}}</span>
           <span>>></span>
           <span>{{this.$route.query.specialty}}</span>
           <span>>></span>
           <span>{{this.$route.query.name}}</span>
       </el-header>
        <el-main style="padding-left:0px">
            <el-form :inline="true" class="align-left padding-left-20">
                <el-form-item>
                     <el-select v-model="form.xq" placeholder="学期">
                        <el-option  v-for="item in xq"
                        :key="item.id"
                        :label="item.term"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>    
                 <el-form-item>
                    <el-button type="primary" @click="list()">查询</el-button>
                </el-form-item>   
            </el-form>
            <div class="pjsz" v-loading = "loadingmain">
                <table class="backfff"   v-loading="fullscreenLoading">
                    <thead>
                        <tr class="pjsz-title">
                            <td>一级指标</td>
                            <td>二级指标</td>
                            <td>三级指标</td>
                            <td>四级指标</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="verticalAlign">
                            <td class="pjsz-main oneji" style="width:20%;">
                                <table>
                                        <tr class ="static" v-for="(item,index) in oneList" :key="index" @click="oneClick(item.fjMenu.id,index)" v-bind:class="{ active: index == oneid }">
                                            <td class="qzz">
                                                <p>
                                                    <span> 权重<br/>
                                                    <input type="text" v-model="item.fjMenu.weight" class="input-qzz border-none" :disabled="disabledOne" v-bind:class="{ activeiput: disabledOne == false }"/>%
                                                    </span>
                                                </p>
                                            </td>
                                            <td class="nameMain">
                                                <p>
                                                    <span>{{item.fjMenu.name}}</span><br/>
                                                    <span class="padding-5">参考值:{{item.fjMenu.standard}}</span>
                                                     <span class="padding-5">当前值:{{Math.round(item.fjMenu.score)}}</span>
                                                </p> 
                                            </td>
                                        </tr>
                                </table>
                            </td>
                            <td class="pjsz-main twoji" style="width:20%;">
                                  <table>
                                    <tr v-for="(item,index) in twoList" :key="index" @click="twoClick(item.fjMenu.id,index)" class="static" v-bind:class="{ active: index == twoId }">
                                        <td class="qzz">
                                            <p>
                                                <span> 权重<br/>
                                                  <input type="text" v-model="item.fjMenu.weight" class="input-qzz border-none" :disabled="disabledTwo" v-bind:class="{ activeiput: disabledTwo == false }"/>%
                                                </span>
                                            </p>
                                        </td>
                                        <td class="nameMain">
                                            <p>
                                                <span>{{item.fjMenu.name}}</span><br/>
                                                <span class="padding-5">参考值:{{item.fjMenu.standard}}</span>
                                                <span class="padding-5">当前值:{{Math.round(item.fjMenu.score)}}</span>
                                            </p> 
                                        </td>
                                       
                                    </tr>
                                </table>
                            </td> 
                            <td class="pjsz-main threeji" style="width:20%;" >
                                 <table>
                                    <tr class ="static" v-for="(item,index) in threeList" :key="index" @click="threeClick(item.fjMenu.id,index)" v-bind:class="{ active: index == threeId }">
                                        <td class="qzz">
                                            <p>
                                                <span> 权重<br/>
                                                     <input type="text" v-model="item.fjMenu.weight" class="input-qzz border-none" :disabled="disabledThree" v-bind:class="{ activeiput: disabledThree == false }"/>%
                                                </span>
                                            </p>
                                        </td>
                                        <td class="nameMain">
                                            <p>
                                                <span>{{item.fjMenu.name}}</span><br/>
                                                <span class="padding-5">参考值:{{item.fjMenu.standard}}</span> 
                                                <span class="padding-5">当前值:{{Math.round(item.fjMenu.score)}}</span>
                                            </p> 
                                        </td>
                                       
                                    </tr>
                                    
                                </table>
                            </td>
                            <td class="pjsz-main fourji" style="width:40%;">
                                 <table>
                                    <tr class ="static" v-for="(item,index) in fourList" :key="index" @click="fourClick(item.id,index)" v-bind:class="{ active: index == fourId }">
                                        <td class="qzz">
                                            <p>
                                                <span>权重<br/>
                                               <input type="text" v-model="item.weight" class="input-qzz border-none" :disabled="disabledFour" v-bind:class="{ activeiput: disabledFour == false }"/>%</span>
                                            </p>
                                        </td>
                                        <td class="nameMain">
                                            <p class="margin-20">
                                                <span>{{item.name}}</span><br/>
                                            </p> 
                                            <p class="csfz">
                                                <span v-show="item.type == 0">评分方式:加分</span>
                                                <span v-show="item.type !== 0">评分方式:减分</span>
                                                <span>初始分值:0.00</span><br/>
                                                <span> <i>参考分值:{{item.standard}}</i> <i>当前值:{{item.score}}</i>
                                                 <!-- <i>已加分:00:00</i><i>加分次数:00:00</i> -->
                                                 </span>
                                            </p>
                                            <p>
                                                <el-button type="text" @click="addPf(item.id,item.type)">添加评分</el-button>
                                            </p>
                                        </td>
                                      
                                    </tr>
                                   
                                </table>
                            </td>
                        </tr>
                        <el-dialog
                            title=""
                            :visible.sync="dialogVisible"
                            width="30%" class="align-left">
                                <el-form :label-position="labelPosition" :model="addForm" :rules="rules" ref="addForm">
     
                                    <el-form-item label="分数"  prop="score">
                                        <el-input v-model="addForm.score"></el-input>
                                    </el-form-item>
                                    <!-- <el-form-item label="评分方式"  prop="type">
                                         <el-select v-model="addForm.type" placeholder="请选择评分方式">
                                            <el-option label="加分" value="0" ></el-option>
                                            <el-option label="减分" value="1"></el-option>
                                        </el-select>
                                    </el-form-item> -->
                                     <el-form-item label="备注" prop="bz">
                                        <el-input v-model="addForm.bz" type="textarea"></el-input>
                                    </el-form-item>
                                </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
                                <el-button type="primary" @click="submitForm('addForm')">保存</el-button>
                                 <!-- <el-button type="primary" @click="submitFormedit('addForm') ">保存</el-button> -->
                            </span>
                        </el-dialog>
                        <el-dialog
                            title="删除"
                            :visible.sync="dialogVisible2"
                            width="30%">
                            <span>您确定要删除这个指标</span>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible2 = false">取 消</el-button>
                                <el-button type="primary" @click="deleteSure()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </tbody>
                </table>
              
            </div>
           
        </el-main>
      </el-container>
    </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  import { pjgzList,termList,scoreList,addScore} from '@/api';
  import { jquery } from '@/script/jquery-1.7.1';
export default {
    data(){
        var checkfz = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入分值'));
        }
         value = parseInt(value);
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value > 100) {
              callback(new Error('分值在100分以内'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return{
        oneid:0,
        twoId:0,
        threeId:0,
        disabledOne:true,
        disabledTwo:true,
        disabledThree:true,
        disabledFour:true,
        fourId:0,
        form:{
            xq:'',
        },
        xq:'',
        dataList:[],
        oneList:[],
        twoList:[],
        threeList:[],
        edit:false,
        fourList:[],
        kongList:[],
        isActive:false,
        dialogVisible:false,
        dialogVisible2:false,
        addForm:{
            standard:'',
            name:'', 
            score:'0', 
            type:'0',
            id:'',
            parent_id:'',
            bz:'',
            criterion_id:''
            
        },
        deleteId:'',
        rules:{
            name:[
               { required: true, message: '请输入指标内容', trigger: 'blur' }
            ],
            score:[
               {validator: checkfz, trigger: 'blur' }
            ], 
        },
        labelPosition:'top',
        listPd:false,
        fullscreenLoading:false,
       idList:{
           oneId:0,
           twoId:'',
           threeId:'',
           fourId:'',
       },
       loadingmain:false,
       dbData:[],
       
      }  
    },
    methods:{
      oneClick(id,index){
          this.oneid = index;
          this.threeId = 0;
          this.fourId = 0;
          this.twoId = 0;
          this.xrsj();
          this.idList.twoId = id;
          
      },
      twoClick(id,index){
            this.twoId = index;
            this.threeId = 0;
            this.fourId = 0;
            this.xrsj();
             this.idList.threeId = id;
      },
      threeClick(id,index){
          this.threeId = index;
            this.fourId = 0;
          this.xrsj();
          this.idList.fourId = id;
      },
      fourClick(id,index){
            this.fourId = index;
          this.xrsj()
      },
      xrsj(){
             this.oneList = this.dataList;
             this.twoList = this.oneList[this.oneid].zjMenu;
             this.idList.twoId=this.oneList[0].fjMenu.id;
          if( this.twoList.length == 0){
                this.twoList = []; 
                this.threeList = [];
                this.fourList=[];
                this.idList.threeId='';
                this.idList.fourId='';
          }else{
               this.threeList = this.twoList[this.twoId].zjMenu;
               this.idList.threeId = this.oneList[this.oneid].zjMenu[0].fjMenu.id;
               if(this.threeList.length==0){
                this.fourList=[];
                this.idList.fourId='';
               }else{
                   this.idList.fourId = this.twoList[this.twoId].zjMenu[0].fjMenu.id;
                   this.fourList = this.threeList[this.threeId].zjMenu;
               }
          }
          console.log(this.fourList)
      },
       
      // 表格list
        async list(){
            this.loadingmain = true;
             var params = {
                 student_id:this.$route.query.id,
                 term_id:this.form.xq,
             };
             var res = await scoreList(params);
            if(res.code == 200){
                this.loadingmain = false;
                this.dataList = res.data;
                this.xrsj()
            }else{
                this.loadingmain = false;
                  this.$message(res.message);
            }
      },
      // 学期
         async xqList(){
            var params = {};
            var res =  await termList(params);
            console.log(res);
            if(res.code==200){
                this.xq = res.data;
                this.form.xq = res.data[0].id;
                this.list();

            }else{
             this.$message(res.message);  
            }
        },
         // 添加评分
         async addFunction(){
            var params = {
                student_id:this.$route.query.id,
                term_id:this.form.xq,
                score:this.addForm.score,
                criterion_id:this.addForm.criterion_id,
                type:this.addForm.type,
                bz:this.addForm.bz
            };
            var res =  await addScore(params);
            console.log(res);
            if(res.code==200){
                // this.xq = res.data;
                // // this.form.xq = res.data[0].id;
                // this.list();

            }else{
             this.$message(res.message);  
            }
        },
        addPf(id,jf){
            this.dialogVisible = true;
            this.addForm.type = jf;
            this.addForm.criterion_id = id;
        },
      submitForm(formName){
           this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addFunction()
          } else {
            return false;
          }
        });
      } 
    },
    mounted(){
        this.loadingmain = true;
        this.xqList();
        
    }
}
</script>
<style lang="stylus" scoped>
    .page-pjsz{
        .el-header{
            color:#79C6E4;
            line-height:60px;
        }
      .pjsz{
          border:1px solid #DDDDDD;
          border-radius:4px;
          overflow:hidden;
            .backfff{
                width:100%;
                background-color:#fff;
                .verticalAlign{
                 vertical-align:top;   
                }
                height:auto;
                .pjsz-title{
                    td{
                        color:#0478A4;
                        line-height:40px;
                       border-bottom:1px solid #E5E5E5;  
                    }
                   
                }
                .pjsz-main{
                    padding:10px;
                    height:100%;
                    border-right:1px solid #DDDDDD;
                    padding:20px; 
                    .static{
                        background-color:#f6f6f6;
                        position:relative;
                        .qzz{
                            color:#3181BB;
                         
                             background-color:#DDDDDD;
                        }
                        .xian{
                             position:absolute;
                        }
                    }    
                    >table{
                        width:100%;
                        margin-bottom:20px;
                        border-collapse:separate; 
                        border-spacing:0px 10px;
                        tr{
                            border-radius:20px;
                            margin-bottom:20px;
                            padding:20px;
                            .qzz{
                                border-top-left-radius:20px;
                                border-bottom-left-radius:20px;
                                p{
                                    padding:20px 0px;
                                    width:100%;
                                    height:100%;
                                    padding:20px 10px;
                                    display:block;
                                    .input-qzz{
                                        width:18px;
                                        height:30px;
                                    }
                                    
                                    .border-none{
                                        border:none;
                                        background-color:transparent;
                                        color:inherit
                                    }
                                    .activeiput{
                                       border:3px solid #ededed;
                                       background-color:#C7EDCC; 
                                       color:#333;
                                       width:40px;
                                       border-radius:5px
                                    }
                                    
                                } 
                            }
                            
                            .nameMain{
                                text-align:left;
                                padding-left:10px;
                                padding:20px;
                                .margin-20{
                                     margin-bottom:20px;
                                     padding-right:20px;
                                     font-size:16px;
                                     fong-weight:bold;
                                }
                            }
                            .csfz{
                                span{
                                    display:inline-block;
                                    margin-right:10px;
                                    border-radius:4px;
                                    margin-bottom:10px
                                    i{
                                        font-style:normal;
                                        display:inline-block;
                                        margin-right:5px;
                                    }
                                }
                            }
                            .set{
                                border-top-right-radius:20px;
                                border-bottom-right-radius:20px;
                                position:relative;
                                width:20px;
                                p{
                                    position:absolute;
                                }
                                .icon-set{
                                    top:5px;
                                    right:15px;
                                    color:#C5C5C5; 
                                    
                                }
                                .icon-delete1{
                                    bottom:5px;
                                    right:15px; 
                                    color:#C5C5C5; 
                                }

                            }
                           
                        }
                        
                    }
                   
                    .backOrange{
                        background-color:#D8B640;
                        color:#fff;
                        .set{
                            .iconfont{
                            color:#fff;
                        }
                        }
                        
                    }

                }
                .oneji{
                      .active{
                          background-color:rgba(133,190,229,1);
                          color:#fff;
                          .qzz{
                                color:#fff;
                                background-color:#77ABCE;
                            }
                     }
                     .color{
                         color:rgba(133,190,229,1)
                     }
                     
                   
                }
                 .twoji{
                      .active{
                          background-color:#F6A8CC;
                          color:#fff;
                          .qzz{
                                color:#fff;
                                background-color:#DD97B7;
                            }
                     }
                      .color{
                         color:#F6A8CC
                     }
                     
                   
                }
                 .threeji{
                      .active{
                          background-color:#63D0EE;
                          color:#fff;
                          .qzz{
                                color:#fff;
                                background-color:#59BBD6;
                            }
                     }
                     .color{
                         color:#63D0EE
                     }
                     
                   
                }
                .fourji{
                   .static{
                       .qzz{
                          width:100px;
                       }
                      
                        .csfz{
                            span{
                                background-color:#DDDDDD;
                                padding:5px 10px;
                            }
                            
                        }
                    }
                    .color{
                         color:#D8B640
                     }
                    .active{
                        background-color:#D8B640;
                          color:#fff;
                          .qzz{
                                color:#fff;
                                background-color:#C2A339;
                            }
                            .csfz{
                            span{
                                background-color:#C2A339;
                            }
                            
                        }
                    }
                    
                }
            }
          
        //   .pjsz-title{
        //     li{
        //         text-align:left;
        //         padding:5px;
        //         color:#0076A3 
        //     }       
        //   } 
      }
    }
</style>




