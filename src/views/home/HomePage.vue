<template>
    <div class="row">
        <div class="col-9">
            <div class="d-flex flex-wrap mt-3">
                <div v-for="(genre, index) in genres" :key="index" class="mb-1 me-1">
                    <button type="button" class="btn btn-light text-start" data-bs-toggle="button"
                        @click="toggleGenre(genre)">
                        {{ genre }}
                    </button>
                </div>
            </div>
        </div>
        <div class="col-3 mt-3">
            <form role="search">
                <InputSearch v-model="searchText" />
                <!-- <input type="search" class="form-control" placeholder="Search..." aria-label="Search"> -->
            </form>
        </div>
    </div>


    <div class="container">
        <div class="row">
            <div class="mt-2 col-lg-12 col-md-6 col-sm-2">
                <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts"
                    v-model:activeIndex="activeIndex" />
            </div>
        </div>
    </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import ProductList from "@/components/home/ProductList.vue";
import ProductService from "@/services/book.service";
export default {
    components: {
        InputSearch,
        ProductList,
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
            selectedGenres: [],
            genres: [],
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        filteredProducts() {
            if (!this.selectedGenres.length && !this.searchText) return this.products;
            let filtered = this.products;
            if (this.selectedGenres.length) {
                filtered = filtered.filter(product => this.selectedGenres.includes(product.genre));
            }
            if (this.searchText) {
                const searchTextLower = this.searchText.toLowerCase();
                filtered = filtered.filter(product => product.title.toLowerCase().includes(searchTextLower));
            }
            return filtered;
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
        activeContact() {
            if (this.activeIndex < 0 || this.activeIndex >= this.filteredProducts.length) return null;
            return this.filteredProducts[this.activeIndex];
        },
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
                this.genres = this.extractGenres(this.products);
            } catch (error) {
                console.log(error);
            }
        },
        extractGenres(products) {
            const genresSet = new Set();
            products.forEach(product => {
                genresSet.add(product.genre);
            });
            return Array.from(genresSet);
        },
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
        },
        toggleGenre(genre) {
            if (this.selectedGenres.includes(genre)) {
                this.selectedGenres = this.selectedGenres.filter(item => item !== genre);
            } else {
                this.selectedGenres.push(genre);
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>

<style>
.category-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.category-item {
    cursor: pointer;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s;
}

.category-item:hover {
    background-color: #f0f0f0;
}
</style>
