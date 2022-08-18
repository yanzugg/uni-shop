 import {mapGetters} from 'vuex'

 export default {
    computed:{
      ...mapGetters('m_cart',['total'])
    },
    watch:{
      total(){
        this.setBandge()
      }
    },
    onShow(){
      this.setBandge()
    },
    methods:{
      setBandge(){
        uni.setTabBarBadge({
          index:2,
          text:this.total+''
        })
      }
    }
   }