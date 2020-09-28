<template>
  <div>
    <br>
    <br>
    <div v-if="isLoggedIn">
      <div>
        <v-container>
          <v-col>
            <template v-for="tweet in getTweets">
              <v-card class="mx-auto" max-width="350">
                <v-list-item>
                  <v-list-item-avatar>
                    <img :src="tweet.profileImageURL">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="tweet.name" />
                    <v-list-item-subtitle v-html="tweet.screenName" />
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-btn icon>
                      <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                  </v-list-item-icon>
                </v-list-item>
                <v-divider />
                <v-card-text>
                  <p>
                    {{ tweet.text }}
                  </p>
                  <p v-if="tweet.mediaEntities" />
                  <div v-for="image in tweet.mediaEntities">
                    <!--              {{ image }}-->
                    <v-img :src="image.mediaURL" />
                  </div>
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-card-text>
                    感情分析スコア : {{ tweet.sentimentScore }}
                  </v-card-text>
                  <v-spacer />
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-btn>
                </v-card-actions>
                <v-spacer />
              </v-card>
              <br>
            </template>
          </v-col>
        </v-container>
      </div>
    </div>
    <div v-else>
      <p>
        開始するにはログインしてください。
      </p>
      <v-btn depressed elevation="2" @click="login">
        ログイン
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      tweets: [],
      // ダミー用
      tokens: {
        token: null,
        tokenSecret: null,
      },
    };
  },

  computed: {
    token() {
      return this.$store.getters['article/getToken']().token;
    },
    tokenSecret() {
      return this.$store.getters['article/getToken']().tokenSecret;
    },
    isLoggedIn() {
      return this.token && this.tokenSecret;
    },
    getTweets() {
      if (this.isLoggedIn) {
        this.$axios
          .get(`/getJudgedTimeLine?token=${this.token}&token_secret=${this.tokenSecret}`)
          .then((response) => this.tweets = response.data.filter(t => t.sentimentScore > -0.5))
      }
      console.log(this.tweets)
      return this.tweets
    }
  },
  methods: {
    login() {
      window.location.href = 'http://localhost:8090/login';
    },
  },
};
</script>
