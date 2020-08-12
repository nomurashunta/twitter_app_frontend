<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-img :src="`https://github.com/` + userName + `.png`" aspect-ratio="1"></v-img>
        </v-col>
        <v-col>ユーザー名：{{userName}}</v-col>
        <v-col>いいね合計数：{{totalFavs}}</v-col>
      </v-row>
      <v-row>
        <v-col v-for="photo in photos" :key="photo.id" class="d-flex child-flex" cols="4">
          <v-card flat tile class="d-flex">
            <v-img
              :src="`data:image/png;base64, ${photo.img}`"
              @click="onClickImage(photo.id)"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
export default {
  props: {
    id: VueTypes.integer.isRequired
  },
  data() {
    return {
      photos: [],
      userName: '',
      totalFavs: 0
    };
  },
  created() {
    axios.get(`/api/photo/util/getUserPhotos/${this.id}`).then(response => {
      this.photos = response.data.reverse();
    });

    axios.get(`/api/instausers/${this.id}`).then(response => {
      this.$data.userName = response.data.github_id;
    });

    axios.get(`/api/fav/util/getTotalFavs/${this.id}`).then(response => {
      this.$data.totalFavs = response.data;
    });
  },
  methods: {
    onClickImage: function(id) {
        window.location.href = `/favs/${id}`;
    }
  }
};
</script>>
