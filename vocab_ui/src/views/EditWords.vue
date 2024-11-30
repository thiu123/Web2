<template>
  <div>
    <h1>EDIT WORD</h1>
    <div class="ui divider"></div>
    <word-form
      @createOrUpdate="createOrUpdate($event)"
      :word="word"
    ></word-form>
  </div>
</template>

<script>
import WordForm from "../components/WordForm.vue";
import { api } from "../helpers/helpers";

export default {
  components: {
    WordForm,
  },
  data() {
    return {
      word: {},
    };
  },
  async mounted() {
    try {
      this.word = await api.getWord(this.$route.params.id);
      // console.log("edit", this.word);
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  },
  methods: {
    async createOrUpdate(word) {
      try {
        const updatedNewWord = { ...word, _id: this.$route.params.id };
        // console.log("word", word);
        await api.updateWord(updatedNewWord);
        this.$router.push({
          name: "show",
          params: { id: this.$route.params.id },
        });
      } catch (error) {
        console.error("Error updating word:", error);
      }
    },
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
