const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

app.use(express.json());

app.post("/extract", async (req, res) => {
  try {
    const { url } = req.body;

    // Validate the URL (you might want to use a more robust validation library)
    if (!url) {
      return res.status(400).send({ error: "Invalid URL" });
    }

    // Make a GET request to the URL
    const response = await axios.get(url);

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Select and extract text from all <p> tags
    const pText = $(".job-box-loop .col-lg-8 .title")
      .map((index, element) => $(element).text())
      .get();

    res.status(200).send({ data: pText });
  } catch (error) {
    console.error("Error fetching or processing the webpage:", error);
    res.status(500).send({ error: "Failed to fetch or process the webpage" });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
