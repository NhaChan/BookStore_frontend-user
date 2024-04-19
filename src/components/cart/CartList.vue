<template>
    <section class="h-100 h-custom">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-1">
                                <h4 class="">
                                    <a href="/" class="text-success">
                                        <i class="fas fa-long-arrow-alt-left me-2"></i>
                                    </a>
                                </h4>
                            </div>
                            <!--sản phẩm -->
                            <div class="col-lg-6">
                                <div>
                                    <div v-for="(product, index) in products" :key="product._id"
                                        :class="{ active: index === activeIndex }" class="card mb-3 border-0 bg-light" 
                                        style="transform: translateY(0px);">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between">
                                                <div class="d-flex flex-row align-items-center">
                                                    <div><router-link :to="'/product/' + product._id">
                                                        <img :src="product.imageUrl"
                                                            class="img-fluid rounded-3 d-none d-sm-block"
                                                            alt="Shopping item" style="width: 65px;" />
                                                        </router-link>
                                                    </div>
                                                    <div class="ms-3">
                                                        <p class="fs-5 text-success" style=" text-decoration: none;">
                                                                {{ product.title }}
                                                        </p>
                                                        <p class="small mb-0">Tác giả: {{ product.author }}</p>
                                                    </div>
                                                </div>
                                                <div class="d-flex flex-row align-items-center justify-content-between">
                                                    <h6 class="fw-normal mb-0 me-3">Số lượng:</h6>
                                                    <div class="row" style="width: 100px;">
                                                        <h5 class="fw-normal mb-0">{{ product.quantity }}</h5>
                                                    </div>
                                                    <button class="btn ml-3 btn-danger"
                                                        @click="deleteProduct(product._id)">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div class="card bg-light rounded-3 border-0" style="transform: translateY(0px);">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center mb-4">
                                            <h5 class="mb-0">Thông tin</h5>
                                        </div>
                                        <form class="mt-4" @submit.prevent="submitForm">
                                            <div v-if="products.length > 0">
                                                <div class="form-group mb-4 d-none ">
                                                    <label for="userId" class="form-label">User ID</label>
                                                    <input type="text" id="userId" class="form-control form-control-lg"
                                                        v-model="userId">
                                                </div>
                                                <div class="form-group mb-4">
                                                    <label for="name" class="form-label">Tên người mượn</label>
                                                    <input type="text" id="name" class="form-control form-control-lg"
                                                        v-model="name">
                                                </div>
                                                <!-- <div class="form-group mb-4">
                                                    <label for="name" class="form-label">Email</label>
                                                    <input type="text" id="name" class="form-control form-control-lg"
                                                        v-model="name">
                                                </div> -->
                                                <div class="form-group mb-4">
                                                    <label for="ngayMuon" class="form-label">Ngày mượn</label>
                                                    <input type="date" id="ngayMuon"
                                                        class="form-control form-control-lg" v-model="ngayMuon"
                                                        required>
                                                </div>
                                                <div class="form-group mb-4">
                                                    <label for="ngayTra" class="form-label">Ngày trả</label>
                                                    <input type="date" id="ngayTra" class="form-control form-control-lg"
                                                        v-model="ngayTra" required>
                                                </div>
                                                
                                                <button type="submit" class="btn btn-success btn-lg bg-success">
                                                    Mượn
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";
import Cookies from 'js-cookie';
export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    data() {
        return {
            userId: Cookies.get("userId"),
            name: Cookies.get("userName"),
            ngayMuon: '',
            ngayTra: '',
            bookTitle: '',
            bookId: '',
            bookQuantity: 0,
            books: []
        };
    },
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async deleteProduct(productId) {
            const userId = Cookies.get("userId");
            const bookId = productId;
            await CartService.delete(userId, bookId);
            alert("Xóa sản phẩm khỏi giỏ hàng thành công!");
            window.location.reload();
        },
        addBookToLoan() {
            this.products.forEach(product => {
                this.books.push({
                    title: product.title,
                    bookId: product._id,
                    quantity: product.quantity
                });
            });
        },
        async submitForm() {
            this.addBookToLoan();

            // Tạo đối tượng loanInfo để lưu thông tin mượn sách
            const loanInfo = {
                userId: this.userId,
                name: this.name,
                ngayMuon: this.ngayMuon,
                ngayTra: this.ngayTra,
                books: this.books
            };

            // Gửi thông tin mượn sách đi xử lý
            try {
                await OrderService.add(loanInfo);
                await CartService.deleteCart(this.userId);
                alert("Đăng ký mượn thành công!");
                window.location.reload();
            } catch (error) {
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
                alert("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau!");
            }
        }
    }
};
</script>

