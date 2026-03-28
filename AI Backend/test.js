const axios = require("axios");

console.log("Test started...");

axios.post("http://localhost:5000/interview", {
  resume: "BTech CSE student",
  question: "Tell me about yourself",
  answer: "I am a hardworking student with skills in Java."
})
.then(res => {
  console.log("Response:", res.data);
})
.catch(err => {
  console.log("Error:", err.response?.data || err.message);
});