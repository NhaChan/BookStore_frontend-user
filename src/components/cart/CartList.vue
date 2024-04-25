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
                            <!-- Sản phẩm -->
                            <div class="col-lg-6">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-4"
                                        v-for="(product, index) in products" :key="product._id"
                                        :class="{ active: index === activeIndex }">
                                        <div class="card bg-light d-flex align-items-center" style="transform: translateY(0px);">
                                            <router-link :to="'/product/' + product._id">
                                                <img :src="product.imageUrl"
                                                    class="card-img-top mt-3 align-self-center d-flex mx-auto"
                                                    alt="Shopping item" style="width: 80%;" />
                                            </router-link>
                                            <div class="card-body">
                                                <p class="card-title text-success" style="height: 50px;" >{{ product.title }}</p>
                                                <div class="d-flex flex-row align-items-center justify-content-between">
                                                    <div class="card-text">Số lượng: {{ product.quantity }}</div>
                                                    <button class="btn ml-3 text-danger"
                                                        @click="deleteProduct(product._id)">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5 col-lg-4 bg-light mt-3 ms-3">
                                <h4 class="d-flex justify-content-between align-items-center mb-3">
                                    <span class="text-primary">Thông tin</span>
                                </h4>
                                <form class="mt-4" @submit.prevent="submitForm">
                                    <ul class="form-group mb-3 list-group">
                                        <li class="list-group-item d-flex justify-content-between lh-sm">
                                            <div class="form-group mb-4">
                                                <label for="name" class="form-label">Người mượn</label>
                                                <input type="text" id="name" class="form-control form-control-sm"
                                                    v-model="name">
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between lh-sm">
                                            <div class="form-group mb-4">
                                                <label for="ngayMuon" class="form-label">Ngày mượn</label>
                                                <input type="date" id="ngayMuon" class="form-control form-control-sm"
                                                    v-model="ngayMuon" required>
                                            </div>
                                        </li>
                                        <li class="list-group-item bg-body-tertiary">
                                            <div class="text-success">
                                                <h6 class="my-0"> Phải trả sách trước hạn 2 tuần kể từ ngày mượn!
                                                </h6>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="input-group card">
                                        <button type="submit" class="btn btn-success btn-group-sm bg-success">
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

        calculateDefaultReturnDate() {
            // Tính toán ngày trả mặc định sau 2 tuần từ ngày mượn
            const loanDate = new Date(this.ngayMuon);
            const returnDate = new Date(loanDate.getTime() + (14 * 24 * 60 * 60 * 1000)); // 2 tuần = 14 ngày
            return returnDate.toISOString().substr(0, 10); // Chuyển đổi sang định dạng yyyy-MM-dd
        },
        async submitForm() {
            this.addBookToLoan();
            this.ngayTra = this.calculateDefaultReturnDate();

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
                // window.location.href = '/';
            } catch (error) {
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
                alert("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau!");
            }
        }
    }
};
</script>
