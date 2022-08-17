<template>
 <view class="goods-item">
   <!-- 左侧盒子 -->
   <view class="goods-itemp-left">
     <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
   </view>
   <!-- 右侧盒子 -->
   <view class="goods-item-right">
     <!-- 商品名字 -->
     <view class="goods-name">{{goods.goods_name}}</view>
     <view class="goods-info-box">
     <!-- 商品价格 -->
       <view class="goods-price">￥{{goods.goods_price |toFixed}}</view>
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
      }
    },
    data() {
      return {
        defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    }
  }
</script>

<style lang="scss">
.goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
   .goods-itemp-left{
     .goods-pic{
       width: 100px;
       height: 100px;
       display: block;
       margin-right: 5px;
     }
   }
   .goods-item-right{
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     .goods-name{
       font-size: 13px;
     }
     .goods-info-box{
       .goods-price{
         color: #C00000;
         font-size: 16px;
       }
     }
   }
 }
</style>