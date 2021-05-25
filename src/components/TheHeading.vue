<template>
  <header class="header" id="header">
      <router-link :to="{name: 'Home'}" class="logo">App</router-link>
    <div class="btn-hamburger">
        <!-- use .btn-humburger-active to open the menu -->
        <div class="top bar"></div>
        <div class="middle bar"></div>
        <div class="bottom bar"></div>
    </div>

    <nav class="navbar">
        <ul>
            <li class="navbar-user">
                <router-link :to="{ name: 'Profile' }">
                    <img class="avatar-small" :src="authUser.avatar" :alt="`${authUser.name} profile picture`">
                    <span>
                        {{authUser.name}}
                        <img class="icon-profile" src="@/assets/img/svg/arrow-profile.svg" alt="">
                    </span>
                </router-link>

                <!-- dropdown menu -->
                <!-- add class "active-drop" to show the dropdown -->
                <div id="user-dropdown">
                    <div class="triangle-drop"></div>
                    <ul class="dropdown-menu">
                        <li class="dropdown-menu-item">
                          <router-link to="#">View profile</router-link>
                        </li>
                        <li class="dropdown-menu-item">
                          <router-link to="#">Log out</router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>

        <ul>
            <li class="navbar-item">
              <router-link :to="{name: 'Home'}">Home</router-link>
            </li>
            <li class="navbar-item">
              <router-link to="#">Category</router-link>
            </li>
            <li class="navbar-item">
              <router-link to="#">Forum</router-link>
            </li>
            <li class="navbar-item">
              <router-link to="#">Thread</router-link>
            </li>
            <!-- Show these option only on mobile-->
            <li class="navbar-item mobile-only">
              <router-link to="#">My Profile</router-link>
            </li>
            <li class="navbar-item mobile-only">
              <router-link to="#">Logout</router-link>
            </li>
        </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['authUser'])
  }
}
</script>

<style lang="scss" scoped>

</style>
