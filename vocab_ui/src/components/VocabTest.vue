<template>
  <div>
    <h2>Score: {{ score }} out of {{ words.length }}</h2>
    <!-- <p>{{ currWord }}</p> -->

    <form action="#" @submit.prevent="onSubmit" class="form-container">
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
      <div class="ui labeled input fluid custom_english">
        <div class="ui label"><i class="vn flag"></i>Vietnamese</div>
        <input
          type="text"
          placeholder="Enter word..."
          v-model="vietnamese"
          :disabled="testOver"
          autocomplete="off"
        />
      </div>

      <button class="primary ui button" :disabled="testOver">Submit</button>
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
      vietnamese: "",
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
      if (
        this.english === this.currWord.english &&
        this.vietnamese === this.currWord.vietnamese
      ) {
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
      this.vietnamese = "";
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
.form-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.ui.labeled.input {
  margin-bottom: 20px;
}

h2 {
  color: #007bff;
}
</style>
