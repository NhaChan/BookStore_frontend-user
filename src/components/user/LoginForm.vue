<template>
    <Form @submit="submitLogin" :validation-schema="loginFormSchema" class="login-form">
        <div class="form-group">
            <label for="email">Email</label>
            <Field name="email" type="email" class="form-control" v-model="loginData.email" />
            <ErrorMessage name="email" class="error-feedback text-danger" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="loginData.password" />
            <ErrorMessage name="password" class="error-feedback text-danger" />
        </div>
        <div class="text-center">
            <p>Bạn chưa có tài khoản? <router-link to="/register" style="text-decoration: none;">Đăng ký</router-link></p>
        </div>
        <div class="form-group d-flex justify-content-center">
            <button class="btn btn-primary" type="submit">Đăng nhập
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
            loginData: {
                email: "",
                password: "",
            },
            loginFormSchema: yup.object().shape({
                email: yup.string().email("Email không hợp lệ.").required("Vui lòng nhập Email."),
                password: yup.string().required("Vui lòng nhập mật khẩu."),
            }),
        };
    },
    methods: {
        submitLogin() {
            this.$emit("submit:login", this.loginData);
        }
    },
};
</script>

<style scoped>
.login-form {
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
