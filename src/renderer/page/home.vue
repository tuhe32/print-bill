<style>
    @import url("../../../static/css/printQPQBill.css");
</style>
<template>
    <section>
        <!--<el-button   @click="showBill" >打印发票</el-button>-->
        <div class="breadcrumb-container">
            <div class="title" style="float: left; color: #4b2f20; font-weight: bold; font-size:20px; margin:8px 0 0 20px;">收据打印</div>
            <el-input
                    style="width:180px;float: right;"
                    placeholder="收据信息"
                    icon="search"
                    v-model="params.key"
                    @keyup.native.enter="byKeyQuery"
                    :on-icon-click="byKeyQuery">
            </el-input>
            <el-date-picker v-model="params.periods" style="float: right;width:250px; margin-right: 10px;" type="daterange"range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期"
                            @change="onDateChange" format="yyyy.MM.dd"></el-date-picker>
            <el-button type="primary" style="width:120px;float: right;margin-right: 10px;" v-if="!isNewBill" @click="showNewBill" >返回录入票据</el-button>
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
            <el-table-column label="操作" align="center" min-width="100" fixed="right">
                <template scope="scope">
                    <el-button  type="primary" round @click="printDataBill(scope.$index, scope.row)" icon="el-icon-printer"></el-button>
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
        <div  title="打印收据收据" class="dialog_printQPQBill" v-if="isNewBill">
            <div class="dialog_con">
                <div class="printQPQBill_area">
                    <ul class="con">
                        <li style="margin-top:93px">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.year" style="margin:0 0 0 40px; text-align: center; width:60px;">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.month" style="margin:0 0 0 21px; text-align: center; width:40px;">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.day" style="margin:0 0 0 20px; text-align: center; width:40px;">
                        </li>
                        <li style="margin-top:20px">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.payer" style="margin:0 0 0 150px; width:420px;">
                        </li>
                        <li style="margin-top:35px">
                            <textarea placeholder="请输入" rows="6" v-model="invoiceForm.information" style="margin:0px 0 0 150px; width:420px;"></textarea>
                        </li>
                        <li style="margin-top:22px">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.fahui" style="margin:0px 0 0 150px; width:150px;">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.paiweiNumber" style="margin:0 0 0 45px; width:85px;">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.phone" style="margin:0 0 0 30px; width:100px;">
                        </li>
                        <li style="margin-top:14px">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.address" style="margin:0px 0 0 150px; width:420px;">
                        </li>
                        <li style="margin-top:13px">
                            <input type="text" placeholder="" disabled="disabled"  style="margin:0px 0 0 205px; width:200px;">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.money" style="margin:0px 0 0 50px; width:100px;">
                        </li>
                        <li style="margin-top:13px">
                            <input type="text" placeholder="请输入" v-model="invoiceForm.payee" style="margin:0px 0 0 450px; width:120px;">
                        </li>
                    </ul>
                    <img class="bgimg" src="~@/assets/tgcssj.jpg"/>
                </div>
            </div>
            <div class="dialog_btn">
                <el-button :plain="true" type="info" @click="clearBillData">取 消</el-button>
                <el-button type="success" @click="saveInvoiceAndPrint">保存并打印</el-button>
            </div>
        </div>
    </section>
</template>
<script>
    import Invoice from '@/model/invoice/Invoice';

    export default {
        data() {
            return {
                tableHeight: Math.max(document.body.scrollHeight,document.documentElement.scrollHeight) - 100,
                isShowBill:true,
                invoiceForm:this.baseUtil.modelCopy(Invoice),
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
            clearBillData() {
                this.invoiceForm = this.baseUtil.modelCopy(Invoice)
            },
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
                this.clearBillData();
                this.listLoading = true;
                let searchParam = {},arrParam = {},dateQuery = {};
                let arrKey = [];
                let dateKey = this.baseUtil.modelCopy(this.params.periods);
                if(this.baseUtil.isNotBlankObj(dateKey)) {
                    dateQuery = {invoiceDate:{$gte: new Date(dateKey[0]),$lte:new Date(dateKey[1])}}
                }
                let paramKey = this.baseUtil.modelCopy(this.params.key);
                if(this.baseUtil.isNotBlank(paramKey)) {
                    let key = eval("/"+paramKey+"/");
                    arrKey.push({payer: key})
                    arrKey.push({information: key})
                    arrKey.push({fahui:key})
                    arrKey.push({paiweiNumber:key})
                    arrKey.push({phone:key})
                    arrKey.push({address:key})
                    arrKey.push({money:key})
                    arrKey.push({payee:key})
                    arrParam = { $or : arrKey  }
                }
                if(JSON.stringify(dateQuery) != "{}" || JSON.stringify(arrParam) != "{}") {
                    searchParam = {$and :[dateQuery,arrParam]}
                }
                let page = parseInt(this.params.page.page);
                let pageSize = parseInt(this.params.page.pageSize)
                let startPages =( page - 1 )* pageSize
                let that = this;
                this.$db.count(searchParam,function (err, count) {
                    that.resp.total = count;
                })
                this.$db.find(searchParam).sort({"createAt":-1})
                    .skip(startPages).limit(pageSize)
                    .exec(function (err, bills) {
                        if(that.baseUtil.isNotBlankObj(bills) && bills.length > 0) {
                            that.isNewBill = false;
                            that.resp.listData = bills;
                        }else {
                            that.resp.listData = [];
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
                    // console.log(666,docs)
                });
            },
            printDataBill(index,item) {
                let bill = this.baseUtil.modelCopy(item);
                this.printBillForQPQ(bill);
            },
            saveInvoiceAndPrint() {
                if(!this.baseUtil.isNotBlank(this.invoiceForm.payer)) {
                    this.$message({showClose: true,message: '请填写付款单位或个人信息',type: 'error'});
                    return;
                }
                if(!this.baseUtil.isNotBlank(this.invoiceForm.money)) {
                    this.$message({showClose: true,message: '请填写款项金额',type: 'error'});
                    return;
                }
                if(!this.baseUtil.isNotBlank(this.invoiceForm.year) || !this.baseUtil.isNotBlank(this.invoiceForm.month) || !this.baseUtil.isNotBlank(this.invoiceForm.day) ) {
                    this.$message({showClose: true,message: '请填写完整收据日期',type: 'error'});
                    return;
                }
                this.invoiceForm.createAt = new Date();
                let date = this.invoiceForm.year+"."+this.invoiceForm.month+"."+this.invoiceForm.day
                this.invoiceForm.invoiceDate =  new Date(date);
                if(this.invoiceForm.invoiceDate =="Invalid Date" || this.baseUtil.isBlank(this.invoiceForm.invoiceDate) ){
                    this.$message({showClose: true,message: '请检查收据日期格式',type: 'error'});
                    return;
                }
                this.$db.insert(this.invoiceForm,function (err,newInvoice) {
                    // console.log(666,newInvoice)
                })
                let bill = this.baseUtil.modelCopy(this.invoiceForm);
                this.printBillForQPQ(bill);
            },
            //显示编辑界面
            printBillForQPQ(bill) {
                let commonStr = "";
                if(this.baseWebUrl != null && this.baseWebUrl != undefined && this.baseWebUrl.trim() != '') {
                    commonStr += "/index.html";
                }
                window.open(this.baseWebUrl+commonStr+""+"?bill="+JSON.stringify(bill)+"#/printQPQBill","打印窗口","width="+1000+",height="+666);
            },
        }
    }
</script>