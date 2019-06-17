<template>
    <div class="page page-index">
      <el-container>
        <el-main class="align-left over" >
           <el-form :inline="true" :model="form" class="demo-form-inline align-left left">
             <el-form-item label="">
                <el-select v-model="form.xj" placeholder="科系">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.xj" placeholder="专业">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.xj" placeholder="专业所在班级">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.xj" placeholder="专业所在班级">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="">
                <el-select v-model="form.xj" placeholder="专业所在班级">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
          <div class="button-style left">
            <el-button type="primary" @click="onSubmit">增加对比</el-button>
             <el-button type="primary" @click="onSubmit">生成图表</el-button>
              <router-link to="/pjgz" class="tolinht"><el-button type="text">进入后台</el-button></router-link>
          </div>
          <div class="clear"></div>
          <div class="over">
              <div class="left dbxq">
                  <ul class="dbnr">
                    <li>
                       <span>会计</span>
                       <span>>>></span>
                       <span class="delete-db">x</span>
                    </li>
                    <li>
                       <span>会计</span>
                       <span>>>></span>
                       <span class="delete-db">x</span>
                    </li>
                    <li>
                       <span>会计</span>
                       <span>>>></span>
                       <span class="delete-db">x</span>
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
  import { jquery } from '@/script/jquery-1.7.1';
export default {
    data(){
      return{
       form:{
         xj:'',
       },
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

      },
      echartXr(){
        this.chart = this.$echarts.init(document.getElementById('leida'));
        this.chart.setOption(this.option);
      }
    

    },
    mounted(){
      this.echartXr()

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




