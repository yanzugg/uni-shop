<template>
 <view class="goods-item">
   <!-- 左侧盒子 -->
   <view class="goods-itemp-left">
      <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
     <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
   </view>
   <!-- 右侧盒子 -->
   <view class="goods-item-right">
     <!-- 商品名字 -->
     <view class="goods-name">{{goods.goods_name}}</view>
     <view class="goods-info-box">
     <!-- 商品价格 -->
       <view class="goods-price">￥{{goods.goods_price |toFixed}}</view>
       <!-- 商品数量 -->
       <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
     </view>
   </view>
 </view>
</template>

<script>
  export default {
    name:"my-goods",
    filters:{
       toFixed(num){
         return Number(num).toFixed(2)
       }
    },
    props:{
      goods:{
        type:Object,
        default:{}
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods:{
      radioClickHandler(){
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      numChangeHandler(val){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:+val
        })
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
    display: flex;
    padding: 10px 5px;
    width: 750rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #f0f0f0;
    
   .goods-itemp-left{
     margin-right: 5px;
     display: flex;
     justify-content: space-between;
     align-items: center;
     .goods-pic{
       width: 100px;
       height: 100px;
       display: block;
       margin-right: 5px;
     }
   }
   .goods-item-right{
     display: flex;
     flex: 1;
     flex-direction: column;
     justify-content: space-between;
     .goods-name{
       font-size: 13px;
     }
     .goods-info-box{
       display: flex;
       align-items: center;
       justify-content: space-between;
       .goods-price{
         color: #C00000;
         font-size: 16px;
       }
     }
   }
 }
</style>