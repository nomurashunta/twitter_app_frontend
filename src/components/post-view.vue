<template>
  <v-col>
    <v-container>
      <v-row fluid justify="center" align="center" class="ma-2">
        <v-col cols="12">
          <image-uploader ref="imageUploader"></image-uploader>
        </v-col>
      </v-row>
      <v-row justify="center" class="ma-2">
        <v-textarea v-model="caption" outlined rows="3" label="画像のキャプションを入力してください"></v-textarea>
      </v-row>
      <v-row style="text-color:red;" v-if="hasErrors">{{error}}</v-row>
      <v-row justify="center" class="ma-2">
        <v-btn :disabled="!isSendable" @click.stop="dialog = true">送信</v-btn>
      </v-row>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">確認</v-card-title>
          <v-card-text>選択された画像を投稿します。よろしいですか？</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">キャンセル</v-btn>
            <v-btn color="green darken-1" text @click="dialog = false; send()">投稿</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="errorDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">エラー</v-card-title>
          <v-card-text>{{errorMessage}}</v-card-text>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      errorDialog: false,
      errorMessage: '',
      file: null,
      caption: 'test',
      error: ''
    };
  },
  methods: {
    send() {
      const URL = '/api/photo';
      let data = new FormData();
      data.append('github_id', this.$userId);
      data.append('file', this.$data.file);
      data.append('caption', this.$data.caption);
      Vue.axios
        .post(URL, data)
        .then(response => {
            try {
              console.log('uploade succeeded!');
              window.location.href = '/';
            } catch (e) {
                console.log(e);
                this.$data.errorMessage = "エラーが発生しました";
              this.$data.errorDialog = true;
            }
        })
        .catch(function(error) {
          console.log('failed');
          this.$data.errorMessage = "画像が大きすぎます！";
          this.$data.errorDialog = true;
        }.bind(this));
    },
    check() {
      this.$refs.imageUploader.getFile();
    }
  },
  computed: {
    hasErrors: function() {
      if (this.$data.error) {
        return true;
      }
    },
    isFileOk: function() {
      return this.$data.file != null;
    },
    isCapOk: function() {
      return this.$data.caption.length <= 200;
    },
    isSendable: function() {
      return this.isFileOk && this.isCapOk;
    }
  },
  mounted() {
    this.$watch('$refs.imageUploader.file', (new_value, old_value) => {
      this.$data.file = this.$refs.imageUploader.getFile();
    });
  }
};
</script>
