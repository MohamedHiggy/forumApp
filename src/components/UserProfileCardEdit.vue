<template>
<div class="profile-card">
  <form @submit.prevent="save">
            <p class="text-center">
                <img :src="user.avatar" :alt="`${user.name} profile picture`" class="avatar-xlarge img-update">
            </p>

            <div class="form-group">
                <input type="text" v-model="activeUser.username" placeholder="Username" class="form-input text-lead text-bold">
            </div>

            <div class="form-group">
                <input type="text" v-model="activeUser.name" placeholder="Full Name" class="form-input text-lead">
            </div>

            <div class="form-group">
                <label for="user_bio">Bio</label>
                <textarea class="form-input" id="user_bio" v-model="activeUser.bio" placeholder="Write a few words about yourself."></textarea>
            </div>

            <div class="stats">
              <span>{{user.postsCount}} posts</span>
              <span>{{user.threadsCount}} threads</span>
            </div>

            <hr>

            <div class="form-group">
                <label class="form-label" for="user_website">Website</label>
                <input autocomplete="off" v-model="activeUser.website" class="form-input" id="user_website" />
            </div>

            <div class="form-group">
                <label class="form-label" for="user_email">Email</label>
                <input autocomplete="off" class="form-input" v-model="activeUser.email" id="user_email" />
            </div>

            <div class="form-group">
                <label class="form-label" for="user_location">Location</label>
                <input autocomplete="off" class="form-input" v-model="activeUser.location" id="user_location" />
            </div>

            <div class="btn-group space-between">
                <button class="btn-ghost" @click="cancel">Cancel</button>
                <button type="submit" class="btn-blue">Save</button>
            </div>
            </form>
        </div>
</template>

<script>
export default {
  data () {
    return {
      activeUser: { ...this.user }
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    save () {
      this.$store.dispatch('updateUser', { ...this.activeUser })
      this.$router.push({ name: 'Profile' })
    },
    cancel () {
      this.$router.push({ name: 'Profile' })
    }
  }
}
</script>
