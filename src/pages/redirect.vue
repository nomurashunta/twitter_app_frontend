<template lang="pug">
div
  h1.title Twitterへリダイレクトしています!!!
  button.button(@click="handleCancel") Cancel
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class ClassAAA extends Vue {
  twitterAuthUrl: string;

  asyncData({ $axios, store, error }) {
    return $axios
      .$get('/getCallBackUrl')
      .then((data) => {
        // store.commitだとうまくいかない
        // store.commit('setToken', data);
        document.cookie = `token=${data.token}`;
        document.cookie = `secret=${data.tokenSecret}`;
        console.log('data:');
        console.log(data);
        console.log(data.token);
        store.dispatch('article/saveToken', { token: data.token, tokenSecret: data.tokenSecret });
        // return { twitterAuthUrl: data.authenticationURL };
        return { twitterAuthUrl: data.authorizationURL };
      })
      .catch((e) => error({ message: e.message, statusCode: e.statusCode }));
  }

  get ddouble(): string {
    return this.$store.getters['article/getA']();
  }

  public handleCancel() {
    this.$router.push('/');
  }

  mounted() {
    window.location.href = this.twitterAuthUrl;
  }
}
</script>
