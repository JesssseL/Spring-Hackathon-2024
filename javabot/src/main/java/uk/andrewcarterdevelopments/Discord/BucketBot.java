package uk.andrewcarterdevelopments.Discord;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.OnlineStatus;
import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.entities.Activity;
import net.dv8tion.jda.api.entities.Guild;
import net.dv8tion.jda.api.entities.channel.Channel;
import net.dv8tion.jda.api.interactions.commands.DefaultMemberPermissions;
import net.dv8tion.jda.api.interactions.commands.OptionType;
import net.dv8tion.jda.api.interactions.commands.build.Commands;
import net.dv8tion.jda.api.interactions.components.buttons.Button;
import net.dv8tion.jda.api.requests.GatewayIntent;
import net.dv8tion.jda.api.utils.cache.CacheFlag;
import org.json.JSONArray;
import org.json.JSONObject;

import java.awt.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.Random;
import java.util.UUID;

/**
 * @author Andrew Carter
 */
public class BucketBot {

    private static JDA jda;
    private static MessageSender sender;

    public static void main(String[] args) throws InterruptedException, IOException {

        // Instantiate message scheduler
        sender = new MessageSender();

        // Create data files if they don't exist
        Path facts = Paths.get("facts.json");
        Path notifiers = Paths.get("notifiers.json");
        if (!Files.exists(facts)) {
            System.out.println("Creating facts file.");
            Files.createFile(facts);
            Files.write(facts, Collections.singletonList("[]"));
        }
        if (!Files.exists(notifiers)) {
            System.out.println("Creating notifiers file.");
            Files.createFile(notifiers);
            Files.write(notifiers, Collections.singletonList("{}"));
        }

        // Create JDA Builder
        JDABuilder builder = JDABuilder.createDefault(Private.getToken());

        // Status
        builder.setActivity(Activity.playing("Buckets and Balls!!!"));
        builder.setStatus(OnlineStatus.ONLINE);

        // Builder config
        builder.disableCache(CacheFlag.VOICE_STATE, CacheFlag.SCHEDULED_EVENTS);
        builder.setEnabledIntents(GatewayIntent.DIRECT_MESSAGES, GatewayIntent.DIRECT_MESSAGE_REACTIONS,
                GatewayIntent.GUILD_MESSAGE_REACTIONS, GatewayIntent.GUILD_MESSAGES,
                GatewayIntent.GUILD_EMOJIS_AND_STICKERS, GatewayIntent.GUILD_MEMBERS);
        builder.addEventListeners(new SlashCommands(), new ButtonClick());

        // Build the builder
        jda = builder.build();
        jda.awaitReady();

        // Add commands
        jda.updateCommands().addCommands(
                Commands.slash("fact", "Random fact about sustainability"),
                Commands.slash("notify", "Set up alerts for the bot to notify you of a sustainability fact at a regular interval.")
                        .addOption(OptionType.CHANNEL, "channel", "Text channel to send the alert messages", true)
                        .addOption(OptionType.INTEGER, "frequency", "How many hours between the messages", true)
                        .setGuildOnly(true)
                        .setDefaultPermissions(DefaultMemberPermissions.enabledFor(Permission.MANAGE_CHANNEL))

        ).queue();

    }

    public static JDA getJDA() {
        return jda;
    }

    /*

    File Handling

     */

    public static String getRandomFact() {

        FileReader fileReader = null;
        try {
            fileReader = new FileReader("facts.json");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        BufferedReader bufferedReader = new BufferedReader(fileReader);

        // Read the JSON string from the file
        StringBuilder jsonStringBuilder = new StringBuilder();
        String line;
        while (true) {
            try {
                if (!((line = bufferedReader.readLine()) != null)) break;
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            jsonStringBuilder.append(line);
        }

        // Parse the JSON string into a JSONArray
        JSONArray jsonArray = new JSONArray(jsonStringBuilder.toString());

        Random random = new Random();

        return jsonArray.getString(random.nextInt(jsonArray.length()));

    }

    public static void createNotifier(Guild guild, Channel channel, int frequency) {

        FileReader fileReader = null;
        try {
            fileReader = new FileReader("notifiers.json");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        BufferedReader bufferedReader = new BufferedReader(fileReader);

        // Read the JSON string from the file
        StringBuilder jsonStringBuilder = new StringBuilder();
        String line;
        while (true) {
            try {
                if (!((line = bufferedReader.readLine()) != null)) break;
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            jsonStringBuilder.append(line);
        }

        // Parse the JSON string into a JSONArray
        JSONObject jsonObject = new JSONObject(jsonStringBuilder.toString());

        UUID uuid = UUID.randomUUID();

        JSONObject notifier = new JSONObject();

        notifier.put("guild", guild.getId());
        notifier.put("channel", channel.getId());
        notifier.put("frequency", frequency);
        notifier.put("counter", 0);

        jsonObject.put(uuid.toString(), notifier);

        FileWriter fileWriter = null;
        try {
            fileWriter = new FileWriter("notifiers.json");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

        // Write the JSON object to the file
        try {
            bufferedWriter.write(jsonObject.toString());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Close the BufferedWriter
        try {
            bufferedWriter.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public static void cancelNotifier(String uuid) {

        FileReader fileReader = null;
        try {
            fileReader = new FileReader("notifiers.json");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        BufferedReader bufferedReader = new BufferedReader(fileReader);

        // Read the JSON string from the file
        StringBuilder jsonStringBuilder = new StringBuilder();
        String line;
        while (true) {
            try {
                if (!((line = bufferedReader.readLine()) != null)) break;
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            jsonStringBuilder.append(line);
        }

        // Parse the JSON string into a JSONArray
        JSONObject jsonObject = new JSONObject(jsonStringBuilder.toString());

        jsonObject.remove(uuid);

        FileWriter fileWriter = null;
        try {
            fileWriter = new FileWriter("notifiers.json");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);

        // Write the JSON object to the file
        try {
            bufferedWriter.write(jsonObject.toString());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // Close the BufferedWriter
        try {
            bufferedWriter.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    /*

    Send the actual messages

     */

    public static void dispatchMessage(String uuid, String guildID, String channelID) {

        System.out.println("dispatch " + uuid);

        Button cancel = Button.danger("cancel-" + uuid, "Cancel Task");

        jda.getGuildById(guildID).getTextChannelById(channelID).sendMessage("It's random sustainability fact time!!!\n\n" + getRandomFact() + "\n")
                .addActionRow(cancel)
                .queue();

    }

}