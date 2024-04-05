<template class="p-3 mb-3 border-bottom">
  <div class="container">
    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
        <img src="https://i.pinimg.com/564x/82/75/ea/8275ea5e8c59e1f95401a6bd72566d41.jpg" alt="mdo" width="100" height="100" class="rounded-circle">
      </a>

      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#" class="nav-link px-2 link-secondary">Trang chủ</a></li>
        <li><a href="#" class="nav-link px-2 link-body-emphasis">Yêu thích</a></li>
        <li><a href="#" class="nav-link px-2 link-body-emphasis">Customers</a></li>
        <li><a href="#" class="nav-link px-2 link-body-emphasis">Products</a></li>
      </ul>

      <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
        <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
      </form>

      <div class="dropdown text-end">
        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
        </a>
        <ul class="dropdown-menu text-small" style="">
          <li><a class="dropdown-item" href="#">Thông tin cá nhân</a></li>
          <li><a class="dropdown-item" href="#">Sách đã mượn</a></li>
          <!-- <li><a class="dropdown-item" href="#">Profile</a></li> -->
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Đăng xuất</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle';
</script>