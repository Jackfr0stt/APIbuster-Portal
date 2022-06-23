import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret)

// /* add font awesome icon component */
// Vue.component('font-awesome-icon', FontAwesomeIcon)

// import router from "./router";

// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })

createApp(App).mount("#app");
import "bootstrap/dist/js/bootstrap.js";