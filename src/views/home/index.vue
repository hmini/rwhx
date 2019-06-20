<template>
    <div class="page page-index">
      <el-container>
        <el-main class="align-left over" >
           <el-form :inline="true" :model="form" class="demo-form-inline align-left left">
             <el-form-item label="">
                <el-select v-model="form.kx" placeholder="请选择科系" @change="kxchange()">
                    <el-option  v-for="item in search.kx"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.zy" placeholder="请选择专业"  @change="zychange()">
                  <el-option  v-for="item in search.zy"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.bj" placeholder="选择专业所在班级" @change="bjchange()">
                  <el-option  v-for="item in search.bj"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.xs" placeholder="选择学生" @change="xsChange()">
                  <el-option  v-for="item in search.xs"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.xq" placeholder="选择学期" @change="xname()">
                     <el-option  v-for="item in search.xq"
                        :key="item.id"
                        :label="item.term"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
          <div class="button-style left">
            <el-button type="primary" @click="zjdb()">增加对比</el-button>
             <el-button type="info" @click="onSubmit">生成图表</el-button>
              <router-link to="/pjgz" class="tolinht"><el-button type="text">进入后台</el-button></router-link>
          </div>
          <div class="clear"></div>
          <div class="over">
              <div class="left dbxq">
                  <ul class="dbnr">
                    <li v-for="(item,index) in dataPush" :key="index" v-show="dataPush.length!==0">
                       <span v-show="item.kx !== ''">{{item.kx}}</span>
                       <span v-show="item.kx !== ''&& item.zy !== ''">>>></span>
                       <span  v-show="item.zy !== ''">{{item.zy}}</span>
                        <span v-show="item.zy !== ''&& item.bj !== ''">>>></span>
                        <span  v-show="item.bj !== ''">{{item.bj}}</span>
                        <span v-show="item.bj !== ''&& item.xs !== ''">>>></span>
                       <span  v-show="item.xs !== ''">{{item.xs}}</span>
                       <span v-show="item.xs !== ''&& item.xq !== ''">>>></span>
                       <span  v-show="item.xq!== ''">{{item.xq}}</span>
                       <span class="delete-db" @click="deleteDb(index)">x</span>
                    </li>
                  </ul>
              </div>
              <div class="left clear-select">
                <button >清空选择</button>
              </div>
          </div>
          <div class="tuxing">
              <div class="left leida" id="leida">111</div>
              <div class="table left">
               
              </div>
          </div>
        </el-main>
      </el-container>
    </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  import {dicDepartment,dicSpecialty,dicTeamZy,termList,dicStu,makeTb} from '@/api';
  import { jquery } from '@/script/jquery-1.7.1';
export default {
    data(){
      return{
       form:{
         kx:'',
         zy:'',
         bj:'',
         xs:'',
         xq:'',
       },
       search:{
         kx:'',
         zy:'',
         xq:'',
         bj:'',
         xs:'',

       },
       formName:{
         kx:'',
         zy:'',
         bj:'',
         xs:'',
         xq:'',
       },
       dataidpush:[],
       dataPush:[],
       dbData:[],
       option: {
            title: {
                text: '基础雷达图'
            },
            tooltip: {},
            legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                  }
                },
                indicator: [
                  { name: '销售（sales）', max: 6500},
                  { name: '管理（Administration）', max: 16000},
                  { name: '信息技术（Information Techology）', max: 30000},
                  { name: '客服（Customer Support）', max: 38000},
                  { name: '研发（Development）', max: 52000},
                  { name: '市场（Marketing）', max: 25000}
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : [4300, 10000, 28000, 35000, 50000, 19000],
                        name : '预算分配（Allocated Budget）'
                    },
                    {
                        value : [5000, 14000, 28000, 31000, 42000, 21000],
                        name : '实际开销（Actual Spending）'
                    }
                ]
            }]
       },
       tableData:[
         
       ] 
      }
       
    },
    methods:{
      onSubmit(){
        this.tb(0)
      },
      deleteDb(index){
         this.dataidpush =delete this.dataidpush[index];
         this.dataPush =delete this.dataPush[index];
      },
      echartXr(){
        this.chart = this.$echarts.init(document.getElementById('leida'));
        this.chart.setOption(this.option);
      },
       zjdb(){
         this.dataidpush.push(this.form);
         this.dataPush.push(this.formName);   
         console.log( this.dataPush)
        },  
        
             // 首页图标
        async tb(id){
            var params = {
              data:JSON.stringify(this.dataidpush),
              id:id
            }
            var res =  await makeTb(params);
            // console.log(res)
            if(res.code==200){
               console.log(res)
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
                this.search.kx = res.data;
            }else{
             this.$message(res.message);  
           }
         },
         // 选择专业
         async zyList(){
            var params = {id:this.form.kx};
            var res =  await dicSpecialty(params);
            if(res.code==200){
                this.search.zy = res.data;
            }
         },
          // 选择班级
         async bjList(){
         
            var params = {
                specialty_id:this.form.zy

             };
            var res =  await dicTeamZy(params);
            if(res.code==200){
                this.search.bj = res.data;
            }else{
             this.$message(res.message);  
           }
         },
          // 选择学生
         async xsList(){
           var params = {
                team_id:this.form.bj,
             };
            var res =  await dicStu(params);
            if(res.code==200){
                this.search.xs = res.data;
            }else{
             this.$message(res.message);  
           }
         },
          aquireLabel(arr,id,code,name){
           for(var i=0;i<arr.length;i++){
             if(id == arr[i].code){
               return arr[i].name
             }
           }
        }, 
        aquireLabel2(arr,id2,id,term){
           for(var i=0;i<arr.length;i++){
             if(id2 == arr[i].id){
               return arr[i].term
             }
           }
        }, 
         kxchange(){
            this.formName.kx = this.aquireLabel(this.search.kx,this.form.kx,'code','name');
            this.zyList();
         },
         zychange(){
              this.formName.zy = this.aquireLabel(this.search.zy,this.form.zy,'code','name');
               console.log( this.formName.zy);
             this.bjList()
         },
         bjchange(){
            this.formName.bj = this.aquireLabel(this.search.bj,this.form.bj,'code','name');
            console.log( this.formName.bj);
             this.xsList()
         },
         xsChange(){
            this.formName.xs = this.aquireLabel(this.search.xs,this.form.xs,'code','name');
             console.log( this.formName.xs);
         },
         xname(){
            this.formName.xq = this.aquireLabel2(this.search.xq,this.form.xq,'id','term');
            console.log(this.formName.xq);
         },
         // 选择学期
         async xqList(){
            var params = {};
            var res =  await termList(params);
            console.log(res);
            if(res.code==200){
                this.search.xq = res.data;

            }else{
             this.$message(res.message);  
            }
        },
    },
    mounted(){
      this.echartXr();
      this.kxList();
      this.xqList();
    

    }
}
</script>
<style lang="stylus" scoped>
    .page-index{
      .el-form{
        width:1200px;
        padding:0px;
        .el-form-item{
          width:calc(20% - 5px);
          margin-right:0px;
        }
      }
      .button-style{
        .tolinht{
          position:fixed;
          right:20px;
          top:20px;
          color:#999;
        }
      }
      .dbxq{
        width:1170px;
        padding:20px 0;
        .dbnr{
          width:100%;
          >li{
            width:100%;
            height:50px;
            line-height:50px;
            padding:0 20px;
            margin-bottom:15px;
            background-color:#EFEFEF;
            border:1px solid #E3E5E6;
            position:relative;
            .delete-db{
              position:absolute;
              cursor:pointer;
              right:20px;
              top:-10px;
              color:#C0C0C0;
              font-size:20px;
            }
          }
        }
      }
      .clear-select{
        margin-left:20px;
        padding-top:20px;
        button{
          backgrond-color:#EFEFEF;
          border:none;
          line-height:40px;
          padding:0 10px;
        }
      }
      .tuxing{
        width:100%;
        height:600px;
        .leida{
          width:60%;
          height:100%;
        }
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
            color:    #385487;
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color:    #385487;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:    #385487;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
            color:    #385487;
        }
        .el-select .el-input .el-select__caret{
          color: #385487;
        }
    }
</style>




