<template>
  <header>
    <div>
      <nav class="">
        <button class=""><RouterLink to="/">Home</RouterLink></button>
        <button class=""><RouterLink to="/lpvp">LPVP</RouterLink></button>
        <button class="">
          <RouterLink to="/balance-checker">BalanceChecker</RouterLink>
        </button>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
nav {
  border-bottom: 1px solid black;
}
</style>
