<template>
  <span :title="hummanFriendlyDate()">
    {{diffForHumans()}}
  </span>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedData from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedData)
export default {
  props: {
    timestamp: {
      required: true,
      type: Number
    }
  },
  methods: {
    diffForHumans () {
      return dayjs.unix(this.timestamp).fromNow()
    },
    hummanFriendlyDate () {
      return dayjs.unix(this.timestamp).format('llll')
    }
  }
}
</script>
