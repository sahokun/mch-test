<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div>
      <nav class="crumbs">
        <ol>
          <li class="crumb"><RouterLink to="/">Home</RouterLink></li>
          <li class="crumb"><RouterLink to="/lpvp">LPVP</RouterLink></li>
        </ol>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  border-bottom: 1px solid black;
}

.crumbs ol {
  list-style-type: none;
  padding-left: 0;
}

.crumb {
  display: inline-block;
}

.crumb a::after {
  display: inline-block;
  color: #fff;
  content: ">";
  font-size: 80%;
  font-weight: bold;
  padding: 0 3px;
}
</style>
