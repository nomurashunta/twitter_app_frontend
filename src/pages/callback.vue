<template>
  <div>
    <p v-if="attempting">
      Twitterでログインしています。
      <!--      {{ document.cookie }}-->
      {{ $store.state.token }}
      {{ hyper }}
      <!--      {{ $route.query.oauth_verifier }}-->
      tweet!!
      {{ tweet }}
    </p>
    <p v-else>
      Twitterでのログインに失敗しました。
      {{ failedMessage }}
    </p>
    <v-input />

    <!--
    <template v-else>
      <p v-else>
        Twitterでのログインに失敗しました。
      </p>
      <p>{{ failedMessage }}</p>
    </template> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  // middleware: 'guest',

  data() {
    return {
      failedMessage: null,
      info: null,
      info2: null,
      tweet: null,
      tokens: {
        token: null,
        tokenSecret: null,
      },
    };
  },

  computed: {
    attempting() {
      return !this.failedMessage;
    },
    hyper() {
      const value2 = this.$store.getters['article/getToken']();
      return value2;
    },
    token() {
      const value3 = this.$store.getters['article/getToken']();
      return value3.token;
    },
    tokenSecret() {
      const value3 = this.$store.getters['article/getToken']();
      return value3.tokenSecret;
    },
    getA() {
      const value2 = this.$store.getters['article/getToken']();
      const ddd = this.$route.query.id;
      return ``;
    },
  },

  methods: mapMutations(['setToken', 'setUser']),

  watch: {
    hyper(newCount, oldCount) {
      // Our fancy notification (2).
      console.log(this.hyper);
      if (!newCount.token && !newCount.tokenSecret)
        this.$store.dispatch('article/getAccessToken', {
          oauthToken: this.$route.query.oauth_token,
          oauthVerifier: this.$route.query.oauth_verifier,
          token: newCount.token,
          tokenSecret: newCount.tokenSecret,
        });
    },
    // tokens: {
    //   handler(val, oldVal) {
    //     console.log(val);
    //   },
    //   deep: true,
    // },
  },

  mounted() {
    // this.$axios
    //   .get(
    //     `/getHome?token=${this.token}&token=secret=${this.tokenSecret}
    //     &oauth_verifier=${this.$route.query.oauth_verifier}`
    //   )
    //   .then((response) => (this.info = response.data));
    this.$axios.get(`/getHome`).then((response) => (this.info2 = response.data));
    this.$axios
      .get(`/getTimeLine?token=${this.token}&token_secret=${this.tokenSecret}`)
      .then((response) => (this.tweet = response.data));
  },
};
</script>
