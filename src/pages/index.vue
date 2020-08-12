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
    .text 今はまだなにもないが、いつかはある。
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class IndexPage extends Vue {}
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
}
</style>
