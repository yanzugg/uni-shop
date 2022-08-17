<template>
  <view>
    <view class="search-box">
      <uni-search-bar @confirm="search" @input="input" placeholder="请输入搜索内容" :radius="100" cancelButton="none"></uni-search-bar>
   </view>
   
   <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="serachResult.length">
       <view class="sugg-item" v-for="(item,i) in serachResult" :key="i" @click="gotoDetail(item)">
          <view class="goods-name">{{item.goods_name}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
       </view>
    </view>
    
    <!-- 搜索历史 -->
     <view class="history-box" v-else>
       <!-- 标题区域 -->
       <view class="history-title">
         <text>搜索历史</text>
         <uni-icons type="trash" size="17" @click="clean"></uni-icons>
       </view>
       <!-- 列表区域 -->
       <view class="history-list">
         <uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="goodsList(item)"></uni-tag>
       </view>
     </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer:null,
        kw:'',
        serachResult:[],
        historyList:[]
      }; 
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || [])
    },
    methods:{
      input(e){
        if(this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
        this.kw =e
        this.getSearchList()
        },500)
      },
     async getSearchList(){
        if(this.kw.length===0){
          this.serachResult = []
          return 
        }
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
        if(res.meta.status!==200) return uni.$showMsg()
        this.serachResult = res.message
        this.saveSerachHistory()
      },
      gotoDetail(item){
         uni.navigateTo({
           url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
         })
      },
      saveSerachHistory(){
        // this.historyList.unshift(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
      this.historyList =   Array.from(set)
      uni.setStorageSync('kw',JSON.stringify(this.historyList))
        
      },
      clean(){
        this.historyList = []
        uni.removeStorageSync('kw')
      },
      goodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query='+kw
        })
      }
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  body{
    background-color: #fff;
  }
.search-box{
  position: sticky;
 top: 0;
 z-index: 999;
}
.sugg-list{
  padding: 0px 5px;
  
  .sugg-item{
    display: flex;
  border-bottom: 1px solid #efefef;
  justify-content: space-between;
  font-size:12px ;
  align-items: center;
  padding: 13px 0;
  
  .goods-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  }
}
.history-box{
  padding: 0px 5px;
  
  .history-title{
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  
  .history-list{
     display: flex;
     flex-wrap: wrap;

     .uni-tag{
       margin-top: 5px;
       margin-right: 5px;
     }
  }
}
</style>
