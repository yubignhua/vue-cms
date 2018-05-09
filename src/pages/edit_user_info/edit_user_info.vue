<template>
    <div class="edit_user_info">
      <Scroll ref="scroll" :pulldown="false" :mouseWheel="true">
        <div class="eui_item"><span>姓名 :</span> <span>{{user_info.name}}</span>
          <el-button @click="editForm" type="primary m_edit" icon="el-icon-edit" circle>编辑</el-button>
        </div>
        <div class="eui_item"><span>性别 :</span> <span>{{user_info.sex=='m'?'男':'女'}}</span></div>
        <div class="eui_item"><span>年龄 :</span> <span>{{user_info.age}}</span></div>
        <div class="eui_item"><span>身高(cm) :</span> <span>{{user_info.height}}</span></div>
        <div class="eui_item"><span>体重(kg) :</span> <span>{{user_info.weight}}</span></div>
        <div class="eui_item"><span>BMI指数 :</span> <span>{{user_info.bmi}}</span></div>
        <div class="eui_item"><span>每周锻炼身体(次) :</span> <span>{{user_info.exercise}}</span></div>
        <div class="eui_item"><span>吸烟频率(次/每周) :</span> <span>{{user_info.smoke}}</span></div>
        <div class="eui_item"><span>睡眠时间 :</span> <span>{{user_info.sleep_time}}</span></div>
        <div class="eui_item"><span>疾病史 :</span> <span>{{user_info.illness_history}}</span></div>
        <div class="line"> * 以下信息填写最后一次测量值</div>
        <div class="eui_item"><span>有无高血压 :</span> <span>{{user_info.have_HTN?"有":"无"}}</span></div>
        <div class="eui_item"><span>高压 :</span> <span>{{user_info.high_blood}}</span></div>
        <div class="eui_item"><span>低压 :</span> <span>{{user_info.low_blood}}</span></div>
        <div class="eui_item"><span>血糖异常 :</span> <span>{{user_info.have_BS_exc?"有":"无"}}</span></div>
        <div class="eui_item"><span>血脂异常 :</span> <span>{{user_info.have_BL_exc?"有":"无"}}</span></div>
        <div class="eui_item"><span>尿酸异常 :</span> <span>{{user_info.have_UA_exc?"有":"无"}}</span></div>
        <div class="eui_item"><span>症状 :</span>
          <el-tag :key="item" v-for="item in user_info.symptoms" type="danger">{{item}}</el-tag>
        </div>
        <div class="eui_item"><span>直系亲属高血压病史 :</span>
          <el-tag :key="item" v-for="item in user_info.HBP_relations" type="danger">{{item}}</el-tag>
        </div>
        <div class="eui_item"><span>直系亲属糖尿病病史 :</span>
          <el-tag :key="item" v-for="item in user_info.DMS_relations" type="danger">{{item}}</el-tag>
        </div>
        <div class="eui_item"><span>直系亲属冠心病病史 :</span>
          <el-tag :key="item" v-for="item in user_info.CAD_relations" type="danger">{{item}}</el-tag>
        </div>
      </Scroll>



      <el-dialog title="编辑病人信息" :visible.sync="dialogFormVisible">
        <el-form :model="formInfo" label-width="180px">
          <el-form-item label="姓名">
            <el-input v-model="formInfo.name" auto-complete="off" style="width: 30%;"></el-input>
          </el-form-item>
          <el-form-item label="性别" >
            <el-select v-model="formInfo.sex" placeholder="请选择性别">
              <el-option label="男" value="m"></el-option>
              <el-option label="女" value="f"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="formInfo.age" auto-complete="off" style="width: 30%;"></el-input>
          </el-form-item>
           <el-form-item label="身高(cm)">
            <el-input v-model="formInfo.height" auto-complete="off" style="width: 30%;"></el-input>
          </el-form-item>
           <el-form-item label="体重(kg)">
            <el-input v-model="formInfo.weight" auto-complete="off" style="width: 30%;"></el-input>
          </el-form-item>
           <el-form-item label="BMI指数">
            <el-input v-model="formInfo.bmi" auto-complete="off" style="width: 30%;"></el-input>
          </el-form-item>
           <el-form-item label="每周锻炼身体(次)">
            <el-input v-model="formInfo.exercise" auto-complete="off" style="width: 30%;"></el-input>
          </el-form-item>
          <el-form-item label="吸烟频率(次/每周)">
            <el-input v-model="formInfo.smoke" auto-complete="off" style="width: 30%;"></el-input>
          </el-form-item>

          <el-form-item label="睡眠时间" prop="sleep_time">
            <el-select v-model="formInfo.sleep_time" placeholder="睡眠时间">
              <el-option key="<6小时" label="<6小时" value="<6小时"/>
              <el-option key="6-7小时(不包括7小时)" label="6-7小时(不包括7小时)" value="6-7小时(不包括7小时)"/>
              <el-option key="7-8小时(不包括8小时)" label="7-8小时(不包括8小时)" value="7-8小时(不包括8小时)"/>
              <el-option key="8小时以上" label="8小时以上" value="8小时以上"/>
            </el-select>
          </el-form-item>





          <el-form-item label="疾病史">
            <el-input v-model="formInfo.illness_history" auto-complete="off" style="width: 30%;"></el-input>
          </el-form-item>

          <div class="line"> * 以下信息填写最后一次测量值</div>
          <el-form-item label="有无高血压">
            <el-radio-group v-model="formInfo.have_HTN">
              <el-radio :label="true" value="true">有</el-radio>
              <el-radio :label="false" value="false">无</el-radio>
            </el-radio-group>
          </el-form-item>

          <!--<el-form-item label="高压">-->
            <!--<el-input v-model="formInfo.high_blood" auto-complete="off" style="width: 30%;"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="低压">-->
            <!--<el-input v-model="formInfo.low_blood" auto-complete="off" style="width: 30%;"></el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="血糖异常">
            <el-radio-group v-model="formInfo.have_BS_exc">
              <el-radio :label="true" value="true">有</el-radio>
              <el-radio :label="false" value="false">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="血脂异常">
            <el-radio-group v-model="formInfo.have_BL_exc">
              <el-radio :label="true" value="true">有</el-radio>
              <el-radio :label="false" value="false">无</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="尿酸异常">
            <el-radio-group v-model="formInfo.have_UA_exc">
              <el-radio :label="true" value="true">有</el-radio>
              <el-radio :label="false" value="false">无</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="症状">
            <el-checkbox-group v-model="formInfo.symptoms">
              <el-checkbox-button label="头痛" name="type"></el-checkbox-button>
              <el-checkbox-button label="头晕" name="type"></el-checkbox-button>
              <el-checkbox-button label="恶心" name="type"></el-checkbox-button>
              <el-checkbox-button label="视线模糊" name="type"></el-checkbox-button>
              <el-checkbox-button label="注意力不集中" name="type"></el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="亲属高血压病史">
            <el-checkbox-group v-model="formInfo.HBP_relations">
              <el-checkbox-button label="爸爸" name="type">爸爸</el-checkbox-button>
              <el-checkbox-button label="妈妈" name="type">妈妈</el-checkbox-button>
              <el-checkbox-button label="爷爷" name="type">爷爷</el-checkbox-button>
              <el-checkbox-button label="奶奶" name="type">奶奶</el-checkbox-button>
              <el-checkbox-button label="外公" name="type">外公</el-checkbox-button>
              <el-checkbox-button label="外婆" name="type">外婆</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="亲属糖尿病史">
            <el-checkbox-group v-model="formInfo.DMS_relations">
              <el-checkbox-button label="爸爸" name="type">爸爸</el-checkbox-button>
              <el-checkbox-button label="妈妈" name="type">妈妈</el-checkbox-button>
              <el-checkbox-button label="爷爷" name="type">爷爷</el-checkbox-button>
              <el-checkbox-button label="奶奶" name="type">奶奶</el-checkbox-button>
              <el-checkbox-button label="外公" name="type">外公</el-checkbox-button>
              <el-checkbox-button label="外婆" name="type">外婆</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="亲属冠心病病史">
            <el-checkbox-group v-model="formInfo.CAD_relations">
              <el-checkbox-button label="爸爸" name="type">爸爸</el-checkbox-button>
              <el-checkbox-button label="妈妈" name="type">妈妈</el-checkbox-button>
              <el-checkbox-button label="爷爷" name="type">爷爷</el-checkbox-button>
              <el-checkbox-button label="奶奶" name="type">奶奶</el-checkbox-button>
              <el-checkbox-button label="外公" name="type">外公</el-checkbox-button>
              <el-checkbox-button label="外婆" name="type">外婆</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveChange">确 定</el-button>
        </div>
      </el-dialog>
    </div>

</template>

<script>
  const SAVEUSERINFO = '/cdm/user/health/detail';
  const UPDATA_USERINFO = '/cdm/user/health/update';
  import Scroll from '../../components/scroll';

	import { mapGetters } from 'vuex'

  export default {
		components: {Scroll},
		//mixins: [MixinSetInterval, MixinRouterState],
		//props: ['goBack'],
    data() {
      return {
        userId:'',
        dialogFormVisible: false,
        formInfo:{
          name:'',//用户名字
          sex:'',//性别
          age:'',//年龄
          user_remarks:'',//用户备注
          weight:'',//体重
          CAD_relations:[],//亲属冠心病病史
          DMS_relations:[],//亲属糖尿病史
          HBP_relations:[],//亲属高血压病史
          bmi:'',//bmi
          custom_tags:'',//用户标签
          exercise:'',//锻炼次数
          have_BL_exc:'',//血脂异常
          have_BS_exc:'',//血糖异常
          have_HTN:'',//有无高血压
          have_UA_exc:'',//尿酸异常
          height:'',//身高
          high_blood:'',//高压
          low_blood:'',//低压
          name:'',//名字
          smoke:'',//吸烟次数
          symptoms:[],//症状
          illness_history:'',
          sleep_time:'',
        },
        user_info:{
          name:'',//用户名字
          sex:'',//性别
          age:'',//年龄
          user_remarks:'',//用户备注
          weight:'',//体重
          CAD_relations:[],//亲属冠心病病史
          DMS_relations:[],//亲属糖尿病史
          HBP_relations:[],//亲属高血压病史
          symptoms:[],//症状
          bmi:'',//bmi
          custom_tags:'',//用户标签
          exercise:'',//锻炼次数
          have_BL_exc:'',//血脂异常
          have_BS_exc:'',//血糖异常
          have_HTN:'',//有无高血压
          have_UA_exc:'',//尿酸异常
          height:'',//身高
          high_blood:'',//高压
          low_blood:'',//低压
          name:'',//名字
          smoke:'',//吸烟次数
          illness_history:'',
          sleep_time:'',
        }
      }
    },
    computed:{
      ...mapGetters(["patientId"]),

    },
    methods: {

      /**
       * 修改用户信息
       */
      async saveChange(){
      	this.formInfo.DMS_relations = JSON.stringify(this.formInfo.DMS_relations);
      	this.formInfo.CAD_relations = JSON.stringify(this.formInfo.CAD_relations);
      	this.formInfo.HBP_relations = JSON.stringify(this.formInfo.HBP_relations);
      	this.formInfo.symptoms = JSON.stringify(this.formInfo.symptoms);
        let result = await this.request.post(UPDATA_USERINFO,{user_id: this.userId, ...this.formInfo});
        console.log('result',result)
        if(result.data.error_code == 0){
          this.dialogFormVisible = false;
          this.reqUserInfo(this.userId).then(data =>{
            this.user_info = data;
          });
          this.$notify({
            type: 'success',
            title:'成功',
            message:'用户信息修改成功',
          });
        }

      },
      /**
       * 请求用户信息
       * @param id
       */
      async reqUserInfo(id){
        let result = await this.request.get(SAVEUSERINFO,{params:{user_id: id}});
        return result.data.user_info
      },
      //点击编辑按钮事件
      editForm(){
        this.dialogFormVisible = true;
        this.formInfo = {...this.user_info};

      }
    },
    mounted(){
      this.userId = this.patientId;
      this.reqUserInfo(this.userId).then(data =>{
        this.user_info = data;
      })
    },
    //computed: {},
		//created () {},
		//updated () {},
	};
</script>
<style lang="scss" rel="stylesheet/scss">
    @import '../../assets/style/mixin.scss';
    .edit_user_info{
      color: #666;
      margin-left:20px;
      margin-top:20px;
      font-weight: 500;
      color: #606266;

      .line{
        height:40px;
        line-height:40px;
        color: #409EFF;
        border-bottom:solid 1px #ececec;
        padding-left:20px;

      }
      .m_edit{
        float: right!important;
        margin-right:50px;
        margin-bottom:5px;
        float: left;
        margin-left:50px;
        position: relative;
        //top: -10px;

      }

      .el-button{

      }

      .eui_item{
        height:30px;
        line-height:30px;
        border-bottom:solid 1px #ececec;
        padding: 5px 20px;
        & span:nth-child(2){
          //color: red;
        }
        .el-tag{
          margin-left:10px;
        }
      }
    }
</style>
