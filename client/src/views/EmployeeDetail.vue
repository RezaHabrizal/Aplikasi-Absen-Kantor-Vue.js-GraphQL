<template>
  <div>
    <figure class="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
      <img
        class="w-32 h-32 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
        src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
        alt=""
        width="384"
        height="512"
      />
      <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
        <blockquote>
          <p class="text-lg font-semibold">
            “Working hard is very important. You're not going to get anywhere
            without working extremely hard. Talent is cheaper than table salt.
            What separates the talented individual from the successful one is
            hard work.”
          </p>
        </blockquote>
        <figcaption class="font-medium">
          <div class="text-cyan-600">{{ $route.params.name }}</div>
          <div class="text-gray-500">Divisi {{ $route.params.divisi }}</div>
        </figcaption>
      </div>
    </figure>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    History
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <HistoryTable
                  v-for="history in findHistory"
                  :key="history.email"
                  :history="history"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import HistoryTable from "@/components/HistoryTable.vue";
// import { mapState } from "vuex";
export default {
  components: {
    HistoryTable,
  },

  data() {
    return {
      email: "",
      findHistory: [],
    };
  },

  created() {
    let email = this.$route.params.email;
    this.$apollo
      .query({
        // Query
        query: gql`
          query ($email: String) {
            findHistory(email: $email) {
              status
              createdAt
            }
          }
        `,
        // Parameters
        variables: {
          email: email,
        },
      })
      .then(({ data }) => {
        // Result
        this.findHistory = data.findHistory;
      })
      .catch((error) => {
        // Error
        console.error(error);
      });
  },
};
</script>