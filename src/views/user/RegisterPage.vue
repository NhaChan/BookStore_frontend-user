<template>
    <div class="container mt-2">
        <h4 class="text-center text-primary fw-bold">Đăng ký</h4>
        <div class="col-md-5 mx-auto">
            <RegisterForm @submit:register="addUser" />
        </div>
    </div>
</template>

<script>
import RegisterForm from "../../components/user/RegisterForm.vue";
import AuthService from "../../services/auth.service";

export default {
    components: {
        RegisterForm,
    },
    data() {
        return {
            newUser: {
                name: '',
                email: '',
                password: '',
                phone: '',
                role: false
            },
        };
    },
    methods: {
        async addUser(data) {
            try {
                await AuthService.create(data);
                window.alert("Đăng ký thành công!")
                this.$router.push({ name: "login" });
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>