<template>
  <div>
    <p v-if="attempting">
      Twitterでログインしています。
      <!--      {{ document.cookie }}-->
      {{ $store.state.token }}
      {{ hyper }}
    </p>
    <p v-else>
      Twitterでのログインに失敗しました。
      {{ failedMessage }}
    </p>
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
    // get() {
    //   const value2 = this.$store.getters['article/getToken']();
    //   console.log(value2);
    //   console.log('----------');
    //   return value2;
    // },
    hyper() {
      // console.log('imakaraareyaru!!!!');
      const value2 = this.$store.getters['article/getToken']();

      // token = value2;
      // tokenSecret = value2.tokenSecret;
      // console.log(value2.tokenSecret);
      return value2;
    },
    hype3() {
      const value3 = this.$store.getters['article/getToken']();
      return value3.tokenSecret;
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

  async mounted() {
    try {
      // const pa = {
      //   oauthToken: this.$route.query.oauth_token,
      //   oauthVerifier: this.$route.query.oauth_verifier,
      //   token: this.hyper.token,
      //   tokenSecret: this.hyper.tokenSecret,
      // };
      // console.log(pa);
      // const callbackData = await this.$axios.$get('/callback3', {
      //   params: pa,
      // });
      // console.log('sadsadasdasdasdasda');
      // console.log(callbackData);
      // console.log('dsadsdaaaaadsad');
      // const pa = {
      //   oauth_token: this.$route.query.oauth_token,
      //   oauth_verifier: this.$route.query.oauth_verifier,
      // };

      console.log('hype1111111111111111111111111');

      console.log(this.hype3);

      // this.$store.dispatch('article/getAccessToken', {
      //   oauth_token: this.$route.query.oauth_token,
      //   oauthVerifier: this.$route.query.oauth_verifier,
      // });
    } catch (e) {
      console.log(e);
    }
  },

  // async fetch() {
  //   const token = this.$store.getters['article/getTk']();
  //   console.log(token);
  // },

  // async mounted() {
  //   try {
  //     console.log(this.$route.query);
  //     const token = await this.$store.getters['article/getTk']();
  //     console.log('sdasdasdasdasdas');
  //     console.log(token.oauth_verifier);
  //     console.log(token.oauth_token);
  //     console.log('sdasdasdasdasdas');
  //     // const callbackData = await this.$axios.$get('/callback2', { params: this.$route.query, token });
  //     // const callbackData = await this.$axios.$post('/callback3', { params: this.$route.query, data: token });

  //     const pa = {
  //       oauth_token: this.$route.query.oauth_token,
  //       oauth_verifier: this.$route.query.oauth_verifier,
  //       token: parsedobj.token,
  //       token_secret: parsedobj.token_secret,
  //     };

  //     console.log(pa);

  //     //const callbackData = await this.$axios.$get('/getT2');
  //     const callbackData = await this.$axios.$get('/callback3', {
  //       params: pa,
  //     });

  //     // const callbackData = await this.$axios.$get('/callback3', { params: this.$route.query });

  //     console.log(callbackData);
  //     // this.setToken({ token: callbackData.access_token });
  //     // this.setUser({ user: callbackData.user });
  //     // this.$router.replace('/');
  //   } catch (error) {
  //     this.failedMessage = error.message;
  //   }
  // },
};
</script>
