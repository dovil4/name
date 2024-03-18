<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template setup>
  <div class="container-fluid">
    <header>
      <h1>Salary comparison</h1>
    </header>
  </div>
  <nav>
    <button type="submit" class="btn btn-primary">
      <RouterLink class="link" to="/">My job options</RouterLink>
    </button>
    <button type="submit" class="btn btn-primary">
      <RouterLink class="link" to="/salery">My salary comparison</RouterLink>
    </button>
  </nav>
  <div class="container">
    <p>
      Different jobs have different payment methods. Also, salaries and work hours are different.
      Jobs can be permanent, or short term / seasonal. What matters to us is - which salary is the
      bigest. Yes, you can manually calculate everyone's salary, but that takes time - do anyone
      know, how many job options are there? Enter all the job options, and let us calculate for you
    </p>
  </div>

  <RouterView />
</template>

<style scoped>
.btn {
  margin: 10px;
}
.link {
  color: black;
}

h1 {
  font-size: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  font-weight: 900;
}

header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.picture {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.container-fluid {
  background-image: url('./assets/images/abstract-mountain-contemporary-aesthetic-landscapes-collection-modern-minimalist-araaaat-print_178888-644.avif');
  height: 30vh;
}
</style>
