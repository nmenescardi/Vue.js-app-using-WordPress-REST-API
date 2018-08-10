<template>
  <div class="container">
    <div class="post-list">
      <article v-for="post in posts" :key="post.id" class="post">
        <div class="post-content">
          <h2>{{ post.title.rendered }}</h2>
          <img :src="imgData[post.id]" width="450" height="250"/>
          <p v-html="post.excerpt.rendered"></p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
export default {
  name: 'MainPosts',
  mounted () {
    this.getPosts()
  },
  data () {
    return {
      posts: [],
      imgData: [],
      postsUrl: process.env.ROOT_API + '/wp-json/wp/v2/posts',
      postsData: {
        per_page: 10,
        page: 1
      },
      imgUrl: process.env.ROOT_API + '/wp-json/wp/v2/media/'
    }
  },
  methods: {
    getPosts () {
      axios.get(this.postsUrl, {params: this.postsData})
        .then((response) => {
          this.posts = response.data
          for (let post in this.posts) {
            let featuredMedia = this.posts[post].featured_media
            let postId = this.posts[post].id
            Vue.set(this.imgData, postId, 'https://widgetsdataifx.blob.core.windows.net/widgetsdataifx/Content/themes/Davivienda/images/loading_spinner.gif')

            if (featuredMedia && featuredMedia !== '' && postId && postId !== '') {
              axios.get(this.imgUrl + featuredMedia)
                .then((responseImg) => {
                  Vue.set(this.imgData, postId, responseImg.data.source_url)
                })
                .catch((error) => {
                  console.log(error)
                })
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
