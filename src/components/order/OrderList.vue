<template>
    <div v-for="(order) in orders" :key="order._id">
        <div class="row mt-4">
            <div class="col-xl-3">
                <div class="card bg-white mb-4" style="transform: translateY(0px);">
                    <div class="card-header">
                        <h5 class="text-center">
                            <span :class="{
                                'text-warning': order.status === 'Đang chờ duyệt',
                                'text-primary': order.status === 'Duyệt',
                                'text-success': order.status === 'Đã trả',
                                'text-danger': order.status === 'Đã hủy'
                            }">{{ order.status }}</span>
                        </h5>
                    </div>
                    <div class="card-body text-center"> 
                        Mượn: {{ order.ngayMuon }}
                        <hr>
                        Trả : {{ order.ngayTra }}
                    </div>
                </div>
            </div>
            <div class="col-xl-9">
                <div class="card bg-white border-0 rounded-0 mb-4" style="transform: translateY(0px);">
                    <div class="card-header fw-bold">
                        <div class="row">
                            <div class="col-6 ">Thông tin sách</div>
                            <div v-if="order.status === 'Đang chờ duyệt'" class="col-6 d-flex justify-content-end">
                                <router-link to="#" class="btn btn-sm btn-danger" @click="submit(order._id)">
                                    Hủy
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row gx-3 mb-3">
                            <div v-for="(book, bookIndex) in order.books" :key="book.bookId"
                                class="form-group col-md-12">
                                <div class="d-flex justify-content-between">
                                    <span>{{ (bookIndex + 1) }}: {{ book.title }}</span>
                                    <span class=" fw-bold text-success">{{ book.quantity }}</span>
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