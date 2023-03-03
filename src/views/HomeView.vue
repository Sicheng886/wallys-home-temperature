<script>
import { computed, ref } from "vue"
import axios from "axios"
import dayjs from "dayjs"
import Banner from "../components/Banner.vue"
import Card from "../components/Card.vue"
import DailyTrends from "../components/DailyTrends.vue"
import DailyHumidity from "../components/DailyHumidity.vue"
import Advise from "../components/Advise.vue"

import calculateFeelsLike from "../functions/calculateFeelslike"
export default {
  components: {
    Banner,
    Card,
    DailyTrends,
    DailyHumidity,
    Advise,
  },
  setup() {
    const weatherData = ref({})
    const dailyForcast = ref([])
    const indoorData = ref({})
    const showModal = ref(false)
    const showWelcome = ref(false)
    const time = ref("2023-01-01 00:00")
    const nickName = ref("")
    const welcomeText = ref("")
    const dailyAdvise = ref([])
    const historyData = ref({})

    const minMax = computed(() => {
      const tempList = dailyForcast.value.map((item) => parseInt(item.temp))
      const maxTemp = Math.max(...tempList)
      const minTemp = Math.min(...tempList)
      console.log(minTemp, maxTemp)
      return [maxTemp, minTemp]
    })

    const indoorFeelslike = computed(() => {
      return calculateFeelsLike(indoorData.value.temp, indoorData.value.humi)
    })

    const requestWelcome = async (name) => {
      if (!name) {
        return
      }
      const res = await axios.post("/api/welcome", {
        body: JSON.stringify({ name }),
      })
      const data = res.data
      const newNickName = data.nickName
      const content = data.content
      nickName.value = newNickName
      welcomeText.value = content
    }

    const closeModalHandler = () => {
      console.log(nickName.value)
      if (nickName.value) {
        showModal.value = false
        localStorage.setItem("userName", nickName.value)
        requestWelcome(nickName.value)
      }
    }

    const refreshHandler = () => {
      axios.get("/api/all").then((res) => {
        const { current, forcast, sensor, advise, history } = res.data
        weatherData.value = current
        dailyForcast.value = forcast
        indoorData.value = sensor
        dailyAdvise.value = advise
        historyData.value = history
        time.value = dayjs(sensor.time * 1000).format("YYYY-MM-DD hh:mm")
      })
    }

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      weatherData,
      dailyForcast,
      time,
      indoorData,
      minMax,
      indoorFeelslike,
      showModal,
      dailyAdvise,
      showWelcome,
      nickName,
      welcomeText,
      requestWelcome,
      closeModalHandler,
      refreshHandler,
      historyData,
    }
  },
  created() {
    this.refreshHandler()
    const name = localStorage.getItem("userName")
    if (!name) {
      this.showModal = true
    } else {
      this.requestWelcome(name)
    }
  },
}
</script>

<template>
  <main>
    <Banner
      :tempOutdoor="weatherData.temp"
      :tempIndoor="indoorData.temp"
      :humidityOutdoor="weatherData.humidity"
      :humidityIndoor="indoorData.humi"
      :icon="weatherData.icon"
      :weatherStr="weatherData.text"
      :updateTime="time"
      :minMax="minMax"
    />
    <div class="body">
      <va-alert border="left" v-if="welcomeText">
        <p class="welcome-text">
          {{ nickName + "，" + welcomeText }}
        </p>
      </va-alert>
      <div class="card-row">
        <DailyTrends :dailyData="dailyForcast" :historyData="historyData" />
      </div>
      <div class="card-row">
        <daily-humidity :dailyData="dailyForcast" :historyData="historyData" />
      </div>
      <div class="card-container card-row">
        <div>
          <va-card stripe stripe-color="primary">
            <va-card-title>温度</va-card-title>
            <va-card-content>
              <p>室内: {{ indoorData.temp.toFixed(2) }} °C</p>
              <va-divider />
              <p>室外: {{ weatherData.temp }} °C</p>
            </va-card-content>
          </va-card>
        </div>
        <div>
          <va-card stripe stripe-color="primary">
            <va-card-title>湿度</va-card-title>
            <va-card-content>
              <p>室内: {{ indoorData.humi.toFixed(2) }} %</p>
              <va-divider />
              <p>室外: {{ weatherData.humidity }} %</p>
            </va-card-content>
          </va-card>
        </div>
        <div>
          <va-card stripe stripe-color="primary">
            <va-card-title>体感</va-card-title>
            <va-card-content>
              <p>室内: {{ indoorFeelslike }} °C</p>
              <va-divider />
              <p>室外: {{ weatherData.feelsLike }}°C</p>
            </va-card-content>
          </va-card>
        </div>
      </div>
      <div class="card-container card-row">
        <va-card stripe stripe-color="primary">
          <va-card-title>对比前日气温</va-card-title>
          <va-card-content>
            <p>
              早上: NA°C /
              <font-awesome-icon icon="fa-solid fa-arrow-up-long" /> NA°C
            </p>
            <va-divider />
            <p>
              中午: NA°C /
              <font-awesome-icon icon="fa-solid fa-arrow-up-long" /> NA°C
            </p>
            <va-divider />
            <p>
              晚间: NA°C /
              <font-awesome-icon icon="fa-solid fa-arrow-down-long" /> NA°C
            </p>
          </va-card-content>
        </va-card>
        <va-card stripe stripe-color="primary">
          <va-card-title>对比前日湿度</va-card-title>
          <va-card-content>
            <p>
              早上: NA% /
              <font-awesome-icon icon="fa-solid fa-arrow-up-long" /> NA%
            </p>
            <va-divider />
            <p>
              中午: NA% /
              <font-awesome-icon icon="fa-solid fa-arrow-up-long" /> NA%
            </p>
            <va-divider />
            <p>
              晚间: NA% /
              <font-awesome-icon icon="fa-solid fa-arrow-down-long" /> NA%
            </p>
          </va-card-content>
        </va-card>
      </div>
      <div class="card-row">
        <advise :advice="dailyAdvise" />
      </div>
    </div>

    <div class="btn-refresh-wrapper">
      <va-button size="large" class="mr-6 mb-2" @click="refreshHandler">
        <font-awesome-icon icon="fa-solid fa-refresh" />
      </va-button>
    </div>
    <va-modal v-model="showModal" title="欢迎" hide-default-actions>
      <p>欢迎！请输入昵称以开始访问：</p>
      <va-input
        v-model="nickName"
        :rules="[(v) => v.length > 1]"
        class="mb-6"
        placeholder="请输入昵称"
      />
      <template #footer>
        <va-button @click="closeModalHandler"> 确认 </va-button>
      </template>
    </va-modal>
  </main>
</template>

<style scoped>
.card-container {
  display: flex;
}

.card-container > * {
  flex-grow: 1;
  margin: 0 0.2rem;
}

.card-container > *:first-child {
  margin-left: 0;
}

.card-container > *:lastchild {
  margin-right: 0;
}

.body {
  margin: 0.5rem;
}

.card-row {
  margin: 0.5rem 0 0;
}

.card-row-3 > div {
  flex-grow: 1;
}

p {
  font-size: 0.85rem;
  margin: 0.5rem 0;
}

p:last-child {
  margin: 0;
}

.btn-refresh-wrapper {
  position: fixed;
  bottom: 1rem;
  right: 0.5rem;
}

.btn-refresh-wrapper > * {
  box-shadow: var(--va-card-box-shadow);
}

.welcome-text {
  line-height: 1.5rem;
}
</style>
