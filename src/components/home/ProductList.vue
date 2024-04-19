<script>
// import CartService from "@/services/cart.service";
import Cookies from 'js-cookie';
export default {
    props: {
        products: { type: Array, default: [] },
    },
};
</script>

<template>
    <div class="row mb-4">
        <div class="col-lg-2 col-md-4 col-sm-6 col-12 mb-4" v-for="(product, index) in products" :key="product._id">
            <router-link :to="'/product/' + product._id" style=" text-decoration: none;">
                <div class="card shadow-sm">
                    <img :src="product.imageUrl" class="card-img-top mt-3 align-self-center d-flex" alt="Hình ảnh"
                        style="height: 200px; width: 200px; object-fit: contain;">
                    <div class="card-body">
                        <p class="card-title text-success description-cell">{{ product.title }}</p>
                        <p class="card-text description-cell">Tác giả: {{ product.author }}</p>
                        <p class="card-text description-cell">Thể loại: {{ product.genre }}</p>
                    </div>
                </div>
            </router-link>
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

.card-text {
    font-size: 14px;
}

.description-cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; /* Prevents the text from wrapping */
}

/* Adjust the width at which the title gets truncated */
@media (max-width: 768px) {
    .description-cell {
        max-width: 200px; /* Adjust as needed */
    }
}

</style>