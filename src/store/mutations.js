import {
  SET_TOKEN,
  REMOVE_TOKEN,
  GET_SIGNID
} from "./mutations-types";

export default {
  //存储token方法
  //设置token等于外部传递进来的值
  [SET_TOKEN](state, payload) {
    state.token = payload.token
    state.id = payload.id
    state.username = payload.username
    state.sex = payload.sex
    state.number = payload.number
    state.face = payload.face
    state.is_superuser = payload.is_superuser
    // console.log(payload);
  },

  [REMOVE_TOKEN](state) {
    state.token = ''
    state.userInfo = ''
    // console.log(payload.token);
  },

  [GET_SIGNID](state, payload) {
    state.signId = payload.signId
    // console.log(payload);
  },
}
