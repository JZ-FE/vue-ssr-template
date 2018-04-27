<template>
  <transition>
    <svg class="spinner" :class="{ show: show }" v-show="show" width="44px" height="44px" viewBox="0 0 44 44">
      <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
    </svg>
  </transition>
</template>

<script>
export default {
  name: 'spinner',
  props: ['show'],
  serverCacheKey: props => props.show,
}
</script>

<style lang="scss">
  .spinner {
    transition: opacity .15s ease;
    animation: rotator 1.4s linear infinite;
    animation-play-state: paused
  }

  .spinner.show {
    animation-play-state: running
  }

  .spinner.v-enter,
  .spinner.v-leave-active {
    opacity: 0
  }

  .spinner.v-enter-active,
  .spinner.v-leave {
    opacity: 1
  }

  .spinner .path {
    stroke: #f60;
    stroke-dasharray: 126;
    stroke-dashoffset: 0;
    -ms-transform-origin: center;
    transform-origin: center;
    animation: dash 1.4s ease-in-out infinite
  }

  @keyframes rotator {
    0% {
      transform: scale(.5) rotate(0deg)
    }

    to {
      transform: scale(.5) rotate(270deg)
    }

  }

  @keyframes dash {
    0% {
      stroke-dashoffset: 126
    }

    50% {
      stroke-dashoffset: 63;
      transform: rotate(135deg)
    }

    to {
      stroke-dashoffset: 126;
      transform: rotate(450deg)
    }

  }
</style>
