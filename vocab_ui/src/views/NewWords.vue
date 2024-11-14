<template>
  <div>
    <h1>New Word</h1>
    <word-form @createOrUpdate="createOrUpdate"></word-form>
  </div>
</template>

<script>
import WordForm from "../components/WordForm.vue";
import { api } from "../helpers/helpers";

export default {
  components: {
    WordForm,
  },
  methods: {
    async createOrUpdate(word) {
      try {
        const res = await api.createWord(word);
        // console.log(res);
        this.$router.push(`/all-words/${res._id}`);
      } catch (error) {
        console.error("Error creating/updating word:", error);
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
