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
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ArticleList from '@/components/pages/index/articleList.vue';

@Component({
  components: {
    ArticleList,
  },
})
export default class IndexPage extends Vue {
  async mounted() {
    try {
      await this.$store.dispatch('article/fetchArticles');
    } catch (err) {
      this.$nuxt.error({
        message: `記事一覧取得時にエラーが発生しました: ${err.message}`,
        path: this.$route.path,
      });
    }
  }
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
