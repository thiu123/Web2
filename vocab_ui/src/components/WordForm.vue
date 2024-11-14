<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>
    <div class="ui labeled input fluid custom_input">
      <div class="ui label"><i class="germany flag"></i> German</div>
      <input
        type="text"
        placeholder="Enter word..."
        v-model="localWord.german"
      />
    </div>

    <div class="ui labeled input fluid custom_english">
      <div class="ui label"><i class="united kingdom flag"></i> English</div>
      <input
        type="text"
        placeholder="Enter word..."
        v-model="localWord.english"
      />
    </div>
    <button class="positive ui button">Submit</button>
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
        return { german: "", english: "" };
      },
    },
  },
  data() {
    return {
      errorsPresent: false,
      localWord: {
        german: this.word.german || "",
        english: this.word.english || "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (
        this.localWord.english.trim() === "" ||
        this.localWord.german.trim() === ""
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
.custom_english {
  margin-bottom: 10px;
}
.custom_input {
  margin: 10px 0;
}
.error {
  color: red;
}
</style>
