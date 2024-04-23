<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-md-1">
                <h5>
                    <a href="/" class="text-success">
                        <i class="fas fa-long-arrow-alt-left"></i>
                    </a>
                </h5>
            </div>
            <div class="col-md-8">
                <div class="card rounded border-0 bg-light mb-5 mt-0" style="transform: translateY(0px);">
                    <div class="row">
                        <div class="col-md-6">
                            <div>
                                <div class="text-center">
                                    <img :src="productLocal.imageUrl" class=""
                                        :style="{ width: '100%', maxWidth: '100%', borderTopLeftRadius: '50px', borderBottomLeftRadius: '50px' }">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product p-2">
                                <div class="mt-2 mb-3">
                                    <h4 class="text-uppercase text-success mb-3 fw-bold">{{ productLocal.title }}</h4>
                                    <div class="price d-flex flex-row align-items-center">
                                        <p>Tác giả: <span>{{ productLocal.author }}</span></p>
                                    </div>
                                    <div class="price d-flex flex-row align-items-center">
                                        <p>Thể loại: <span>{{ productLocal.genre }} | {{ productLocal.publisher }}</span></p>
                                    </div>
                                    <!-- <div class="price d-flex flex-row align-items-center">
                                        <p>Nhà xuất bản: <span>{{ productLocal.publisher }}</span></p>
                                    </div> -->
                                </div>
                                <h6>Mô tả:</h6>
                                <p class="about">{{ productLocal.description }}</p>
                                <div class="quantity-control mb-3">
                                    <button class="btn btn-sm btn-icon btn-success" @click="decreaseQuantity">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                    <span class="mx-2">{{ quantity }}</span>
                                    <button class="btn btn-sm btn-icon btn-success" @click="increaseQuantity">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                                <div class="cart mt-4 align-items-center">
                                    <!-- <button v-if="!isLoggedIn" class="btn btn-primary  text-uppercase mr-2 px-4"
                                        disabled>
                                        Thêm vào xem sau
                                    </button> -->
                                    <button class="btn btn-primary  text-uppercase mr-2 px-4" @click="addToCart">
                                        Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import cartService from "@/services/cart.service";
import Cookies from "js-cookie";
import { Form } from "vee-validate";

export default {
    components: {
        Form,
    },
    props: {
        product: { type: Object, required: true }
    },
    data() {
        return {
            productLocal: this.product,
            quantity: 1,
        };
    },
    // mounted() {
    //     // Kiểm tra xem người dùng đã đăng nhập hay chưa
    //     const userId = Cookies.get("userId");   
    //     this.isLoggedIn = !!userId; // Cập nhật giá trị biến isLoggedIn
    // },

    methods: {
        increaseQuantity() {
            this.quantity++;
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        async addToCart() {
            const quantity = this.quantity;
            const userId = Cookies.get("userId");
            const bookId = this.product._id;

            const books = [{ bookId, quantity }];
            const cartData = { userId, books };

            try {
                const check = await cartService.add(cartData);
                if (check) {
                    alert("Thêm vào giỏ hàng thành công!");
                }

            } catch (error) {
                console.error("Lỗi khi thêm vào giỏ hàng:", error);
                alert("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau!");
            }
        },
    },
};
</script>

<style>
    .card {
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
    }
</style>