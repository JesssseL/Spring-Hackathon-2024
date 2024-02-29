const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fact")
        .setDescription("Replies with a random fact."),
    async execute(interaction) {
        const sustainabilityFacts = [
            "In 2021, renewable energy sources accounted for over 26% of global electricity production.",
            "The pandemic-related lockdowns led to a temporary 6.4% decrease in global carbon dioxide (CO2) emissions in 2020.",
            "Approximately 18 million acres of forest, an area the size of Panama, are lost each year due to deforestation.",
            "Over 8 million tons of plastic end up in the oceans annually, causing harm to marine life.",
            "About 2.2 billion people worldwide lack access to clean and safe drinking water.",
            "Shifting towards a circular economy could generate economic benefits of $4.5 trillion by 2030.",
            "The planet is currently experiencing a biodiversity crisis, with an estimated 1 million species at risk of extinction.",
            "Roughly one-third of all food produced for human consumption, equivalent to 1.3 billion tons annually, is lost or wasted.",
            "The transportation sector is a significant contributor to greenhouse gas emissions, accounting for approximately 16% of global CO2 emissions.",
            "In 2021, a record number of companies committed to achieving net-zero emissions by 2050, signaling a shift towards more sustainable business practices."
          ];
          
          // Generate a random index
        const randomIndex = Math.floor(Math.random() * sustainabilityFacts.length);
        await interaction.reply(sustainabilityFacts[randomIndex]);
    }
}