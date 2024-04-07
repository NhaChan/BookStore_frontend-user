<script>
// import CartService from "@/services/cart.service";
import Cookies from 'js-cookie';
export default {
    props: {
        products: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
    }
};
</script>

<template>
    <div class="row mb-4">
        <div class="col-lg-2 col-md-6 col-sm-12 mb-4" v-for="(product, index) in products" :key="product._id">
            <div class="card shadow-sm">
                <img :src="product.imageUrl" class="card-img-top mt-3 align-self-center d-flex " alt="Hình ảnh"
                    style="height: 200px; width: 200px; object-fit: contain;">
                <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <p class="card-text">Tác giả: {{ product.author }}</p>
                    <p class="card-text">Thể loại: {{ product.genre }}</p>
                    <p class="card-text">Số lượng còn lại: {{ product.quantity }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.card {
    margin-top: 15px;
}

.card:hover {
    transform: translateY(-5px);
}
.card:hover {
    background-color: #f8f9fa;
}
</style>