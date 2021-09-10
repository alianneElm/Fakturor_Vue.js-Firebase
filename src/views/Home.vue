<template>
  <div class="home container">
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Fakturor</h1>
        <span>Det finns totalt 4 fakturor</span>
      </div>
      <div class="right flex flex">
        <div @click="filterMenuFunction" class="filter flex" ref="filter">
          <span>Filter</span>
          <img src="@/assets/icon-arrow-down.svg">
          <ul v-show="filterMenu" class="filter-menu">
            <li>Utkast</li>
            <li>Utestående</li>
            <li>Betald</li>
            <li>Rensa filter</li>
          </ul>
        </div>
        <div @click="newBill" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg">
          </div>
          <span>Ny Faktura</span>
        </div>
      </div> 
      
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Home",

  data() {
    return {
      filterMenu: null,
      }
  },
  components: {},

  methods: {
    ...mapMutations(['TOGGLE_BILL']),

    newBill(){
      this.TOGGLE_BILL();
    },
    filterMenuFunction(){
      this.filterMenu = !this.filterMenu;
    },
  },
}

</script>

<style lang="scss" scoped>
.home {
  color:rgb(214, 228, 196);

  .header{
    margin-bottom: 65px;

    .left, .right{
      flex:1;
    }
    .right{
      justify-content: flex-end;
      align-items: center; 
    
      .button, .filter{
        align-items: center;
        color: #fff;
        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        span{
          font-size: 10px;
          font-weight: 100;
          letter-spacing: 0.9px;
        }
      }

      .filter{
        cursor: pointer;
        position: relative;
        margin-right: 80px;
        box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        span, img{
          pointer-events: none;
        }
        img{
          margin-left: 6px;
          width:9px;
          height:6px;
        }

        .filter-menu{
          width: 110px ;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: rgba(37, 82, 26, 0.336);
          border-radius: 10px;
          box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li{
            cursor: pointer;
            font-size: 12px;
            padding: 5px 20px;

            &:hover{
              color:rgb(37, 82, 26);
              background-color: rgba(238, 243, 237, 0.767);
              border-radius: 15px;
              font-weight: 400;
            }
          }

        }
      }
      .button{
        padding: 5px 10px;
        background-color: rgba(88, 167, 118, 0.445);
        border-radius: 50px;

        .inner-button{
          margin-right: 5px;
          border-radius:50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: rgba(173, 199, 183, 0.979);
          color:rgb(184, 29, 184);
          img{
            width: 10px;
            height:10px;
            
            
          }

        }
      }

    }
  }
}
</style>