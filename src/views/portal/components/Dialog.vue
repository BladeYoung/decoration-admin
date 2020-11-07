<template>
    <el-dialog :visible="isOpen" :before-close="beforeClose" width="70%" @open="open">
        <div class="nav-box">
            <div :class="activeNav == 1? 'nav-item is-active': 'nav-item'" @click="changeActiveNav(1)">
                <div>免费报价</div>
            </div>
            <div :class="activeNav == 2? 'nav-item is-active': 'nav-item'"  @click="changeActiveNav(2)">
                <div>免费设计</div>
            </div>
        </div>
        <!-- 主题内容 -->
        <div class="content-box">
            <div v-if="activeNav == 1" class="get-price">
                <!-- 开始计算盒子 -->
                <div class="calculate-box">
                    <div></div>
                    <div @click="handleCal">开始计算</div>
                    <div></div>
                </div>
                <div class="left-box">
                    <h1>免费获取装修报价</h1>
                    <div>今天已有 <span>2342</span> 位业主获取了装修预算</div>
                    <el-form ref="formPrice" :model="priceForm" :rules="priceFormRules" size="medium" label-width="82px">
                        <el-form-item style="height: 30px" label="所在城市" required>
                            <el-col :span="10">
                                <el-form-item prop="province">
                                    <el-select v-model="priceForm.province" :disabled="true">
                                        <el-option label="湖南省" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item prop="city">
                                    <el-select v-model="priceForm.city" :disabled="true">
                                        <el-option label="长沙" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="房屋面积" prop="area">
                            <el-input v-model="priceForm.area" style="width: 255px" placeholder="请输入您的房屋面积">
                                <i slot="suffix" style="margin-right: 8px">㎡</i>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="priceForm.phone" style="width: 255px" placeholder="请输入您的手机号码"></el-input>
                        </el-form-item>
                        <p>* 为了您的权益，我们将严格保密您的隐私信息</p>
                    </el-form>
                </div>
                <div class="right-box">
                    <h2>您的家装修预算为：<span>{{ budget.total }}</span> 元</h2>
                    <h3>材料费 <span>{{ budget.material }}</span> 元</h3>
                    <h3>人工费 <span>{{ budget.laborCost }}</span> 元</h3>
                    <h3>设计费 <span>{{ budget.designFee }}</span> 元</h3>
                    <h3>质检费 <span>{{ budget.qualityFee }}</span> 元</h3>
                </div>
            </div>
            <!-- 当选择设计页时 -->
            <div v-else class="get-price">
                <div class="calculate-box">
                    <div></div>
                    <div @click="handleApplyFor">立即申请</div>
                    <div></div>
                </div>
                <div class="left-box">
                    <h1>我家也要设计成这样</h1>
                    <el-form ref="formDesign" :model="formDesign" :rules="designFormRules" size="medium" label-width="82px">
                        <el-form-item style="height: 30px" label="所在城市" required>
                            <el-col :span="10">
                                <el-form-item prop="province">
                                    <el-select v-model="formDesign.province" :disabled="true">
                                        <el-option label="湖南省" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item prop="city">
                                    <el-select v-model="formDesign.city" :disabled="true">
                                        <el-option label="长沙" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="您的称呼" prop="name">
                            <el-input v-model="formDesign.name" style="width: 255px" placeholder="请输入您的称呼"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="formDesign.phone" style="width: 255px" placeholder="请输入您的手机号码"></el-input>
                        </el-form-item>
                        <p>* 为了您的权益，我们将严格保密您的隐私信息</p>
                    </el-form>
                </div>
                <div class="right-box">
                    <h2>只需4步，享受专属定制</h2>
                    <div class="step-box">
                        <div class="step-item">
                            <svg-icon style="height: 60px; width: 60px;" className="tel" iconClass="tel"></svg-icon>
                            <div>电话安排量房时间</div>
                        </div>
                        <div class="step-item">
                            <svg-icon style="height: 60px; width: 60px;" className="test" iconClass="test"></svg-icon>
                            <div>专业设计上门量房</div>
                        </div>
                        <div class="step-item">
                            <svg-icon style="height: 60px; width: 60px;" className="order" iconClass="order"></svg-icon>
                            <div>帮您定制预算规划</div>
                        </div>
                        <div class="step-item">
                            <svg-icon style="height: 65px; width: 65px;" className="pic" iconClass="pic"></svg-icon>
                            <div>三个工作日出设计图</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        }
    },
    data () {
        const validateArea = (rule, value, callback) => {
            if (!new RegExp('^-?\\d+(\\.\\d+)?$').test(value)) {
                callback(new Error('请输入有效的数字值'))
            } else {
                callback()
            }
        }
        const validatePhone = (rule, value, callback) => {
            if (!new RegExp('^1(3([0-35-9]\\d|4[1-8])|4[14-9]\\d|5([0125689]\\d|7[1-79])|66\\d|7[2-35-8]\\d|8\\d{2}|9[89]\\d)\\d{7}$').test(value)) {
                callback(new Error('请输入有效的手机号码'))
            } else {
                callback()
            }
        }
        return {
            activeNav: 1,
            priceForm: {
                province: '1',
                city: '1',
                area: '',
                phone: ''
            },
            formDesign: {
                province: '1',
                city: '1',
                name: '',
                phone: ''
            },
            priceFormRules: {
                province: [{ required: true, message: '请选择省份', trigger: 'blur' }],
                city: [{ required: true, message: '请选择城市', trigger: 'blur' }],
                area: [
                    { required: true, message: '请填写面积', trigger: 'blur' },
                    { validator: validateArea, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请填写手机号码', trigger: 'blur' },
                    { validator: validatePhone, trigger: 'blur' }
                ]
            },
            designFormRules: {
                province: [{ required: true, message: '请选择省份', trigger: 'blur' }],
                city: [{ required: true, message: '请选择城市', trigger: 'blur' }],
                name: [
                    { required: true, message: '请填写称呼', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请填写手机号码', trigger: 'blur' },
                    { validator: validatePhone, trigger: 'blur' }
                ]
            },
            budget: { total: 12345, material: 4535, laborCost: 234, designFee: 3423, qualityFee: 2342 },
            timer: () => {} // 定时器
        }
    },
    methods: {
        setTimer() {
            this.timer = setInterval(() => {
                this.budget.total = this.randomNum(80000, 290000)
                this.budget.material = this.randomNum(15000, 10000)
                this.budget.laborCost = this.randomNum(15000, 80000)
                this.budget.designFee = this.randomNum(2000, 5000)
                this.budget.qualityFee = this.randomNum(1600, 6000)
            }, 500)
        },
        randomNum(min, max) {
            return Math.floor(Math.random()*(max-min+1) + min)
        },
        open() {
            this.setTimer()
        },
        beforeClose(done) {
            if (this.activeNav == 1) {
                this.$refs['formPrice'].resetFields()
            } else {
                this.$refs['formDesign'].resetFields()
            }
            clearInterval(this.timer)
            this.$emit('update:isOpen', false)
        },
        changeActiveNav(val) {
            this.activeNav = val
            if (val == 1) {
                this.$nextTick(() => {
                    this.$refs['formPrice'].resetFields()
                })
            } else {
                this.$nextTick(() => {
                    this.$refs['formDesign'].resetFields()
                })
            }
        },
        // 价格计算
        handleCal() {
            console.log('价格计算')
            this.$refs.formPrice.validate(valid => {
                if (valid) {
                    alert('通过')
                }
            })
        },
        // 立即申请
        handleApplyFor() {
            console.log('申请')
            this.$refs.formDesign.validate(valid => {
                if (valid) {
                    alert('通过')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
// 左侧导航栏
.nav-box {
    width: 45px;
    height: 200px;
    position: absolute;
    left: -45px;
    top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #e9e9eb;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    overflow: hidden;

    .is-active {
        border-left: 5px solid #409EFF !important;
        background-color: white;
        color: #409EFF;
    }

    .nav-item {
        height: 100px;
        line-height: 100px;
        width: 100%;
        text-align: center;
        cursor: pointer;
        font-weight: bold;
        border-left: 5px solid #e9e9eb;

        div {
            width: 20px;
            margin: 10px auto;
            height: 100%;
            line-height: 20px;  
            font-size: 14px;
        }
    }
}

// 计算按钮盒子
.calculate-box {
    height: 100%;
    width: 100px;
    position: absolute;
    top: 0;
    left: 45%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
        width: 1px;
        &:nth-child(2n-1) {
            height: 40%;
            background-color: #EBEEF5;
            flex-grow: 1
        }
        &:nth-child(2) {
            cursor: pointer;
            width: 80px;
            height: 80px;
            line-height: 20px;
            letter-spacing: 2px;
            padding: 24px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: #67C23A;
            z-index: 10;

            &::after {
                content: "";
                position: absolute;
                z-index: -10;
                width: 75px;
                height: 75px;
                background-color: #67C23A;
                border-radius: 100px;
                -webkit-animation: wave 1s linear infinite both;
                animation: wave 1s linear infinite both;

                @keyframes wave {
                    0% {
                        transform: scale(1);
                        opacity: .8;
                    }
                    100% {
                        transform: scale(1.3);
                        opacity: 0;
                    }
                }
            }
        }
    }
}

// 自定义 dialog 样式
::v-deep .el-dialog {
    border-radius: 20px;
    min-width: 1060px;

    .content-box {
        height: 350px;

        .get-price {
            height: inherit;
            display: flex;

            .left-box {
                width: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                span {
                    color: #e6a23c;
                }

                h1 {
                    color: #409EFF;
                }
                .el-form {
                    width: 80%;
                    margin-top: 20px;

                    p {
                        font-size: 12px;
                        color: #e6a23c;
                        margin-left: 5px;
                    }
                }

                .el-select {
                    width: 120px;
                }
            }
            .right-box {
                @extend .left-box;
                padding-top: 5px;

                h2, h3 {
                    color: #409EFF;

                    span {
                        color: #e6a23c;
                        margin: 0 10px;
                    }
                }
                .step-box {
                    height: 100%;
                    width: 100%;
                    padding: 25px 90px;
                    display: flex;
                    flex-wrap: wrap;

                    .step-item {
                        width: 160px;
                        height: 90px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>