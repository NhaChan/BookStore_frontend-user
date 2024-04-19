<template>
    <div v-for="(order) in orders" :key="order._id">
        <div class="row">
            <div class="col-xl-4">
                <div class="card mb-4 mb-xl-0 " style="transform: translateY(0px);">
                    <div class="card-header">
                        <h5 class="text-center fw-bold">
                            <span :class="{
                                'text-warning': order.status === 'Đang chờ duyệt',
                                'text-primary': order.status === 'Duyệt',
                                'text-danger': order.status === 'Đã trả' 
                            }">{{ order.status }}</span>
                        </h5>
                    </div>
                    <div class="card-body text-center">
                        Ngày: {{ order.ngayMuon }}
                    </div>
                </div>
            </div>
            <div class="col-xl-8">
                <div class="card mb-4" style="transform: translateY(0px);">
                    <div class="card-header fw-bold">Chi tiết</div>
                    <div class="card-body">
                        <div class="row gx-3 mb-3">
                            <div v-for="(book, bookIndex) in order.books" :key="book.bookId"
                                class="form-group col-md-6">
                                <div class="d-flex justify-content-between">
                                    <span>{{ (bookIndex + 1) }}: {{ book.title }}</span>
                                    <span class=" fw-bold text-success">{{ book.quantity }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end">
                            <router-link v-if="order.status === 'Đang chờ duyệt'" to="#" class="btn btn-sm btn-danger"
                                @click="submit(order._id)">
                                Hủy mượn
                            </router-link>
                            <template v-else>
                                <button class="btn btn-sm btn-danger" disabled>
                                    Hủy mượn
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrderService from "@/services/order.service";
export default {
    props: {
        orders: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
        async submit(id) {
            if (confirm("Xác nhận hủy?")) {
                const submitData = {
                    status: "Đã hủy"
                };
                const check = await OrderService.update(id, submitData);
                if (check) {
                    window.location.reload();
                }
            }
        }

    },
};
</script>