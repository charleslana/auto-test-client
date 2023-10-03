<template>
  <div>
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <div class="navbar-item">
            <img src="@/assets/images/logo-blog.png" alt="logo image" />
          </div>
          <span
            class="navbar-burger"
            :class="{ 'is-active': isMenuOpen }"
            data-target="navbarMenu"
            @click="toggleMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenu" class="navbar-menu" :class="{ 'is-active': isMenuOpen }">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="control has-icons-left">
                <input
                  class="input is-rounded"
                  type="email"
                  placeholder="Pesquisar em breve"
                  disabled
                />
                <span class="icon is-left"></span>
              </div>
            </div>
            <a class="navbar-item is-active is-size-5 has-text-weight-semibold">Blog</a>
            <a class="navbar-item is-size-5 has-text-weight-semibold">Auto test</a>
          </div>
        </div>
      </div>
    </nav>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <figure class="image is-16by9">
                <img src="@/assets/images/post.png" alt="post image" />
              </figure>
            </div>
          </div>
          <section class="section">
            <div class="columns">
              <div class="column is-8 is-offset-2">
                <div class="content is-medium">
                  <h2 class="subtitle is-4">May 25, 2023</h2>
                  <h1 class="title">Getting Started</h1>
                  <p>
                    This is a starter template for creating a beautiful, customizable blog with
                    minimal effort. You’ll only have to change a few settings and you’re ready to
                    go. As with all Jigsaw sites, configuration settings can be found in config
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div class="is-divider"></div>
          <section class="section">
            <div class="columns">
              <div class="column is-8 is-offset-2">
                <div class="content is-medium">
                  <h2 class="subtitle is-4">May 25, 2023</h2>
                  <h1 class="title">Getting Started</h1>
                  <p>
                    This is a starter template for creating a beautiful, customizable blog with
                    minimal effort. You’ll only have to change a few settings and you’re ready to
                    go. As with all Jigsaw sites, configuration settings can be found in config
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped></style>
