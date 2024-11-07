<template>
  <div>
    <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

    <form action="#" @submit.prevent="onSubmit">
      <div class="ui labeled input fluid custom_input">
        <div class="ui label"><i class="germany flag"></i> German</div>
        <input
          type="text"
          readonly
          :disabled="testOver"
          :value="currWord.german"
        />
      </div>
      <div class="ui labeled input fluid custom_english">
        <div class="ui label"><i class="united kingdom flag"></i> English</div>
        <input
          type="text"
          placeholder="Enter word..."
          v-model="english"
          :disabled="testOver"
          autocomplete="off"
        />
      </div>

      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <p :class="{ results: resultClass }">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "vocab-test",
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      randWords: this.shuffleWords([...this.words]), // Create a new data property for random words
      incorrectGuesses: [],
      result: "",
      resultClass: "",
      english: "",
      score: 0,
      testOver: false,
    };
  },
  computed: {
    currWord: function () {
      return this.randWords.length ? this.randWords[0] : "";
    },
  },
  methods: {
    // Method to shuffle words
    shuffleWords(words) {
      return words.sort(() => 0.5 - Math.random());
    },
    onSubmit: function () {
      if (this.english === this.currWord.english) {
        toast.success("Correct!", {
          autoClose: 1000,
        });
        this.score += 1;
      } else {
        toast.error("Wrong!", {
          autoClose: 1000,
        });
        this.incorrectGuesses.push(this.currWord.german);
      }

      this.english = "";
      this.randWords.shift();

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults: function () {
      if (this.incorrectGuesses.length === 0) {
        this.result = "You got everything correct. Well done!";
        this.resultClass = "success";
      } else {
        const incorrect = this.incorrectGuesses.join(", ");
        this.result = `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = "error";
      }
    },
  },
};
</script>

<style scoped>
.custom_english {
  padding-bottom: 10px;
}
.custom_input {
  margin: 10px 0;
}
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}
</style>
