<style>
    @import url("../../../static/css/printQPQBill.css");
</style>
<template>
    <section>
        <!--<el-button   @click="showBill" >打印发票</el-button>-->
        <div class="breadcrumb-container">
            <div class="title" style="float: left; font-size:16px;">票据管理</div>
                <el-input
                        style="width:180px;float: right;"
                        placeholder="发票信息"
                        icon="search"
                        v-model="params.key"
                        @keyup.native.enter="byKeyQuery"
                        :on-icon-click="byKeyQuery">
                </el-input>
                <el-date-picker v-model="params.periods" style="float: right;width:150px; margin-right: 10px;" type="date" placeholder="选择日期"
                                @change="onDateChange" format="yyyy.MM.dd"></el-date-picker>
                <el-button style="width:120px;float: right;margin-right: 10px;" v-if="!isNewBill" @click="showNewBill" >返回录入票据</el-button>
        </div>

        <!--列表-->
        <el-table :data="resp.listData" v-if="!isNewBill" highlight-current-row v-loading="listLoading" element-loading-text="寻找自我" stripe   :height="tableHeight" >
            <el-table-column prop="invoiceDate" label="日期" align="center" min-width="130" :formatter="fmInvoiceDate">
            </el-table-column>
            <el-table-column prop="payer" align="center" label="付款单位" min-width="160"></el-table-column>
            <el-table-column prop="information" align="center" label="法务信息" min-width="160"></el-table-column>
            <el-table-column prop="fahui" align="center" label="法会" min-width="160"></el-table-column>
            <el-table-column prop="paiweiNumber" align="information" label="牌位号" min-width="160"></el-table-column>
            <el-table-column prop="phone" align="center" label="电话" min-width="130"></el-table-column>
            <el-table-column prop="address" align="center" label="地址" min-width="160"></el-table-column>
            <el-table-column prop="money" align="center"  label="合计人民币" min-width="120"></el-table-column>
            <el-table-column prop="payee" align="center" label="收款人" min-width="120"></el-table-column>
            <el-table-column label="操作" align="center" min-width="130">
                <template scope="scope">
                    <el-button size="small" type="darkBrown" @click="printBilldForQPQ(scope.$index, scope.row)"><i
                            class="iconfont icon-bianji"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="pagebar" v-if="!isNewBill">
            <el-pagination layout="prev, pager, next,sizes,jumper"
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :page-sizes="[10,30,50,80,100]"
                           :current-page = "params.page.page"
                           :page-size="params.page.pageSize"
                           :total="resp.total"
                           style="float:right;">
            </el-pagination>
        </el-col>
        <div class="clearfix"></div>
        <div  title="打印发票收据" class="dialog_printQPQBill" v-if="isNewBill">
            <div class="dialog_con">
                <div class="printQPQBill_area">
                    <ul class="con">
                        <li style="margin-top:93px">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.year" style="margin:0 0 0 40px; text-align: center; width:60px;">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.month" style="margin:0 0 0 21px; text-align: center; width:40px;">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.day" style="margin:0 0 0 20px; text-align: center; width:40px;">
                        </li>
                        <li style="margin-top:20px">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.payer" style="margin:0 0 0 150px; width:420px;">
                        </li>
                        <li style="margin-top:35px">
                            <textarea placeholder="请输入" rows="6" v-model="InvoiceForm.information" style="margin:0px 0 0 150px; width:420px;"></textarea>
                        </li>
                        <li style="margin-top:22px">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.fahui" style="margin:0px 0 0 150px; width:150px;">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.paiweiNumber" style="margin:0 0 0 45px; width:85px;">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.phone" style="margin:0 0 0 30px; width:100px;">
                        </li>
                        <li style="margin-top:14px">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.address" style="margin:0px 0 0 150px; width:420px;">
                        </li>
                        <li style="margin-top:13px">
                            <input type="text" placeholder="" disabled="disabled"  style="margin:0px 0 0 205px; width:200px;">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.money" style="margin:0px 0 0 50px; width:100px;">
                        </li>
                        <li style="margin-top:13px">
                            <input type="text" placeholder="请输入" v-model="InvoiceForm.payee" style="margin:0px 0 0 450px; width:120px;">
                        </li>
                    </ul>
                    <img class="bgimg" src="~@/assets/tgcssj.jpg"/>
                </div>
            </div>
            <div class="dialog_btn">
                <el-button :plain="true" type="bordYellow" @click="isShowBill = false">取 消</el-button>
                <el-button :plain="true" type="darkYellow" @click="saveInvoiceAndPrint">保存并打印</el-button>
            </div>
        </div>
    </section>
</template>
<script>
    import Invoice from '@/model/invoice/Invoice';

    export default {
        data() {
            return {
                tableHeight: Math.max(document.body.scrollHeight,document.documentElement.scrollHeight) - 406,
                isShowBill:true,
                InvoiceForm:this.baseUtil.modelCopy(Invoice),
                params: {
                    key: '',
                    periods:null,
                    page: {
                        page: 1,
                        pageSize: 10
                    },
                    sort: {
                        order: '',
                        sort: ''
                    }
                },
                resp: {
                    listData: [],
                    total: 0,
                },
                isNewBill:true,
                listLoading: false,
            }
        },
        methods: {
            byKeyQuery(){
                this.loadData()
            },
            onDateChange(){
                //时间段查询
                this.loadData()
            },
            fmInvoiceDate(row, column){
                return this.fmUtil.fmDate(row.invoiceDate, 'yyyy.MM.dd')
            },
            loadData () {
                this.listLoading = true;
                let paramKey = this.baseUtil.modelCopy(this.params.key);
                if(this.baseUtil.isBlank(paramKey)) paramKey = ' ';
                let key = eval("/"+paramKey+"/");
                let that = this;
                this.$db.find({ $or : [{information: key},{fahui:key},{paiweiNumber:key},{phone:key},{address:key},{payee:key}]  })
                    .skip(this.params.page).limit(this.params.pageSize).exec(function (err, bills) {
                    if(that.baseUtil.isNotBlankObj(bills) && bills.length > 0) {
                        that.isNewBill = false;
                        that.resp.listData = bills;
                        that.resp.total = bills.length;
                    }else {
                        that.$message({showClose: true,message: '没有查询到任何数据',type: 'error'});
                    }
                    that.listLoading = false;
                });
            },
            handleSizeChange(val){
                this.params.page.pageSize = val;
                this.loadData();
            },
            handleCurrentChange(val) {
                this.params.page.page = val;
                this.loadData();
            },
            showNewBill() {
                this.isNewBill = true;
            },
            showBill() {
                console.log(666)
                this.isShowBill = true;
                var doc = { hello: 'world'
                    , n: 5
                    , today: new Date()
                    , nedbIsAwesome: true
                    , notthere: null
                    , notToBeSaved: undefined  // Will not be saved
                    , fruits: [ 'apple', 'orange', 'pear' ]
                    , infos: { name: 'nedb' }
                };
                // this.$db.insert(doc,function (err,newDoc) {
                //     console.log(666,newDoc)
                // })
                this.$db.find({ information: 'world' }, function (err, docs) {
                    // docs is an array containing documents Mars, Earth, Jupiter
                    // If no document is found, docs is equal to []
                    console.log(666,docs)
                });
            },
            saveInvoiceAndPrint() {
                if(!this.baseUtil.isNotBlank(this.InvoiceForm.payer)) {
                    this.$message({showClose: true,message: '请填写付款单位或个人信息',type: 'error'});
                    return;
                }
                if(!this.baseUtil.isNotBlank(this.InvoiceForm.money)) {
                    this.$message({showClose: true,message: '请填写款项金额',type: 'error'});
                    return;
                }
                this.$db.insert(this.InvoiceForm,function (err,newInvoice) {
                    console.log(666,newInvoice)
                })
                this.printBilldForQPQ();
            },
            //显示编辑界面
            printBilldForQPQ() {
                let bill = this.baseUtil.modelCopy(this.InvoiceForm);
                let commonStr = "";
                if(this.baseWebUrl != null && this.baseWebUrl != undefined && this.baseWebUrl.trim() != '') {
                    commonStr += "/index.html";
                }
                window.open(this.baseWebUrl+commonStr+""+"?bill="+JSON.stringify(bill)+"#/printQPQBill");
            },
        }
    }
</script>