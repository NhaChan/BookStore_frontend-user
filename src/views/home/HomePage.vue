<template>
    <div class="row">
        <div class="col-8 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <div class="d-flex flex-wrap mt-3">
                <div v-for="(genre, index) in genres" :key="index" class="mb-1 me-1">
                    <button type="button" class="btn btn-light text-start" data-bs-toggle="button"
                        @click="toggleGenre(genre)">
                        {{ genre }}
                    </button>
                </div>
            </div>
        </div>
        <div class="col-4 col-lg-auto mb-3 mb-lg-0 me-lg-3 mt-3 ms-5 ">
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
            if (!this.selectedGenres.length) return this.products;
            return this.products.filter(contact => this.selectedGenres.includes(contact.genre));
        },
        filteredProductsCount() {
            return this.filteredProducts.length;
        },
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        contactStrings() {
            return this.Products.map((product) => {
                const { title, author, genre } = product;
                return [title, author, genre].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredContacts() {
            if (!this.searchText) return this.Products;
            return this.Products.filter((_product, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },
        filteredContactsCount() {
            return this.filteredContacts.length;
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
            products.forEach(contact => {
                genresSet.add(contact.genre);
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
        mounted() {
            this.refreshList();
        }
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
