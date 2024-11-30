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
    <button class="positive ui button submit-button">Submit</button>
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
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #f0f0f0;
}

.ui.labeled.input {
  margin-bottom: 15px;
}

.input-field {
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  padding: 10px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

.submit-button {
  padding: 10px;
  font-size: 1.1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}
</style>
