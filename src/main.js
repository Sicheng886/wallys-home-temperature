import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core"

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

/* import specific icons */
import {
  faTree,
  faMountainSun,
  faArrowUpLong,
  faArrowDownLong,
  faRefresh,
  faHouse,
} from "@fortawesome/free-solid-svg-icons"
/* add icons to the library */
library.add(
  faTree,
  faMountainSun,
  faArrowUpLong,
  faArrowDownLong,
  faRefresh,
  faHouse
)
import "qweather-icons/font/qweather-icons.css"
import { createVuestic, VaButton, VaCard, VaInput, VaModal } from "vuestic-ui"
import "vuestic-ui/styles/essential.css"
import "vuestic-ui/styles/grid.css"
import "vuestic-ui/styles/reset.css"
import "vuestic-ui/styles/typography.css"

import "./assets/main.css"

const app = createApp(App)

app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)

app.use(
  createVuestic({
    config: {
      colors: {
        variables: {
          primary: "#2ebf91",
        },
        components: { VaButton, VaCard, VaInput, VaModal },
      },
    },
  })
)
app.mount("#app")
