<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ history.status }}</div>
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
        {{ new Date(JSON.parse(history.createdAt)) }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    history: Object,
  },
};
</script>