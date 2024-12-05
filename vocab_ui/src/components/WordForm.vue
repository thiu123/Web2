<template>
  <form action="#" @submit.prevent="onSubmit" class="form-container">
    <p v-if="errorsPresent" class="error">Please fill out all three fields!</p>

    <div class="ui labeled input fluid custom_input">
      <div class="ui label"><i class="germany flag"></i> German</div>
      <input
        type="text"
        placeholder="Enter word..."
        v-model="localWord.german"
        class="input-field"
      />
    </div>

    <div class="ui labeled input fluid custom_english">
      <div class="ui label"><i class="united kingdom flag"></i> English</div>
      <input
        type="text"
        placeholder="Enter word..."
        v-model="localWord.english"
        class="input-field"
      />
    </div>

    <div class="ui labeled input fluid custom_english">
      <div class="ui label"><i class="vn flag"></i>Vietnamese</div>
      <input
        type="text"
        placeholder="Enter word..."
        v-model="localWord.vietnamese"
        class="input-field"
      />
    </div>
    <button class="primary ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: "word-form",
  props: {
    word: {
      type: Object,
      required: false,
      default: () => {
        return { german: "", english: "", vietnamese: "" };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      localWord: {
        german: this.word.german || "",
        english: this.word.english || "",
        vietnamese: this.word.vietnamese || "",
      },
    };
  },
  watch: {
    word: {
      immediate: true,
      handler(newWord) {
        this.localWord = {
          german: newWord.german || "",
          english: newWord.english || "",
          vietnamese: newWord.vietnamese || "",
        };
      },
    },
  },
  methods: {
    onSubmit() {
      if (
        this.localWord.english.trim() === "" ||
        this.localWord.german.trim() === "" ||
        this.localWord.vietnamese.trim() === ""
      ) {
        this.errorsPresent = true;
      } else {
        this.errorsPresent = false;
        this.$emit("createOrUpdate", this.localWord);
        console.log(this.localWord);
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

.error {
  color: #f44336;
  background-color: #fdecea;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 1rem;
  text-align: center;
  border: 1px solid #f44336;
  font-weight: bold;
}
</style>
