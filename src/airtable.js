const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyhvYU4s1UnigIhm"
});

export const base = Airtable.base("appp21IZUWiPoeFGW");
