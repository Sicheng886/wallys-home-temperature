<template>
  <div class="banner-container">
    <h1 class="va-h1">
      {{ tempIndoor.toFixed(1) }}°C / {{ humidityIndoor.toFixed(1) }}%
    </h1>
    <div class="main-weather-icon">
      <i :class="iconClass"></i>
    </div>
    <div class="compare-wrapper">
      <p class="title">
        <font-awesome-icon icon="fa-solid fa-mountain-sun" /> 户外
      </p>
      <div>
        <p>
          {{ tempOutdoor }}°C /
          <font-awesome-icon
            icon="fa-solid fa-arrow-up-long"
            v-if="tempDiffernce > 0"
          />
          <font-awesome-icon icon="fa-solid fa-arrow-down-long" v-else />
          {{ Math.abs(tempDiffernce) }}
          °C
        </p>
        <p>
          {{ humidityOutdoor }} % /
          <font-awesome-icon
            icon="fa-solid fa-arrow-up-long"
            v-if="humiDifference > 0"
          />
          <font-awesome-icon icon="fa-solid fa-arrow-down-long" v-else />
          {{ Math.abs(humiDifference) }} %
        </p>
      </div>
    </div>

    <p class="update-info">
      {{ updateTime }} / {{ weatherStr }} / {{ minMax[0] }} °C /
      {{ minMax[1] }} °C
    </p>
  </div>
</template>

<script>
import { toRefs, computed } from "vue"
export default {
  props: [
    "tempIndoor",
    "humidityIndoor",
    "tempOutdoor",
    "humidityOutdoor",
    "icon",
    "weatherStr",
    "updateTime",
    "minMax",
  ],
  setup(props) {
    const { icon, tempIndoor, humidityIndoor, tempOutdoor, humidityOutdoor } =
      toRefs(props)
    const iconClass = computed(() => {
      return "qi-" + icon.value
    })
    const tempDiffernce = computed(() => {
      return parseInt(tempOutdoor.value - tempIndoor.value)
    })
    const humiDifference = computed(() => {
      return parseInt(humidityOutdoor.value - humidityIndoor.value)
    })
    return { iconClass, tempDiffernce, humiDifference }
  },
}
</script>

<style scoped>
.banner-container {
  width: 100%;
  height: 30vh;
  min-height: 280px;
  background-image: linear-gradient(60deg, #8360c3, #2ebf91);
  padding: 2rem 3rem;
  position: relative;
  box-shadow: var(--va-card-box-shadow);
}
h1 {
  font-size: 2rem;
  margin: 0.5rem 0 0rem;
  font-weight: bold;
}
.main-weather-icon {
  font-size: 3rem;
  position: absolute;
  right: 3rem;
  top: 3rem;
}
.compare-wrapper {
  display: flex;
}

.compare-wrapper .title {
  margin-right: 0.5rem;
}
p {
  margin: 1rem 0;
  font-size: 1.1rem;
}
.update-info {
  position: absolute;
  bottom: 1rem;
  left: 3rem;
}
</style>
