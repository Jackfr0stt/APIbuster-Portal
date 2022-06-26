<template>
  <div class="container-fluid card shadow-sm" id="endpoint-card">
    <div class="row my-3">
      <div class="col-9">
        <div class="row ">
          <div class="row endpoint-property">
            <h4 class="col endpoint-property">{{ endpoint.method }}</h4>
          </div>
          <div class="row endpoint-property">
            <h6 class="col endpoint-property">{{ `${endpoint.endpointtype} ${endpoint.route}` }}</h6>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="row">
          <div class="col">
            <img src="./icons/arrow-down.png" alt="Responsive image" width="30" height="24"
              class="img-fluid center-block button" @click="showTests()" v-if="showModal == false">
            <img src="./icons/arrow-up.png" alt="Responsive image" width="30" height="24" class="img-fluid button"
              @click="showTests()" v-else>
          </div>
          <div class="col-2"><img src="./icons/minus.png" alt="" width="30" height="24" class="img-fluid button"
              @click="delEndpoint()"></div>
        </div>
      </div>
      <div class="container-fluid card">
        <div class="row" v-if="showModal == true" id="testgroups">
          <div class="col">
            <h2>{{ endpoint.method }} Tests</h2>
          </div>
          <div class="col">
            <img src="./icons/plus.png" alt="" width="30" height="24" class="img-fluid button"
              @click="showNewTestModal = true">
          </div>
        </div>

        <div class="container-fluid card" v-if="showNewTestModal == true && showModal == true">
          <div class="row" id="new_test">
            <div class="col">
              <h2>New test</h2>
            </div>
          </div>
          <div class="row">
            <form>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon3">Name</span>
                <input type="text" class="form-control" id="testName" placeholder="Name" aria-label="testName"
                  aria-describedby="basic-addon1" required>
              </div>

              <div class="input-group mb-3">
                <div class="col-2">
                  <div class="input-group" style="width: auto">
                    <span class="input-group-text" id="basic-addon3">Test Type</span>
                    <select class="form-select" id="testType" aria-label="Default select example" required>
                      <optgroup label="Functional">
                        <option selected>Acceptance</option>
                        <option value="1">Integration</option>
                        <option value="2">Unit</option>
                      </optgroup>
                      <optgroup label="Non-functional">
                        <option value="3">Performance</option>
                      </optgroup>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="input-group" style="width: auto">
                    <div class="form-check form-switch mx-5 my-1" id="login">
                      <input class="form-check-input" type="checkbox" v-model="credentials" value="checked"
                        unchecked-value="" id="flexCheckDefault">
                      <label class="form-check-label" for="flexCheckDefault">
                        Login Credentials
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col" id="credentials" v-show="credentials">
                  <div class="input-group mx-3" style="width: auto">
                    <span class="input-group-text" style="width: 100px" id="basic-addon3">Username</span>
                    <input type="text" class="form-control" id="username" placeholder="Username" aria-label="Username"
                      aria-describedby="basic-addon1" required>
                  </div>

                  <div class="input-group mx-3" style="width: auto">
                    <span class="input-group-text" style="width: 100px" id="basic-addon3">Password</span>
                    <input type="text" class="form-control" id="password" placeholder="Password" aria-label="Password"
                      aria-describedby="basic-addon1" required>
                  </div>
                </div>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Body</span>
                <textarea class="form-control" placeholder="{ property1: 'string', property2: 999, property3: false }"
                  id="testBody" aria-label="Body"></textarea>
              </div>

              <div class="input-group mb-3">
                <span class="input-group-text">Expect</span>
                <textarea class="form-control" placeholder="expect(result.endpointId).to.be.eql(body.endpointId);"
                  id="testExpect" aria-label="Expect"></textarea>
              </div>

              <div class="submit-btn">
                <button type="submit" class="btn btn-primary mb-3" @click="newTest()">Create
                  test</button>
              </div>
            </form>
          </div>
        </div>

        <div class="row my-3" v-if="testgroups.length > 0 && showModal == true">
          <div class="container my-3">
            <div v-for="testgroup of testgroups">
              <TestGroup :testgroup="testgroup" :key="testgroup.id" />
            </div>
          </div>
        </div>
        <div class="row my-3" v-if="testgroups.length == 0 && showModal == true">
          <div class="container-fluid">
            <div class="col">
              <h2> No test groups yet created. </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '../services/ApiService';
import { wrapper } from '../utils/wrapper';
import TestGroupVue from './TestGroup.vue';
import TestGroup from './TestGroup.vue';

const apiService = new ApiService();

export default {
  name: "Endpoint",
  props: {
    endpoint: Object
  },
  data() {
    return {
      testgroups: [],
      showModal: false,
      showNewTestModal: false,
      credentials: ""
    }
  },
  methods: {
    async showTests() {
      this.modal();

      // let filter = {
      //   where: {
      //     endpointId: this.endpoint.id
      //   },
      //   include: [
      //     {
      //       relation: 'functionals',
      //       scope: {
      //         include: [
      //           {
      //             relation: 'acceptances',
      //             scope: {}
      //           },
      //           {
      //             relation: 'integrations',
      //             scope: {}
      //           },
      //           {
      //             relation: 'units',
      //             scope: {}
      //           }
      //         ]
      //       }
      //     },
      //     {
      //       relation: 'nonFunctionals',
      //       scope: {
      //         include: [
      //           {
      //             relation: 'performances',
      //             scope: {}
      //           }
      //         ]
      //       }
      //     }
      //   ]
      // }

      let filter = {
        where: {
          enpointid: this.endpoint.id
        }
      };

      // alert(JSON.stringify(filter));
      if (this.testgroups.length == 0) {
        const res = await wrapper(apiService.getTestGroups(JSON.stringify(filter)));
        this.testgroups = res.data;
      }
    },
    async newTest() {
      // test
      const test = {
        endpointId: this.endpoint.id,
        testgroupname: document.getElementById("testName").value,
        testgrouptype: document.getElementById("testType").value,
      }

      const res = await wrapper(apiService.newTestGroup(test));

      // // functional / non-functional test
      // if (test.testType == "Performance") {
      //   // non-functional
      //   const nonFunc = {
      //     testid: res.data.id
      //   }
      //   await wrapper(apiService.newFuncTest(nonFunc));
      // } else {
      //   // functional
      //   const func = {
      //     testid: res.data.id
      //   }
      //   const newTestRes = await wrapper(apiService.newFuncTest(func));

      //   if (test.testtype == "Acceptance") {
      //     const acceptance = {
      //       functionalid: newTestRes.data.id,
      //       acceptancebody: document.getElementById("testBody").value,
      //       acceptanceexpect: document.getElementById("testExpect").value,
      //     }

      //     await wrapper(apiService.newAcceptanceTest(acceptance));
      //   } else if (test.testType == "Integration") {
      //     const integration = {
      //       functionalid: newTestRes.data.id,
      //       integrationbody: document.getElementById("testBody").value,
      //       integrationexpect: document.getElementById("testExpect").value,
      //     }

      //     await wrapper(apiService.newIntegrationTest(integration));
      //   } else if (test.testType == "Unit") {
      //     const unit = {
      //       functionalid: newTestRes.data.id,
      //       unitbody: document.getElementById("testBody").value,
      //       unitexpect: document.getElementById("testExpect").value,
      //     }

      //     await wrapper(apiService.newUnitTest(unit));
      //   }
      // }

      this.testgroups.push(res.data);
      await this.newTestModal();
    },
    async delEndpoint() {
      await wrapper(apiService.delEndpoint(this.endpoint.id));
      location.reload();
    },
    async modal() {
      this.showModal = !this.showModal;
    },
    async newTestModal() {
      this.showNewTestModal = !this.showNewTestModal;
    }
  },
  components: TestGroupVue,
  components: { TestGroup }
}
</script>

<style scoped>
#endpoint-card {
  width: auto;
  background-color: lightgrey;
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialised;
  -moz-osx-font-smoothing: grayscale;
  border: bottom;
  text-align: center;
}

#testgroups {
  margin-top: 40px;
}

.container-fluid {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.endpoint-property {
  text-align: left;
}

.button:hover {
  cursor: pointer;
}

.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
