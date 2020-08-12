<template>
  <div>
    <template v-if="isLoaded==false">
      <v-card>
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </v-card>
    </template>
    <template v-else>
      <template v-if="!isFavView">
        <v-card>
          <v-container>
            <v-row justify="center">
              <span>
                <div>
                  <a :href="'/prof/' + status.userId">ID:{{status.userName}}さん</a>
                  の投稿
                </div>
              </span>
              <v-spacer></v-spacer>
              <template v-if="status.isYours">
                <v-btn @click.stop="dialog = true">投稿を削除</v-btn>
              </template>
            </v-row>
            <v-row justify="center">
              <img
                :src="`data:image/png;base64, ` + status.img"
                style="object-fit: contain; max-height:500px; width:100%;"
              />
            </v-row>
            <v-row justify="center">
              <div>{{status.caption}}</div>
              <v-spacer></v-spacer>
              <v-btn icon @click="onClickFav" color="pink">
                <v-icon>{{ status.isFav ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="end">
              <a :href="'/favs/' + id">いいねしたユーザー</a>
            </v-row>
          </v-container>
        </v-card>
      </template>
      <template v-else>
        <v-card>
          <v-container>
            <v-row justify="center">
              <div>ID:{{status.userName}}さんの投稿</div>
            </v-row>
            <v-row justify="center">
              <img
                :src="`data:image/png;base64, ` + status.img"
                style="object-fit: contain; max-height:500px; width:100%;"
              />
            </v-row>
          </v-container>
        </v-card>
      </template>
    </template>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">確認</v-card-title>
        <v-card-text>画像を削除します。よろしいですか？</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">キャンセル</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false; deleteImage()">削除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
export default {
  props: {
    id: VueTypes.integer.isRequired,
    isFavView: VueTypes.bool,
    currentUserId: VueTypes.integer
  },
  data() {
    return {
      dialog: false,
      isLoaded: false,
      status: {
        isFav: null,
        userId: null,
        isYours: null,
        userName: null,
        img: null,
        caption: null
      }
    };
  },
  created() {
    axios.get(`/api/photo/${this.id}`).then(response => {
      this.$data.status.userId = response.data.userId;
      axios
        .get(`/api/instausers/${this.$data.status.userId}`)
        .then(response => {
          this.$data.status.userName = response.data.github_id;
          axios
            .get(
              `/api/fav/util/findOne/?userId=${this.currentUserId}&photoId=${this.id}`
            )
            .then(response => {
              if (response.data) {
                this.$data.status.isFav = true;
              }
            })
            .then(response => {
              this.$data.isLoaded = true;
            });
        });

      if (this.currentUserId == this.$data.status.userId) {
        this.$data.status.isYours = true;
      }
      this.$data.status.img = response.data.img;
      this.$data.status.caption = response.data.caption;
    });
  },

  methods: {
    deleteImage(id) {
      axios.delete(`/api/photo/${this.id}`).then(response => {
        window.location.href = '/';
      });
    },
    onClickFav() {
      if (this.currentUserId && this.currentUserId > 0) {
        if (this.$data.status.isFav) {
          axios
            .post(`/api/fav/util/delete`, {
              userId: this.currentUserId,
              photoId: this.id
            })
            .then(response => {});
          this.$data.status.isFav = false;
        } else {
          axios.post(`/api/fav`, {
            userId: this.currentUserId,
            photoId: this.id
          });
          this.$data.status.isFav = true;
        }
      } else {
        window.location.href = '/login';
      }
    },
    favImage(id) {}
  }
};
</script>>
