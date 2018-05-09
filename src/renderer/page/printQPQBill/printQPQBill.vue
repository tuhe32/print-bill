<style scoped>
	@import url("../../../../static/css/printQPQBill.css");
  .printBatch_preview{padding: 20px 0;}
  .printBatch_preview .button_action{height:auto; overflow:hidden; padding: 10px 30px; text-align: right;}
  .printBatch_preview .button_action .el-button{width:120px;}
  .printBatch_preview ul{ height:auto; overflow:hidden; margin:20px 10px;}
  .printBatch_preview li{float: left; display: inline; margin:10px 20px;}
  .printBatch_preview li .preview_box{}
  .printBatch_preview li .preview_tit{text-align: center; font-size: 18px; color: #4b2f20; font-weight: normal;}
  .printBatch_preview li .preview_st{text-align: center; font-size: 14px; color: #684f3a;}
</style>
<template>
  <section>
    <el-col :span="24" class="contentBox printBatch_preview" v-loading="loading">
      <div class="button_action">
        <el-button type="darkBrown" @click="printBatchClick" style="float: right;">打印</el-button>
      </div>
      <ul id="print_batch">
        <li class="printBill_box" >
	        <div class="con">
	           <p class="p1">
	           	<span class="p1_a1">{{bill.year}}</span>
	           	<span class="p1_a2">{{bill.month}}</span>
	           	<span class="p1_a3">{{bill.day}}</span>
	           </p>
	           <p class="p2">
	           	<span class="p2_a1">{{bill.name}}</span>
	           </p>
	           <p class="p3">
	           	 <span class="p3_a1">{{bill.info}}</span>
	           </p>
	           <p class="p4">
	           		<span class="p4_a1">{{bill.buddhist}}</span>
	           		<span class="p4_a2">{{bill.paiweiCode}}</span>
	           		<span class="p4_a3">{{bill.phone}}</span>
	           </p>
	           <p class="p5">
	           		<span class="p5_a1">{{bill.address}}</span>
	           </p>
	           <p class="p6">
	           		<span class="p6_a1">{{bill.bigMoney}}</span>
	           		<span class="p6_a2">{{bill.money}}</span>
	           </p>
	           <p class="p7">
	           	<span class="p7_a1">{{bill.handleMan}}</span>
	           </p>
	        </div>
	        <img class="bgimg" src="~@/assets/tgcssj.jpg"/>
        </li>

      </ul>
    </el-col>
    <div></div>
  </section>
</template>
<script>
  import '@/utils/jquery.PrintArea'

  export default {
    data() {
      return {
        loading:false,
        respData: {
          cardList:[],
        },
        dataList:[],
        bill:{},
        printBatchConfig:{
          checked:false,
          numZuo:'一',
          title:"佛力超荐",
          printPaiwei:'外坛-延生大牌位'
        },
        printRitualMembers:[],
        buddhistCardIDList:[],
      }
    },
    methods: {
      printBatchClick() {
        let option = {
          extraCss:this.baseWebUrl + '/static/css/printQPQBill.css'
        };
        $('#print_batch').printArea(option);
      },
      loadData() {
        this.loading = true;
        this.axios({
          method: 'post',
          url: this.baseUrl + 'buddhistCard/findBatchBuddhistCard',
          data: {ids:this.buddhistCardIDList}
        }).then((resp) => {
          console.log("resp",resp)
          if(this.qUtil.validResp(resp.data)) {
            let buddhistCardPrintList = resp.data.result.buddhistCardPrintList;
            if(this.baseUtil.isNotBlankObj(buddhistCardPrintList) && buddhistCardPrintList.length > 0) {
              this.respData.cardList = buddhistCardPrintList;
            }
          } else {
            this.$notify({ title: '加载佛事卡片失败', message: resp.data.respMsg });
          }
          this.loading = false;
        }).catch((err) => {
          this.loading = false
        })
      },
      getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]); return ''; //返回参数值
      },
    },
    created() {
      let billUrl = this.getUrlParam("bill");
      let bill = JSON.parse(billUrl)
      if(bill != null && bill != undefined )  {
        if(this.baseUtil.isNotBlank(bill.money)) {
          bill.bigMoney = this.fmUtil.smalltoBIG(bill.money);
        }
        this.bill = bill;
      }
      // if((typeof ids) === 'string') {
      //   this.buddhistCardIDList.push(ids);
      // }else {
      //   this.buddhistCardIDList = ids;
      // }
      // this.loadData();
    }
  }
</script>

