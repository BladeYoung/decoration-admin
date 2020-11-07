<template>
    <div class="portal-container">
        <el-scrollbar ref="el-scrollbar" :native="false">
            <!-- 头部盒子 -->
            <div class="head-box">
                <div class="left-box">
                    <div class="logo"></div>
                    <div class="add">
                        <div class="icon-box">
                            <svg-icon style="height: 15px" className="add" iconClass="add"></svg-icon>
                        </div>
                        <div class="location">{{ '长沙' }}</div>
                    </div>
                </div>
                <div class="center-box">
                    <el-menu :default-active="activeMenu" class="el-menu-class" mode="horizontal" text-color="#303133" active-text-color="#409fff" @select="handleSelect">
                        <el-menu-item index="1">首页</el-menu-item>
                        <el-menu-item index="2">装修报价</el-menu-item>
                        <el-menu-item index="3">预约设计</el-menu-item>
                        <el-menu-item index="4">上门量房</el-menu-item>
                        <el-menu-item index="5">现场参观</el-menu-item>
                        <el-menu-item index="6">联系我们</el-menu-item>
                    </el-menu>
                </div>
                <div class="right-box"></div>
            </div>
            <!-- 走马灯盒子 -->
            <div class="carousel-box">
                <el-carousel :interval="5000" height="100%" arrow="hover">
                    <el-carousel-item v-for="(item, index) in carouselPicPath" :key="index">
                        <img :src="item" height="100%" width="100%" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 服务项目 -->
            <div class="service-box">
                <h2>服务项目</h2>
                <div>心随环境而变,为你打造心的空间!</div>
                <div class="card-box">
                    <el-card v-for="(item, index) in carList" :key="index" :body-style="{ padding: '30px', height: '100%', backgroundColor: item.backgroundColor }" shadow="always">
                        <svg-icon style="height: 50%; width: 100%" :className="item.svgName" :iconClass="item.svgName"></svg-icon>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.content }}</p>
                        <el-button v-if="item.isBtn" type="primary" @click="handleCardBtnClick">{{ item.btnText }}</el-button>
                    </el-card>
                </div>
            </div>
            <!-- 报价弹出框 -->
            <cus-dialog :isOpen.sync="isOpen">提示</cus-dialog>
        </el-scrollbar>
    </div>
</template>

<script>
import { cusDialog } from './components/index'
export default {
    components: { cusDialog },
    data () {
        return {
            activeMenu: '1',
            carouselPicPath: [
                'https://raw.githubusercontent.com/BladeYoung/picgo/master/img/bg01.jpg',
                'https://raw.githubusercontent.com/BladeYoung/picgo/master/img/bg02.jpeg'
            ],
            carList: [
                { backgroundColor: '#fdebed', svgName: 'card1', title: '免费设计', content: '获取三份设计方案，用最诚挚的方式，把好创意搬进您的家。', isBtn: true, btnText: '预约设计' },
                { backgroundColor: '#ebf9f4', svgName: 'card2', title: '全屋定制', content: '融汇行业精英，帮您合理理财规划，打造零缺憾住宅。', isBtn: true, btnText: '预约定制' },
                { backgroundColor: '#fff7e8', svgName: 'card3', title: '全程质检', content: '全程质检，今天您把钥匙给我，明天我给您一个满意的家。', isBtn: false }
            ],
            isOpen: false
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
            if (key == 2) {
                this.isOpen = true
            }
        },
        handleCardBtnClick() {
            this.isOpen = true
        }
    }
}
</script>

<style lang="scss" scoped>
$nav-light: rgba(31, 45, 61, .7);
.flex-row {
    display: flex;
    flex-direction: row;
}

.flex-col {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none !important;
}
.portal-container {
    overflow-y: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .el-scrollbar {
        position: relative;
        height: 100%;
        overflow-x: hidden;
        ::v-deep .el-scrollbar__wrap {
            overflow-x: hidden;
        }
    }

    // 头部样式
    .head-box {
        display: flex;
        min-height: 60px;
        height: 60px;

        .left-box {
            width: 30%;
            display: flex;
            align-items: center;
            justify-content: center;

            .logo {
                height: 100%;
                width: 80px;
                background-image: url('../../assets/logo.jpg');
                background-repeat: no-repeat;
                background-size: 160% 160%;
                background-position: 50% 40%;
            }

            .add {
                background-color: #f3f3f3;
                height: 30px;
                line-height: 30px;
                width: 80px;
                padding-left: 5px;
                color: #999;
                font-size: 13px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                overflow: hidden;

                .icon-box {
                    width: 40%;
                    display: flex;
                    align-items: center;
                }

                .location {
                    height: 30px;
                }
            }
        }

        .center-box {
            width: 40%;

            .el-menu-class {
                height: 100%;
                border-bottom: none;
                display: flex;
                justify-content: center;
                align-items: center;
                .el-menu-item {
                    border-bottom: none;
                    color: $nav-light !important;
                    &.is-active {
                        color: #409EFF !important;
                    }
                }
            }
        }

        .right-box {
            width: 30%;
        }
    }

    // 走马灯盒子
    .carousel-box {
        height: 600px;
        min-height: 600px;
        width: 100%;

        .el-carousel {
            height: 100%;
            
            .el-carousel-item {
                height: 100%;
            }
        }
    }

    // 服务项目
    .service-box {
        height: 600px;
        width: 100%;
        padding: 0 12% 0 12%;
        background-color: #fff;
        @extend .flex-col;

        h2 {
            color: #303133;
        }

        div {
            color: #606266;
        }

        .card-box {
            margin-top: 20px;
            width: 100%;
            height: 100%;
            @extend .flex-row;
            justify-content: space-between;

            .el-card {
                width: 31%;
                height: 450px;
                border: none;

                h3 {
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>