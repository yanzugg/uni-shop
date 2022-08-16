<template>
  <view>
    <!-- 自定义搜索组件 -->
     <my-search @click="gotoSeach"></my-search>
     <view class="scroll-view-container">
        <!-- 左侧滑动 -->
        <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh+'px'}">
           <block v-for="(item,i) in cateList"  :key="i">
                 <view class="left-scroll-view-item " :class="{active:active===i}" @click="activeChange(i)">{{item.cat_name}} </view>
           </block>
        </scroll-view>
        
        <!-- 右侧滑动 -->
        <scroll-view  class="right-scroll-view"  scroll-y="true"  :style="{height: wh+'px'}"  :scroll-top="scrollTop">
         <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
           <!-- 二级分类标题 -->
            <view class="cate-lv2-title"> /{{item2.cat_name}}/ </view>
            <!-- 三级分类列表 -->
            <view class="cate-lv3-list">
              <!-- 三级分类item项 -->
              <view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
                 <image :src="item3.cat_icon" mode=""></image>
                 <text>{{item3.cat_name}}</text>
              </view>
            </view>
         </view>
        </scroll-view>
     </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
         wh:0,
         cateList:[],
         active:0,
         cateLevel2:[],
         scrollTop:0
      };
    },
    onLoad(){
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight -50
      this.getCateList()
    },
    methods:{
      async getCateList(){
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status!==200)return uni.$showMsg()
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      activeChange(i){
        this.active= i
        this.scrollTop = this.scrollTop===0 ? 1 :0
       this.cateLevel2 =  this.cateList[i].children
      },
      gotoGoodsList(item3){
        uni.navigateTo({
           url:'/subpkg/goods_list/goods_list?cid='+item3.cat_id
        })
      },
      gotoSeach(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
  
  .left-scroll-view{
    width:120px;
    
    .left-scroll-view-item{
      background-color: #F7F7F7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active{
        background-color: #fff;
        position: relative;
        &:before{
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
          position: absolute;
          top: 25%;
          left: 0;
        }
      }
    }
  }
  .right-scroll-view{
    background-color: #fff;
  }
  .cate-lv2-title{
      text-align: center;
      font-weight: bold;
      font-size: 12px;
      padding: 15px;
  }
  .cate-lv3-list{
    display: flex;
    flex-wrap: wrap;
    
    .cate-lv3-item{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
      margin-bottom: 10px;
      
      image{
        width: 60px;
        height: 60px;
      }
      
      text{
        font-size: 12px;
      }
    }
  }
}

</style>
