<template>
  <div>
    <v-card height="auto" width="500">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="4">
            <v-btn
              outlined
              transparent
              @click="onClickHrefToUser(userName)"
              style="object-fit:contain; width:100%; height:auto;"
            >
              <v-img
                :src="`https://github.com/` + userName + `.png`"
                aspect-ratio="1"
                style="object-fit:contain; width:100%"
              ></v-img>
            </v-btn>
          </v-col>
          <v-col cols="8">
            <a id="text" @click="onClickHrefToUser(userName)">{{userName}}さん</a>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
export default {
  props: {
    userName: VueTypes.string
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClickHrefToUser(github_id) {
      axios
        .get(`/api/instausers/util/getUserIdByGithubId/${github_id}`)
        .then(response => {
          window.location.href = `/prof/${response.data}`;
        });
    }
  }
};
</script>

<style scoped>
#text {
  /* stylelint-disable */
  font-size: 20px;
  font-family: 'YuGothic', 'Yu Gothic', 'Hiragino Kaku Gothic ProN',
    'ヒラギノ角ゴ ProN W3', 'メイリオ', 'Meiryo', 'ＭＳ ゴシック', sans-serif;
}
</style>
