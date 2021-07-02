<template>
  <div
    class="
      min-h-screen min-w-screen
      flex
      items-center
      justify-center
      bg-gradient-to-r bg-gradient-to-r
      from-cyan-400
      to-sky-500
    "
  >
    <div class="flex flex-col shadow-xl">
      <div
        class="
          py-6
          px-14
          bg-gradient-to-tr
          from-blue-500
          to-pink-300
          rounded-tl-2xl rounded-tr-2xl
          text-center
          space-y-8
        "
      >
        <h2 class="text-white text-xs uppercase">aplikasi absensi kantor</h2>
        <h2 class="text-white text-center font-bold text-xl">LOGIN</h2>
      </div>
      <form @submit.prevent="goLogin">
        <div
          class="
            flex flex-col
            py-6
            px-8
            space-y-5
            bg-white
            rounded-bl-2xl rounded-br-2xl
          "
        >
          <input
            type="email"
            placeholder="Enter your email address"
            class="
              px-2
              py-2
              border-2
              rounded-md
              border-gray-200
              focus:outline-none
              focus:ring-1 focus:ring-pink-300
              focus:border-transparent
            "
            v-model="inputLogin.email"
          />
          <input
            type="password"
            placeholder="Enter your password"
            class="
              px-2
              py-2
              border-2
              rounded-md
              border-gray-200
              focus:outline-none
              focus:ring-1 focus:ring-pink-300
              focus:border-transparent
            "
            v-model="inputLogin.password"
          />
          <button
            type="submit"
            class="
              w-full
              py-3
              bg-pink-400
              text-white
              rounded-md
              text-sm
              focus:outline-none
              focus:ring-2 focus:ring-pink-500
              focus:border-transparent
              shadow-lg
            "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      inputLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    goLogin() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation ($email: String, $password: String) {
              findOneOrCreate(email: $email, password: $password) {
                name
                email
                status
                divisi
              }
            }
          `,
          // Parameters
          variables: {
            email: this.inputLogin.email,
            password: this.inputLogin.password,
          },
        })
        .then(({ data }) => {
          // Result
          localStorage.setItem("user", JSON.stringify(data.findOneOrCreate));
          if (!data.findOneOrCreate.name) {
            this.$router.push("/edit");
          } else {
            this.$nextTick(() => {
              this.$router.push("/");
            });
          }
        })
        .catch((error) => {
          // Error
          console.error(error);
        });
    },
  },
};
</script>