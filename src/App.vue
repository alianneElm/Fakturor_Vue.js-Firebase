<template>
  <div v-if="invoicesLoaded">
    <div class="app-container flex flex-column">
      <Nav/>
      <div class="app flex flex-column">
        <transition name="bill"><BillModel v-if="billModel"/></transition>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Nav from './components/Nav';
import BillModel from './components/BillModel';
import { mapState, mapActions } from 'vuex';
export default{
  components:{
    Nav,
    BillModel,
  },
  created () {
    this.GET_INVOICES();
  },
  methods:{
    ...mapActions(['GET_INVOICES']),
  },
  computed:{
    ...mapState(["billModel", "invoicesLoaded"])
    }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@100;300;500;700&family=Besley:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Besley', serif;
}

.app-container {
  background-color: #0b2009;
  min-height: 100vh;
  @media (min-width: 900px) {
    flex-direction: row !important;
  }

  .app{
    padding: 0 20px;
    flex:1;
    position:relative;
  }
}

.bill-enter-active, .bill-leave-active {
  transition: 1s ease all;
}
.bill-enter-from, .bill-leave-to{
  transform: translateX(-900px);
}

button, .button {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 40px;
  border: none;
  font-size: 12px;
  font-weight: 700;
  margin-right: 8px;
  color: rgb(176, 219, 56);
  box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dark-purple {
  background-color: rgba(173, 211, 70, 0.945);
  color: green;
  box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.red {
  background-color: #f50d0db0;
}

.purple {
  background-color: rgba(6, 48, 23, 0.945);
  color: rgb(23, 214, 39);
  box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.green {
  background-color: #1b9239;
}

.orange {
  background-color: #0d4206;
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }
  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #fbff00;
  }
  color: #fbff00;
  background-color: rgba(255, 251, 0, 0.185);
}

.draft {
  &::before {
    background-color: #f5961a;
  }
  color: #dfe3fa;
  background-color: rgba(226, 65, 37, 0.384);
}
</style>
