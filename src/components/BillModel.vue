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