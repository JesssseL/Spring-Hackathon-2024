package uk.andrewcarterdevelopments.Discord;

import net.dv8tion.jda.api.Permission;
import net.dv8tion.jda.api.events.interaction.component.ButtonInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;

public class ButtonClick extends ListenerAdapter {

    @Override
    public void onButtonInteraction(ButtonInteractionEvent event) {
        // if the button is to cancel the task
        if (event.getComponentId().startsWith("cancel-")) {
            String uuid = event.getComponentId().replaceFirst("cancel-", ""); // extract uuid from button id
            if (event.getMember().hasPermission(Permission.MANAGE_CHANNEL)) { // check perms
                BucketBot.cancelNotifier(uuid);
                event.reply("Cancelled the scheduled task.").queue();
            } else {
                event.reply("You do not have permission to do that!").queue();
            }
        }
    }

}
