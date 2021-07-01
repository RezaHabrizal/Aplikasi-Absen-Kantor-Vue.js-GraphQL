<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Please complete your personal information.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="edit">
          <div class="shadow sm:rounded-md">
            <div class="px-4 py-5 bg-gray-100 sm:p-6">
              <div class="grid grid-cols-4 gap-6">
                <div class="mt-1 col-span-6 sm:col-span-3">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Full name</label
                  >
                  <input
                    v-model="name"
                    type="text"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      h-3/4
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="mt-1 col-span-6 sm:col-span-3">
                  <label
                    for="country"
                    class="block text-sm font-medium text-gray-700"
                    >Division</label
                  >
                  <select
                    v-model="divisi"
                    class="
                      mt-1
                      block
                      w-full
                      py-2
                      px-3
                      border border-gray-300
                      bg-white
                      rounded-md
                      shadow-sm
                      focus:outline-none
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      sm:text-sm
                    "
                  >
                    <option>Sales & Marketing</option>
                    <option>Operation</option>
                    <option>IT</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      email: "",
      name: "",
      divisi: "",
    };
  },
  methods: {
    edit() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation (
              $email: String
              $name: String
              $divisi: String
              $status: String
            ) {
              updateProfile(
                email: $email
                name: $name
                divisi: $divisi
                status: $status
              ) {
                name
                email
                status
                divisi
              }
            }
          `,
          // Parameters
          variables: {
            email: this.email,
            name: this.name,
            divisi: this.divisi,
            status: "Belum Kerja",
          },
        })
        .then(({ data }) => {
          // Result
          localStorage.setItem("user", JSON.stringify(data.updateProfile));
          this.$router.push("/");
        })
        .catch((error) => {
          // Error
          console.error(error);
        });
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.email = user.email;
  },
};
</script>