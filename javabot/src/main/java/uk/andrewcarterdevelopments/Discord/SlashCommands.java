package uk.andrewcarterdevelopments.Discord;

import net.dv8tion.jda.api.entities.User;
import net.dv8tion.jda.api.entities.channel.ChannelType;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

import java.awt.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Andrew Carter
 */
public class SlashCommands extends ListenerAdapter {

    @Override
    public void onSlashCommandInteraction(SlashCommandInteractionEvent event) {

        if (event.getName().equals("fact")) {

            event.reply(BucketBot.getRandomFact()).queue();

        } else if (event.getName().equals("notify")) {

            if (event.getOption("channel").getAsChannel().getType().equals(ChannelType.TEXT)) { // if the channel is a text channel
                BucketBot.createNotifier(event.getGuild(), event.getOption("channel").getAsChannel(), event.getOption("frequency").getAsInt());
                event.reply("Created a scheduled notification for a random sustainability fact!").queue();
            } else {
                event.reply("The channel you specified is not a text channel.").queue();
            }

        }
    }

}
