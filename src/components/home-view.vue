<template>
  <div>
    <v-container>
      <div>{{ this.$userId ? this.$userId + `さんとしてログインしています` : "ログインしていません"}}</div>
      <div style="max-height: 600px; overflow-x: hidden; overflow-y: auto;">
        <v-row align="start" justify="center" style="height:200">
          <v-col>
            <photo-item
              v-for="photo in photos"
              :key="photo.id"
              :id="photo.id"
              :isFavView="false"
              :currentUserId="currentUserId"
            ></photo-item>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-container>
      <v-col>
        <v-row justify="space-around">
          <v-btn :disabled="isStart" @click="onClickPrev">前へ</v-btn>
          <v-btn :disabled="isEnd" @click="onClickNext">次へ</v-btn>
        </v-row>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
export default {
  props: {
    num: VueTypes.integer
  },
  data() {
    return {
      photos: [],
      isStart: true,
      isEnd: false,
      currentUserId: -1
    };
  },
  created() {
    axios.get(`/api/photo/`).then(response => {
      if (response.data.length < this.num * 10) {
        this.$data.isEnd = true;
      }
    });

    axios.get(`/api/photo/getRange/${this.num}`).then(response => {
      console.log(response.data);
      this.photos = response.data;
    });

    if (this.$userId) {
      axios
        .get(`/api/instausers/util/getUserIdByGithubId/${this.$userId}`)
        .then(response => {
          this.$data.currentUserId = response.data;
        });
    }
    if (this.num > 1) this.isStart = false;
  },
  methods: {
    onClickNext() {
      window.location.href = `/home/${this.num + 1}`;
    },
    onClickPrev() {
      window.location.href = `/home/${this.num - 1}`;
    }
  }
};
</script>
