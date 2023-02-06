<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container-fluid">
        <div><a class="navbar-brand" href="#">Зенковъ</a></div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <nuxt-link exact active-class="active" class="nav-link" aria-current="page" to="/">Домашняя страница</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link active-class="active" class="nav-link" aria-current="page" to="/about">Обо мне</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container"><nuxt/></div>

  </div>
</template>

