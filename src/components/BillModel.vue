<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
      <form @submit.prevent="submitForm"  class="invoice-content">
          <h1 v-if="!editInvoice">Ny Faktura</h1>
          <h1 v-else>Redigera Faktura</h1>
          <div class="bill-from flex flex-column">
                <h4>Faktura från</h4>
                <div class="input flex flex-column">
                    <label for="billerStreetAddress">Adress</label>
                    <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress">
                </div>
                <div class="location-details flex">
                  <div class="input flex flex-column">
                      <label for="billerCity">Stad</label>
                      <input required type="text" id="billerCity" v-model="billerCity">
                  </div>
                  <div class="input flex flex-column">
                    <label for="billerZipCode">Postnummer</label>
                    <input required type="text" id="billerZipCode" v-model="billerZipCode">
                  </div>
                  <div class="input flex flex-column">
                    <label for="billerCountry">Land</label>
                    <input required type="text" id="billerCountry" v-model="billerCountry">
                  </div>
                </div>

          </div>

          <div class="bill-to flex flex-column"> 
            <h4>Faktura till</h4>
              <div class="input flex flex-column">
                <label for="clientName">Namn</label>
                <input required type="text" id="clientName" v-model="clientName">
              </div> 
              <div class="input flex flex-column">
                <label for="clientEmail">E-post</label>
                <input required type="text" id="clientEmail" v-model="clientEmail">
              </div>
              <div class="input flex flex-column">
                <label for="clientStreetAddress">Adress</label>
                <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress">
              </div> 
              <div class="location-details flex">
                  <div class="input flex flex-column">
                      <label for="clientCity">Stad</label>
                      <input required type="text" id="clientCity" v-model="clientCity">
                  </div>
                  <div class="input flex flex-column">
                    <label for="clientZipCode">Postnummer</label>
                    <input required type="text" id="clientZipCode" v-model="clientZipCode">
                  </div>
                  <div class="input flex flex-column">
                    <label for="clientCountry">Land</label>
                    <input required type="text" id="clientCountry" v-model="clientCountry">
                  </div>
                </div>
          </div>  

          <div class="invoice-work flex flex-column">
            <div class="payment flex">
              <div class="input flex flex-column">
                <label for="invoiceDate">Fakturans datum</label>
                <input disabled type="text" id="invoiceDate" v-model="invoiceDate">
              </div>
              <div class="input flex flex-column">
                <label for="paymentDueDate">Betalnings datum</label>
                <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate">
              </div>

            </div>
            <div class="input flex flex-column">
                <label for="paymentTerms">Betalningsvillkor</label>
                <select required type="text" id="paymentTerms" v-model="paymentTerms">
                  <option value="30">30 dagar</option>
                  <option value="60">60 dagar</option>
                  <option value="90">90 dagar</option>
                </select>
            </div>
            <div class="input flex flex-column">
                <label for="productDescription">Produktbeskrivning</label>
                <input required type="text" id="productDescription" v-model="productDescription">
            </div>
            <div class="work-items">
              <h3>Artiklar</h3>
              <table class="item-list">
                <tr class="table-heading flex">
                  <th class="item-name">Artikelnamn</th>
                  <th class="qty">Kvantitet</th>
                  <th class="price">Pris</th>
                  <th class="total">Total</th>
                </tr>
                <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
                  <td class="item-name"><input type="text" v-model="item.itemName"></td>
                  <td class="qty"><input type="text" v-model="item.qty"></td>
                  <td class="price"><input type="text" v-model="item.price"></td>
                  <td class="total flex">{{item.total = item.qty * item.price}} kr</td>
                  <img @click="deleteArticle(item.id)" src="@/assets/icon-delete.svg" alt="">
                </tr>
              </table>
              <div @click="addItem" class="flex button">
                <img src="@/assets/icon-plus.svg">
                Ny artikel
              </div>
            </div>

          </div>

          <div class="save flex">
            <div class="left">
              <button type="button" @click="cancelBill" class="red">Avbryt</button>
            </div>
             <div class="right flex">
              <button v-if="!editInvoice" type="submit" @click="saveDraft" class="purple">Spara utkast</button>
               <button v-if="!editInvoice" type="submit" @click="createNewBill" class="dark-purple">Skapa faktura</button>
              <button v-if="editInvoice" type="submit" @click="updateBill" class="dark-purple">Spara ändringar</button> 
            </div>

          </div>
      </form>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import {uid} from 'uid';
import {mapMutations, mapState, mapActions} from "vuex";
export default {
    name:"billModel",
      data() {
    return {
      dateOptions: { year: "numeric", month: "numeric", day: "numeric" },
      docId: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
  created() {
    if(!this.editInvoice){
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString('fr-CA', this.dateOptions);
    }
     if (this.editInvoice) {
      const currentInvoice = this.currentInvoiceArray[0];
      this.docId = currentInvoice.docId;
      this.billerStreetAddress = currentInvoice.billerStreetAddress;
      this.billerCity = currentInvoice.billerCity;
      this.billerZipCode = currentInvoice.billerZipCode;
      this.billerCountry = currentInvoice.billerCountry;
      this.clientName = currentInvoice.clientName;
      this.clientEmail = currentInvoice.clientEmail;
      this.clientStreetAddress = currentInvoice.clientStreetAddress;
      this.clientCity = currentInvoice.clientCity;
      this.clientZipCode = currentInvoice.clientZipCode;
      this.clientCountry = currentInvoice.clientCountry;
      this.invoiceDateUnix = currentInvoice.invoiceDateUnix;
      this.invoiceDate = currentInvoice.invoiceDate;
      this.paymentTerms = currentInvoice.paymentTerms;
      this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix;
      this.paymentDueDate = currentInvoice.paymentDueDate;
      this.productDescription = currentInvoice.productDescription;
      this.invoicePending = currentInvoice.invoicePending;
      this.invoiceDraft = currentInvoice.invoiceDraft;
      this.invoiceItemList = currentInvoice.invoiceItemList;
      this.invoiceTotal = currentInvoice.invoiceTotal;
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_BILL', "TOGGLE_EDIT_INVOICE"]),
    ...mapActions(['UPDATE_INVOICE']),

    cancelBill(){
      this.TOGGLE_BILL();
      if(this.editInvoice){
        this.TOGGLE_EDIT_INVOICE();
      }
    },

    addItem(){
      this.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0,
      });
    },

    deleteArticle(id){
      this.invoiceItemList = this.invoiceItemList.filter(item => item.id !== id)

    },

    createNewBill(){
      this.invoicePending = true;
    },

    saveDraft(){
      this.invoiceDraft = true;
    },

     calcTheTotal(){
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach(item => {
        this.invoiceTotal += item.total;
      })
    },

    async uploadInvoice(){
      if(this.invoiceItemList.length <= 0){
        alert('Ingen artikel har lagts till på fakturan!')
        return;
      }

        this.calcTheTotal();

        const dataBase = db.collection('invoices').doc(); 

        await dataBase.set({
          invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null,
      })
    
        this.TOGGLE_BILL();

        this.GET_INVOICES();
    },

    async updateInvoice(){
      if(this.invoiceItemList.length <= 0){
        alert('Ingen artikel har lagts till på fakturan!')
        return;
      }

        this.calcTheTotal();

        const dataBase = db.collection('invoices').doc(this.docId); 
          await dataBase.update({
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
      });

          const data={
            docId : this.docId,
            routeId: this.$route.params.invoideId,
          }
        this.UPDATE_INVOICE(data);
    },

    submitForm(){
      if(this.editInvoice){
        this.updateInvoice();
        return;
      }
      this.uploadInvoice();
    }
  },
  computed: {
    ...mapState(['editInvoice', 'currentInvoiceArray']),
  },
  watch: {
    paymentTerms(){
      let paymentDate= new Date();
      this.paymentDueDateUnix = paymentDate.setDate(paymentDate.getDate() + Number(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString('fr-CA', this.dateOptions)
    },
  }
}
</script>
<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 15px;
  }
  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    font-size: 10px;
    background-color: #1b3f24;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    h1 {
      margin-bottom: 48px;
      color: #fff;
    }
    h3 {
      margin-bottom: 16px;
      font-size: 14px;
      color:#5dfa77;
    }
    h4 {
      color: #5dfa77;
      font-size: 14px;
      margin-bottom: 24px;
    }
    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;
      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }
    // Invoice Work
    .invoice-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }
      .work-items {
        .item-list {
          width: 100%;
    
          .table-heading, .table-items {
            gap: 16px;
            font-size: 10px;
            .item-name {
              flex-basis: 50%;
            }
            .qty {
              flex-basis: 10%;
            }
            .price {
              flex-basis: 20%;
            }
            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }
          .table-heading {
            margin-bottom: 16px;
            th {
              text-align: left;
            }
          }
          .table-items {
            position: relative;
            margin-bottom: 24px;
            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }
        .button {
          color:rgb(248, 245, 245);
          background-color: #0b8a0b77;
          align-items: center;
          justify-content: center;
          width: 100%;
          img {
            margin-right: 4px;
          }
        }
      }
    }
    .save {
      margin-top: 60px;
      div {
        flex: 1;
      }
      .right {
        justify-content: flex-end;
      }
    }
  }
  .input {
    margin-bottom: 24px;
  }
  label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  input,
  select {
    width: 100%;
    background-color: #182b1da9;
    color: rgb(243, 239, 239);
    border-radius: 4px;
    padding: 12px 4px;
    border: none;
    &:focus {
      outline: none;
    }
  }
}
</style>