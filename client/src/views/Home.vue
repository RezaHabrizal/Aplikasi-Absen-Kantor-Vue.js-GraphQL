<template>
  <div>
    <div>
      <ActionButton />
    </div>
    <input
      class="
        mb-1
        ml-5
        ring-2 ring-gray-300
        focus:outline-none
        block
        w-1/4
        h-7
        p-2
        shadow-lg
        sm:text-sm
        rounded-md
      "
      type="text"
      placeholder="Filter by name or status"
      v-model="filter"
    />
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
                    Name
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
                    Divisi
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
                    Status
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
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <EmployeeTable
                  v-for="person in filtered"
                  :key="person.id"
                  :person="person"
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
import EmployeeTable from "../components/EmployeeTable.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  data() {
    return {
      filter: "",
      getAllKaryawan: [],
    };
  },
  components: {
    EmployeeTable,
    ActionButton,
  },

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
        this.getAllKaryawan = data.getAllKaryawan;
      })
      .catch((error) => {
        // Error
        console.error(error);
      });
  },

  computed: {
    filtered() {
      return this.getAllKaryawan.filter((el) => {
        const name = el.name.toLowerCase();
        const status = el.status && el.status.toLowerCase();
        const searchTerm = this.filter.toLowerCase();

        return name.includes(searchTerm) || status.includes(searchTerm);
      });
    },
  },
};
</script>