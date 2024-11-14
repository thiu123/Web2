<template>
  <div>
    <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

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

      <button class="positive ui button submit-button" :disabled="testOver">
        Submit
      </button>
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
.form-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
}

.error {
  color: #f44336;
  font-size: 1.2rem;
  margin-bottom: 15px;
  text-align: center;
  font-weight: bold;
}

.ui.labeled.input {
  margin-bottom: 15px;
}

.input-field {
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  padding: 12px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  outline: none;
}

.submit-button {
  padding: 12px;
  font-size: 1.1rem;
  border-radius: 5px;
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #45a049;
}

h2 {
  color: #007bff;
}
</style>
