<!--
<template lang="pug">
  h1 Hello World.
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

// 環境変数の参照サンプル
console.log('process.env.envName:', process.env.envName);
console.log('process.env.apiEndpointUrl:', process.env.apiEndpointUrl);

@Component
export default class IndexPage extends Vue {}
</script>

<style lang="scss" scoped>
h1 {
  color: #000;
  background-color: #fff;
}
</style>
-->

<template lang="pug">

.index-page
  .header
    h1.title 投稿記事
  .content
    nuxt-link.post(to="/post") 投稿する
    ArticleList(:articles="$store.state.article.articles")
  .console
    nuxt-link.get(to="/redirect") ログイン!!!

  .h1.title {{$store.state.token}}

  .h1.title {{$store.state.aaa}}

  .h1.title {{ddouble}}

  .h1.title 以下はトークンです。

  .h1.title {{token}}

</template>

<!--<template>-->
<!--  <div>-->
<!--    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />-->
<!--    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js" />-->
<!--    <p v-if="attempting">-->
<!--      Twitterでログインしています。-->
<!--      &lt;!&ndash;      {{ tokenByCookie }}&ndash;&gt;-->
<!--      &lt;!&ndash;      {{ document.cookie }}&ndash;&gt;-->

<!--      &lt;!&ndash;      {{ hyper }}&ndash;&gt;-->
<!--    </p>-->
<!--    <p v-else>-->
<!--      Twitterでのログインに失敗しました。-->
<!--      &lt;!&ndash;      {{ tokenByCookie }}&ndash;&gt;-->
<!--    </p>-->
<!--    <no-ssr placeholder="Loading...">-->
<!--      <p>-->
<!--        {{ $store.state.token }}-->
<!--        {{ aaa }}-->
<!--      </p>-->
<!--      &lt;!&ndash;      <vue-previewer :images="imgs" :options="{}" />&ndash;&gt;-->
<!--    </no-ssr>-->
<!--    &lt;!&ndash;-->
<!--    <template v-else>-->
<!--      <p v-else>-->
<!--        Twitterでのログインに失敗しました。-->
<!--      </p>-->
<!--      <p>{{ failedMessage }}</p>-->
<!--    </template> &ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ArticleList from '@/components/pages/index/articleList.vue';

@Component({
  components: {
    ArticleList,
  },
})
export default class IndexPage extends Vue {
  created() {
    const setCached = {
      title: 'こんにちは！タイトルをキャッシュします',
      content: 'こんにちは！内容をキャッシュします。',
    };
    this.$cookies.set('article01', setCached, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  //
  async mounted() {
    // try {
    //   await this.$store.dispatch('article/fetchArticles');
    // } catch (err) {
    //   this.$nuxt.error({
    //     message: `記事一覧取得時にエラーが発生しました: ${err.message}`,
    //     path: this.$route.path,
    //   });
    // }
    const cookies = document.cookie; // 全てのcookieを取り出して
    const cookiesArray = cookies.split(';'); // ;で分割し配列に

    for (const c of cookiesArray) {
      // 一つ一つ取り出して
      const cArray = c.split('='); // さらに=で分割して配列に
      console.log(cArray);
      if (cArray[0] === 'token') {
        // 取り出したいkeyと合致したら
      }
    }
  }

  get attempting(): boolean {
    return false;
  }

  get hasLogined(): boolean {
    const aa = document.cookie.split(';');
  }

  get ddouble(): string {
    return this.$store.getters['article/getA']();
  }

  get token(): string {
    return this.$store.getters['article/getToken']();
  }

  get aaa() {
    return this.$cookies.get('article01');
  }

  get tokenByCookie() {
    return '';
  }
  // get tokenByCookie() {
  //   const cookies = document.cookie; // 全てのcookieを取り出して
  //   const cookiesArray = cookies.split(';'); // ;で分割し配列に
  //
  //   for (const c of cookiesArray) {
  //     // 一つ一つ取り出して
  //     const cArray = c.split('='); // さらに=で分割して配列に
  //     if (cArray[0] === 'token') {
  //       // 取り出したいkeyと合致したら
  //       return cArray;
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.index-page {
  & > .header {
    margin-bottom: 30px;
  }

  & > .header > .title {
    font-size: 24px;
    font-weight: bold;
  }

  & > .content > .text {
    font-size: 16px;
  }

  & > .content > .post {
    color: black;
    text-decoration: none;
  }

  & > .content > .post:hover {
    opacity: 0.5;
  }
}
</style>
