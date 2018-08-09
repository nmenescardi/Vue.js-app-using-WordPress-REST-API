<template>
  <div>
    <article v-for="post in posts" :key="post.id">
      <div class="post-content">
        {{ post.id }}
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'MainPosts',
  mounted () {
    this.getPosts()
  },
  data () {
    return {
      posts: '',
      postsUrl: process.env.ROOT_API + '/wp-json/wp/v2/posts',
      postsData: {
        per_page: 20,
        page: 1
      }
    }
  },
  methods: {
    getPosts () {
      axios.get(this.postsUrl, {params: this.postsData})
        .then((response) => {
          this.posts = response.data
          this.configPagination(response.headers)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
