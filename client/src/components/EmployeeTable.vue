<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10">
          <img
            class="h-10 w-10 rounded-full"
            src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
            alt=""
          />
        </div>
        <div
          class="ml-4 cursor-pointer"
          @click="seeDetail(person.email, person.name, person.divisi)"
        >
          <div class="text-sm font-medium text-gray-900">
            {{ person.name }}
          </div>
          <div class="text-sm text-gray-500">
            {{ person.email }}
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ person.title }}</div>
      <div class="text-sm text-gray-500">
        {{ person.divisi }}
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span
        class="
          px-2
          inline-flex
          text-xs
          leading-5
          font-semibold
          rounded-full
          bg-green-100
          text-green-800
        "
      >
        {{ status.email === person.email ? status.status : person.status }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span
        v-if="
          status.status === 'Kerja' ||
          status.status === 'Istirahat' ||
          status.status === 'Lanjut Kerja' ||
          status.status === 'Mulai Kerja'
        "
        class="
          px-2
          inline-flex
          text-xs
          leading-5
          font-semibold
          rounded-full
          bg-green-100
          text-green-800
        "
        >{{
          timestamp.email === person.email ? timestamp.updatedAt : getTime
        }}</span
      >
    </td>
  </tr>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    person: Object,
  },
  computed: {
    ...mapState({
      timestamp: "timestamp",
      status: "status",
    }),
    getTime() {
      let date = new Date(JSON.parse(this.person.updatedAt));
      let hours = date.getHours();
      let minute = date.getMinutes();
      return `${hours} : ${minute}`;
    },
  },
  methods: {
    seeDetail(email, name, divisi) {
      this.$store.commit("setEmail", email);
      this.$router.push({
        name: "Detail",
        params: { email, name, divisi },
        props: true,
      });
    },
  },
};
</script>
