<template>
<div class="container">
    <div class="flex-grid">
          <div class="col-3 push-top">
            <user-profile-card :user="user" v-if="!edit"/>
            <user-profile-card-edit :user="user" v-else/>
          </div>
          <div class="col-7 push-top">
              <div class="profile-header">
                  <span class="text-lead">
                      {{user.username}} recent activity
                  </span>
                  <a href="#">See only started threads?</a>
              </div>
              <hr>
              <post-list :posts="user.posts"/>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostList from '@/components/PostList.vue'
import UserProfileCard from '@/components/UserProfileCard.vue'
import UserProfileCardEdit from '@/components/UserProfileCardEdit.vue'
export default {
  components: { PostList, UserProfileCard, UserProfileCardEdit },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({ user: 'authUser' })
  }
}
</script>
<style lang="scss" scoped>

</style>
