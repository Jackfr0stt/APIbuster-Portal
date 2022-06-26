<template>
  <div class="container-fluid card" id="testgroup-card">
    <div class="row my-3">
      <div class="col">
        <div class="row">
          <div class="col testgroup-property">Group Name: {{ testgroup.testgroupname }}</div>
          <!-- <div class="col testgroup-property">Test Group Type: {{ testgroup.testgrouptype }}</div> -->
        </div>
      </div>
      <div class="col-2"><img src="./icons/minus.png" alt="" width="30" height="24" class="img-fluid button"
          @click="delTest()"></div>
    </div>
  </div>
</template>

<script>
import ApiService from '../services/ApiService';
import { wrapper } from '../utils/wrapper';

const apiService = new ApiService();

export default {
  name: "TestGroup",
  props: {
    testgroup: Object
  },
  data() {
    return {
      // functional: [],
      // nonFunctional: [],
      showModal: false
    }
  },
  methods: {
    async delTest() {
      await wrapper(apiService.delTest(this.testgroup.id));
      location.reload();
    },
  }
}
</script>

<style scoped>
#endpoint-card {
  width: auto;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: grayscale;
  border: bottom;
  text-align: center;
}

.container-fluid {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.testgroup-property {
  text-align: left;
}

.button:hover {
  cursor: pointer;
}
</style>
