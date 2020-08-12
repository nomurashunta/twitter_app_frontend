<template>
  <div>
    <v-container>
      <v-row justify="center" align="center" class="ma-4">
        <img :src="previewImage" width="80%" class="uploading-image" >
      </v-row>
      <v-row justify="center" align="center">
        <v-file-input
          name="image"
          accept="image/jpeg, image/png"
          label="Choose your image"
          filled
          prepend-icon="mdi-camera"
          @change="uploadImage"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  data() {
    return {
      previewImage: null,
      file: null,
      caption: '',
    };
  },
  methods: {
    uploadImage(file) {
      try {
        if (file == null) return;
        const image = file;
        this.file = file;
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
          console.log(e.target.result);
          this.previewImage = e.target.result;
        };
      } catch (e) {
        console.log(e);
      }
    },
    getFile() {
      return this.file;
    },
    getImage() {
      return this.previewImage;
    },
  },
}; // missing closure added
</script>

<style>
.uploading-image {
  display: flex;
}
</style>
