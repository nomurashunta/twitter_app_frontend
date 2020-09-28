<template>
  <div>
    <br />
    <br />
    <p>
      ログインしました。
    </p>
    {{ token }}
    {{ tokenSecret }}
    <v-btn onclick="window.location.href='/'">
      TOPへ戻る
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweets: [],
      tokens: {
        token: null,
        tokenSecret: null,
      },
    };
  },

  computed: {
    token() {
      return this.$store.getters['article/getToken']().token;
    },
    tokenSecret() {
      return this.$store.getters['article/getToken']().tokenSecret;
    },
  },
  mounted() {
    console.log('dasdsad');
    this.$store.dispatch('article/saveToken', {
      token: this.$route.query.token,
      tokenSecret: this.$route.query.token_secret,
    });
    console.log(this.token);
  },
};
</script>
