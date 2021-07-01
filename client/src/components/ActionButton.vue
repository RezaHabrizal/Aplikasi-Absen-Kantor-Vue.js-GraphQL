<template>
  <div class="container text-center mx-auto p-4">
    <div class="flex justify-center rounded-lg text-lg" role="group">
      <button
        v-if="!status || status === 'Selesai Kerja'"
        class="
          mr-2
          bg-white
          text-blue-500
          hover:bg-blue-500
          hover:text-white
          border border-blue-500
          rounded-lg
          px-4
          py-2
          mx-0
          outline-none
          focus:shadow-outline
        "
        @click="mulaiKerja"
      >
        Mulai Kerja
      </button>
      <button
        v-if="status === 'Mulai Kerja' || status === 'Lanjut Kerja'"
        class="
          mr-2
          bg-white
          text-blue-500
          hover:bg-blue-500
          hover:text-white
          border border-blue-500
          rounded-lg
          px-4
          py-2
          mx-0
          outline-none
          focus:shadow-outline
        "
        @click="istirahat"
      >
        Istirahat
      </button>
      <button
        v-if="status === 'Mulai Kerja' || status === 'Lanjut Kerja'"
        class="
          mr-2
          bg-white
          text-blue-500
          hover:bg-blue-500
          hover:text-white
          border border-blue-500
          rounded-lg
          px-4
          py-2
          mx-0
          outline-none
          focus:shadow-outline
        "
        @click="selesaiKerja"
      >
        Selesai Kerja
      </button>
      <button
        v-if="status === 'Istirahat'"
        class="
          bg-white
          text-blue-500
          hover:bg-blue-500
          hover:text-white
          border border-blue-500
          rounded-lg
          px-4
          py-2
          mx-0
          outline-none
          focus:shadow-outline
        "
        @click="lanjutKerja"
      >
        Lanjut Kerja
      </button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      status: "",
      email: "",
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.status = user.status;
    this.email = user.email;
  },
  methods: {
    mulaiKerja() {
      this.status = "Mulai Kerja";
      this.update();
    },
    selesaiKerja() {
      this.status = "Selesai Kerja";
      this.update();
    },
    istirahat() {
      this.status = "Istirahat";
      this.update();
    },
    lanjutKerja() {
      this.status = "Lanjut Kerja";
      this.update();
    },
    update() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation ($email: String, $status: String) {
              updateStatus(email: $email, status: $status) {
                name
                email
                status
                updatedAt
              }
            }
          `,
          // Parameters
          variables: {
            email: this.email,
            status: this.status,
          },
        })
        .then(({ data }) => {
          // Result
          this.$store.commit("setTimeStamp", data.updateStatus);
          localStorage.setItem("user", JSON.stringify(data.updateStatus));
          console.log(data);
        })
        .catch((error) => {
          // Error
          console.error(error);
        });
    },
  },
};
</script>