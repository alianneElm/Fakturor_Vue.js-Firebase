<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
      <form @submit.prevent="submitForm"  class="invoice-content">
          <h1>Ny Faktura</h1>
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
      </form>
  </div>
</template>

<script>
export default {
    name:"billModel",
      data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      loading: null,
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
}
</script>

<style>

</style>