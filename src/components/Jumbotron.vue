<template>
  <div class="container-fluid my-5 card">
    <div class="row my-3">
      <div class="col-6"><img class="center-logo" src="../assets/logo.svg" alt=""></div>
      <div class="col-6">
        <h1 class="center-logo-text">APIbuster</h1>
      </div>
    </div>
    <div class="container-fluid card" id="apis">
      <div class=" row my-3" v-if="apis">
        <div class="row">
          <div class="col">
            <h1>APIs</h1>
          </div>
          <div class="col">
            <!-- TODO: need to check if newAPI(userId) will actually need a userId -->
            <img src="./icons/plus.png" alt="" width="30" height="24" class="img-fluid button"
              @click="showNewAPIModal = true">
          </div>
        </div>
      </div>
      <div class="container-fluid card bg-white" v-if="showNewAPIModal == true">
        <div class=" row">
          <div class="col" id="new_api">
            <h2>New API</h2>
          </div>
        </div>
        <div class="row">
          <form>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon3">API name</span>
              <input type="text" class="form-control" id="apiName" placeholder="API name" aria-label="apiName"
                aria-describedby="basic-addon1" required>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon3">API Type</span>
              <select class="form-select" id="apiType" aria-label="Default select example" required>
                <option selected>REST</option>
                <option value="1" disabled>RPC</option>
              </select>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon3">Domain</span>
              <input type="text" class="form-control" id="domain" placeholder="http://localhost:8080"
                aria-describedby="basic-addon3" required>
            </div>

            <div class="submit-btn">
              <button type="submit" class="btn btn-primary mb-3" @click="newAPI(1)">Create
                API</button>
            </div>
          </form>
        </div>
      </div>

      <div v-for="api of apis">
        <Api :api="api" :key="api.id" />
      </div>
    </div>
    <div class="row my-3" v-if="apis.length == 0">
      <div class="col">
        <h2> No APIs yet created. </h2>
      </div>
      <div class="col">
        <img src="./icons/plus.png" alt="" width="30" height="24" class="img-fluid button" @click="newAPI(1)">
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '../services/ApiService';
import { wrapper } from '../utils/wrapper';
import ApiVue from './Api.vue';
import Api from './Api.vue';

const apiService = new ApiService();

export default {
  name: "Jumbotron",
  data() {
    return {
      apis: this.created(),
      showNewAPIModal: false
    };
  },
  methods: {
    async created() {
      const res = await wrapper(apiService.getAPIs());
      this.apis = res.data;
    },
    async newAPI(id) {
      const api = {
        userid: id,
        apiname: document.getElementById("apiName").value,
        apitype: document.getElementById("apiType").value,
        domain: document.getElementById("domain").value
      }

      const res = await wrapper(apiService.newAPI(api));
      this.apis.push(res.data);
      await this.newAPIModal();
    },
    async newAPIModal() {
      this.showNewAPIModal = !this.showNewAPIModal;
    }
  },
  components: ApiVue,
  components: { Api }
}
</script>

<style scoped>
#new_api {
  margin-top: 10px;
}

.container-fluid {
  background-color: lightgrey;
  border: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.bg-white {
  background-color: white;
}

.center-logo {
  float: right;
  width: 300px;
  height: 200px;
}

.center-logo-text {
  text-align: left;
  margin-top: 60px;
}

.button:hover {
  cursor: pointer;
}

#apis {
  background-color: lightgrey;
  width: 1660px;
  margin-bottom: 60px;
}
</style>
