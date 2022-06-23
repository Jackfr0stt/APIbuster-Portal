<template>
  <div class="container-fluid card shadow-sm" id="api-card">
    <div class="row my-3">
      <div class="col-9">
        <div class="row api-property">
          <h4 class="col api-property">API {{ api.apiName }}</h4>
        </div>
        <div class="row api-property">
          <div class="col-3 api-property">Type: {{ api.apiType }}</div>
          <div class="col-3 api-property">Domain: {{ api.domain }}</div>
        </div>
      </div>
      <div class="col-3">

        <div class="row">
          <div class="col">
            <img src="./icons/arrow-down.png" alt="" width="30" height="24" class="img-fluid button"
              @click="showEndpoints()" v-if="showModal == false">
            <img src="./icons/arrow-up.png" alt="" width="30" height="24" class="img-fluid button"
              @click="showEndpoints()" v-else>
          </div>
          <div class="col-2"><img src="./icons/minus.png" alt="" width="30" height="24" class="img-fluid button"
              @click="delAPI()"></div>
        </div>
      </div>
    </div>
    <div class="container-fluid card">
      <div class="row" v-if="showModal == true" id="endpoints">
        <div class="col">
          <h2>{{ api.apiName }} Endpoints</h2>
        </div>
        <div class="col">
          <img src="./icons/plus.png" alt="" width="30" height="24" class="img-fluid button"
            @click="showNewEndpModal = true">
        </div>
      </div>

      <div class="container-fluid card" v-if="showNewEndpModal == true && showModal == true">
        <div class="row" id="new_endpoint">
          <div class="col">
            <h2>New endpoint</h2>
          </div>
        </div>
        <div class="row">
          <form>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon3">Method</span>
              <input type="text" class="form-control" id="method" placeholder="Method" aria-label="Method"
                aria-describedby="basic-addon1" required>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon3">Endpoint Type</span>
              <select class="form-select" id="endpointType" aria-label="Default select example" required>
                <option selected>GET</option>
                <option value="1">POST</option>
                <option value="2">PATCH</option>
                <option value="3">PUT</option>
                <option value="3">DELETE</option>
              </select>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon3">Route</span>
              <input type="text" class="form-control" id="route" placeholder="/ping" aria-describedby="basic-addon3"
                required>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Header</span>
              <textarea class="form-control" placeholder="{ 'Content-type': 'application/json' }" id="header"
                aria-label="Header"></textarea>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Body</span>
              <textarea class="form-control" placeholder="{ property1: 'string', property2: 999, property3: false }"
                id="body" aria-label="Body"></textarea>
            </div>

            <div class="submit-btn">
              <button type="submit" class="btn btn-primary mb-3" @click="newEndpoint()">Create
                endpoint</button>
            </div>
          </form>
        </div>
      </div>

      <div class="row my-3" v-if="endpoints.length > 0 && showModal == true">
        <div class="container my-3">
          <div v-for="endpoint of endpoints">
            <Endpoint :endpoint="endpoint" :key="endpoint.id" />
          </div>
        </div>
      </div>
      <div class="row my-3" v-if="endpoints.length == 0 && showModal == true">
        <div class="row">
          <div class="col">
            <h2> No endpoints yet created. </h2>
          </div>
          <div class="col">
            <img src="./icons/plus.png" alt="" width="30" height="24" class="img-fluid button" @click="newEndpoint()">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '../services/ApiService';
import { wrapper } from '../utils/wrapper';
import EndpointVue from './Endpoint.vue';
import Endpoint from './Endpoint.vue';

const apiService = new ApiService();

export default {
  name: "Api",
  props: {
    api: Object,
  },
  data() {
    return {
      endpoints: [],
      showModal: false,
      showNewEndpModal: false
    };
  },
  methods: {
    async showEndpoints(noModal = null) {
      if (noModal == null)
        this.modal();

      let filter = {
        where: {
          apiid: this.api.id
        }
      }

      if (this.endpoints.length == 0) {
        const res = await wrapper(apiService.getEndpoints(filter));
        this.endpoints = res.data;
      }
    },
    async newEndpoint() {
      const endpoint = {
        apiid: this.api.id,
        body: document.getElementById("body").value,
        endpointtype: document.getElementById("endpointType").value,
        header: document.getElementById("header").value,
        method: document.getElementById("method").value,
        route: document.getElementById("route").value
      }

      const res = await wrapper(apiService.newEndpoint(endpoint));
      this.endpoints.push(res.data);
      await this.newEndpointModal();
    },
    async delAPI() {
      await wrapper(apiService.delAPI(this.api.id));
      location.reload();
    },
    async modal() {
      this.showModal = !this.showModal;
    },
    async newEndpointModal() {
      this.showNewEndpModal = !this.showNewEndpModal;
    }
  },
  components: EndpointVue,
  components: { Endpoint }
}
</script>

<style scoped>
#api-card {
  width: auto;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: grayscale;
  border: bottom;
  text-align: center;
}

#endpoints {
  margin-top: 40px;
}

#new_endpoint {
  margin-top: 20px;
}

.container-fluid {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.api-property {
  text-align: left;
}

.button:hover {
  cursor: pointer;
}
</style>
