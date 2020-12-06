<template>
    <div class="sign-create">
        <div class="title">考勤任务发布</div>
        <el-form
                :model="signDataForm"
                ref="signDataForm"
                label-width="100px"
                :rules="rule"
                class="signDataForm"
        >
            <el-form-item label="标题" prop="title">
                <el-input v-model="signDataForm.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input
                        v-model.number="signDataForm.description"
                        autocomplete="off"
                        type="textarea"
                        maxlength="60"
                        show-word-limit
                ></el-input>
            </el-form-item>
            <div class="btn">
            <el-form-item>
                <el-button
                        type="success" class="submitBtn"
                        round
                        @click.native.prevent="submit"
                        :loading="loading">
                    发布
                </el-button>
            </el-form-item>
            <el-form-item>
                <el-button
                        type="primary"
                        class="resetBtn"
                        round
                        @click.native.prevent="reset"
                >重置
                </el-button>
            </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {post} from "../utils/request";
    import {getCookie} from "../utils/cookie";

    export default {
        name: "SignCreate",
        data() {
            const validateTitle = (rule, value, callback) => {
                if (value.length === 0 || value.length > 50) {
                    callback(new Error("标题是必须的，最大长度为50位!"));
                } else {
                    callback();
                }
            };
            return {
                loading: false,
                signDataForm: {
                    title: "",
                    description: "",
                },
                rule: {
                    title: [
                        {
                            required: true,
                            max: 20,
                            message: "标题是必须的，最大长度为50位",
                            trigger: "blur",
                        },
                        { validator: validateTitle, trigger: "blur" },
                    ],
                },
            };
        },
        methods: {
            submit() {
                this.$refs.signDataForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        post({
                            url: "/sign_create/",
                            data: this.signDataForm,
                            headers: {"X-CSRFToken": getCookie("csrftoken")},
                        })
                            .then((response) => {
                                this.loading = false;
                                console.log(response);


                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        return false;
                    }
                });
            },
            reset() {
                this.$refs.signDataForm.resetFields();
            },
        }
    };
</script>
<style lang="less" scoped>
    .sign-create {
        margin: 50px;

        .title {
            margin: 20px;
            font-weight: bolder;
            font-size: 30px;
        }
        .signDataForm{
            margin: 50px auto;
            width: 600px;
            /*background: #fff;*/
            /*box-shadow: 0 0 35px #b4bccc;*/
            padding: 30px;
            /*border-radius: 25px;*/
            .btn{
                display: flex;
                justify-content: space-between;

                .submitBtn{
                    width: 200px;
                }
                .resetBtn{
                    width: 200px;

                }
            }

        }
    }
</style>
