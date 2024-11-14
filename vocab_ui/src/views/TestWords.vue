<template>
  <div>
    <h1>Test</h1>

    <div v-if="words.length < 5">
      <p>You need to enter at least five words to begin the test</p>
    </div>
    <div v-else>
      <vocab-test :words="words"></vocab-test>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/helpers";
import VocabTest from "../components/VocabTest.vue";

export default {
  name: "TestWord",
  components: {
    "vocab-test": VocabTest,
  },
  data() {
    return {
      words: [],
    };
  },
  async mounted() {
    try {
      this.words = await api.getWords();
    } catch (error) {
      console.error("Error fetching words:", error);
      // Optionally, set an error state here to notify the user
    }
  },
};
</script>

<style scoped>
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
h1 {
  color: #007bff;
}
</style>
