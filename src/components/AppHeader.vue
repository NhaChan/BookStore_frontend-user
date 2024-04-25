<template class="p-3 mb-3 border-bottom">
  <div class="bg-light">
    <div class="container ">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start pt-2 pb-2 ">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
          <img src="https://i.pinimg.com/564x/82/75/ea/8275ea5e8c59e1f95401a6bd72566d41.jpg" alt="mdo" width="80"
            height="80" class="rounded-circle">
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 link-secondary">BookStore</a></li>
        </ul>

        <div class="d-flex align-items-center">
          <div class="dropdown text-end" v-if="userName">
            <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://i.pinimg.com/564x/9e/2a/c4/9e2ac4cebc6ee67df82fd0e317d9a5e5.jpg" alt="mdo" width="32" height="32" class="rounded-circle">
              {{ userName }}
            </a>
            <ul class="dropdown-menu text-small" style="">
              <li>
                <router-link :to="{ name: 'order', params: { id: userId }, }" class="dropdown-item">Sách đã mượn</router-link>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><router-link to="#" class="dropdown-item" @click="confirmLogout">Đăng xuất</router-link></li>
            </ul>
          </div>

          <div v-if="!userName">
            <router-link :to="{ name: 'login' }" class="nav-link ">
              <i class="fas fa-user"></i>
            </router-link>
          </div>

        </div>
        <div v-if="userName" class="btn btn-link text-decoration-none me-5 m-3">
          <router-link :to="{ name: 'cart', params: { id: userId } }">
            <i class="fas fa-shopping-cart link-secondary"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      userName: '',
      userId: '',
    };
  },
  mounted() {
    this.getUserName();
  },
  methods: {
    getUserName() {
      const name = Cookies.get('userName');
      const id = Cookies.get('userId');
      // console.log("userName:", userName);
      if (name) {
        this.userId = id;
        this.userName = name;
      }
    },
    confirmLogout() {
      if (confirm("Bạn có chắc muốn đăng xuất không?")) {
        this.logout();
      }
    },
    logout() {
      Cookies.remove('userName');
      Cookies.remove('userId');
      this.userName = '';
      this.$router.push({ name: 'login' });
    },
  }
};

</script>