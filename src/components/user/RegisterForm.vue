<template>
    <Form @submit="submitRegister" :validation-schema="registerFormSchema" class="register-form">
        <div class="form-group">
            <label for="name">Họ tên</label>
            <Field name="name" type="text" class="form-control" v-model="registerData.name" />
            <ErrorMessage name="name" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" v-model="registerData.email" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="registerData.password" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu</label>
            <Field name="confirmPassword" type="password" class="form-control" v-model="registerData.confirmPassword" />
            <ErrorMessage name="confirmPassword" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="registerData.phone" />
            <ErrorMessage name="phone" class="error-feedback text-danger" />
        </div>
        <div class="text-center">
            <p>Đã có tài khoản? <router-link to="/login" style="text-decoration: none;">Quay về trang đăng nhập</router-link></p>
        </div>
        <div class="form-group d-flex justify-content-center">
            <button class="btn btn-primary" type="submit"> Đăng ký
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        return {
            registerData: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
            },
            registerFormSchema: yup.object().shape({
                name: yup.string().required("Vui lòng nhập họ tên."),
                email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập Email."),
                password: yup.string().required("Vui lòng nhập mật khẩu."),
                confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp."),
                phone: yup.string().required("Vui lòng nhập số điện thoại."),
            }),
        };
    },
    methods: {
        submitRegister() {
            this.$emit("submit:register", this.registerData);
        }
    },
};
</script>

<style scoped>
.register-form {
    background-color: #f8f9fa;
    /* border: 1px solid #dee2e6; */
    border-radius: 5px;
    padding: 20px;
}

.form-wrapper {
    max-width: 400px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    font-weight: bold;
}

.form-control {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.error-feedback {
    margin-top: 0.5rem;
}
</style>