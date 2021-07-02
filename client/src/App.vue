<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  created() {
    this.$apollo
      .query({
        // Query
        query: gql`
          query {
            getAllKaryawan {
              id
              name
              email
              divisi
              status
              updatedAt
            }
          }
        `,
      })
      .then(({ data }) => {
        // Result
        this.$store.commit("setData", data.getAllKaryawan);
      })
      .catch((error) => {
        // Error
        console.error(error);
      });
  },
};
</script>

<style>
</style>
