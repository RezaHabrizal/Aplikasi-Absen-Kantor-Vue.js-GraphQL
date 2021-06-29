<template>
  <div class="hello">
    <div v-for="people in karyawan" :key="people.id">
      {{ people.name }}
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  apollo: {
    karyawan: gql`
      query getKaryawan {
        karyawan {
          _id
          name
          email
        }
      }
    `,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
