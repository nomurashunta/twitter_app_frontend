<template>
  <div>
    <v-container>
      <v-row align="start" justify="center">
        <photo-item :id="id" :isFavView="true"></photo-item>
      </v-row>
      <v-row>この写真をいいねしたユーザー：</v-row>
      <v-row class="ma-6" justify="center" align="center" v-for="user in getUsers" :key="user.id">
        <fav-user-item :userName="user.github_id"></fav-user-item>
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
      users: []
    };
  },
  computed: {
    getUsers: function() {
      var users = this.$data.users.sort(function(a, b) {
        return new Date(b.fav_at) - new Date(a.fav_at);
      });
      return users;
    }
  },
  created() {
    axios.get(`/api/photo/${this.id}`).then(response => {
      if (!response.data.userId) {
        window.location.href = '/';
      }
    });
    axios.get(`/api/fav/getFavUsers/${this.id}`).then(response => {
      var users = [];
      response.data.forEach(data => {
        axios.get(`/api/instausers/${data.userId}`).then(response => {
          response.data.fav_at = data.created_at;
          users.push(response.data);
        });
      });
      this.$data.users = users.sort(function(a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      });
    });
  },
  methods: {}
};
</script>>
