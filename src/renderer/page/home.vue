<style>
    @import url("../../../static/css/printQPQBill.css");
</style>
<template>
    <section>
        <el-button   @click="showBill" >打印发票</el-button>
        <!-- 打印发票 -->
        <div  title="打印发票收据" class="dialog_printQPQBill">
            <div class="dialog_con">
                <div class="printQPQBill_area">
                    <ul class="con">
                        <li style="margin-top:108px">
                            <input type="text" placeholder="请输入" v-model="bill.year" style="margin:0 0 0 70px; text-align: center; width:60px;">
                            <input type="text" placeholder="请输入" v-model="bill.month" style="margin:0 0 0 21px; text-align: center; width:40px;">
                            <input type="text" placeholder="请输入" v-model="bill.day" style="margin:0 0 0 20px; text-align: center; width:40px;">
                        </li>
                        <li style="margin-top:20px">
                            <input type="text" placeholder="请输入" v-model="bill.name" style="margin:0 0 0 190px; width:420px;">
                        </li>
                        <li style="margin-top:35px">
                            <textarea placeholder="请输入" rows="5" v-model="bill.info" style="margin:0px 0 0 190px; width:420px;"></textarea>
                        </li>
                        <li style="margin-top:11px">
                            <input type="text" placeholder="请输入" v-model="bill.buddhist" style="margin:0px 0 0 190px; width:150px;">
                            <input type="text" placeholder="请输入" v-model="bill.paiweiCode" style="margin:0 0 0 45px; width:85px;">
                            <input type="text" placeholder="请输入" v-model="bill.phone" style="margin:0 0 0 30px; width:100px;">
                        </li>
                        <li style="margin-top:13px">
                            <input type="text" placeholder="请输入" v-model="bill.address" style="margin:0px 0 0 190px; width:420px;">
                        </li>
                        <li style="margin-top:13px">
                            <input type="text" placeholder="" disabled="disabled"  style="margin:0px 0 0 250px; width:200px;">
                            <input type="text" placeholder="请输入" v-model="bill.money" style="margin:0px 0 0 50px; width:100px;">
                        </li>
                        <li style="margin-top:12px">
                            <input type="text" placeholder="请输入" v-model="bill.handleMan" style="margin:0px 0 0 490px; width:120px;">
                        </li>
                    </ul>
                    <img class="bgimg" src="~@/assets/tgcssj.jpg"/>
                </div>

            </div>
            <div class="dialog_btn">
                <el-button :plain="true" type="bordYellow" @click="isShowBill = false">取消</el-button>
                <el-button :plain="true" type="darkYellow" @click="printBilldForQPQ">打 印</el-button>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                isShowBill:true,
                bill:{
                    year:"",
                    month:"",
                    day:"",
                    name:"",
                    info:"",
                    buddhist:"",
                    paiweiCode:"",
                    phone:"",
                    address:"",
                    money:"",
                    handleMan:""
                }
            }
        },
        methods: {
            showBill() {
                console.log(666)
                this.isShowBill = true;
            },
            //显示编辑界面
            printBilldForQPQ() {
                let bill = this.baseUtil.modelCopy(this.bill);
                let commonStr = "";
                if(this.baseWebUrl != null && this.baseWebUrl != undefined && this.baseWebUrl.trim() != '') {
                    commonStr += "/index.html";
                }
                window.open(this.baseWebUrl+commonStr+""+"?bill="+JSON.stringify(bill)+"#/printQPQBill");
            },
        }
    }
</script>