package uk.andrewcarterdevelopments.Discord;

import org.json.JSONObject;

import java.io.*;
import java.util.Calendar;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class MessageSender {

    private ScheduledExecutorService scheduler;

    public MessageSender() {

        scheduler = Executors.newScheduledThreadPool(1);

        Runnable task = () -> {

            System.out.println("Run scheduled task.");

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

            // Parse the JSON string into a JSONObject
            JSONObject jsonObject = new JSONObject(jsonStringBuilder.toString());

            // Iterate over the keys of the JSON object
            for (String key : jsonObject.keySet()) {

                System.out.println(key);

                JSONObject notifier = jsonObject.getJSONObject(key);

                if (notifier.getInt("counter") + 1 >= notifier.getInt("frequency")) {
                    notifier.put("counter", 0);
                    BucketBot.dispatchMessage(key, notifier.getString("guild"), notifier.getString("channel"));
                } else {
                    notifier.put("counter", notifier.getInt("counter") + 1);
                }

                jsonObject.put(key, notifier);

            }

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

        };

        scheduler.scheduleAtFixedRate(task, 1, 60, TimeUnit.MINUTES);

    }

}
