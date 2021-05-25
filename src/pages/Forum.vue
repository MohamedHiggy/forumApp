<template>
    <div class="col-full push-top">
        <div class="forum-header">
            <div class="forum-details">
                <h1>{{forum.name}}</h1>
                <p class="text-lead">{{forum.description}}</p>
            </div>
            <a href="#" class="btn-green btn-small">Start a thread</a>
        </div>
      </div>

    <div class="col-full push-top">
      <h1 v-if="!threads.length" class="text-center">there is no threads for this forum</h1>
      <template v-else>
        <thread-list :threads="threads"/>
      </template>
    </div>
</template>

<script>
import sourceData from '@/data'
import ThreadList from '@/components/ThreadList.vue'
export default {
  components: {
    ThreadList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    forum () {
      return sourceData.forums.find(forum => forum.id === this.id)
    },
    threads () {
      return sourceData.threads.filter(thread => thread.forumId === this.id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
