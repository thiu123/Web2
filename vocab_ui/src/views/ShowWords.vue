<template>
  <div>
    <h1>Show Word</h1>

    <div class="ui labeled input fluid input-spacing custom_input">
      <div class="ui label"><i class="germany flag"></i> German</div>
      <input type="text" readonly :value="word.german" />
    </div>
    <div class="ui labeled input fluid">
      <div class="ui label"><i class="united kingdom flag"></i> English</div>
      <input type="text" readonly :value="word.english" />
    </div>
    <div class="actions">
      <router-link
        :to="{ name: 'edit', params: { id: this.$route.params.id } }"
      >
        Edit word
      </router-link>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/helpers";

export default {
  data() {
    return {
      word: "",
    };
  },
  async mounted() {
    try {
      this.word = await api.getWord(this.$route.params.id);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  },
};
</script>
<style scoped>
.custom_input {
  margin: 10px 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

div {
  animation: fadeIn 0.5s;
}
</style>
