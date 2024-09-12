import { OpenAI } from "openai";
import readline from "readline";
import { writeFileSync } from 'fs';

import { API_KEY } from "./env.js";

const openai = new OpenAI({
    apiKey: API_KEY,
    temperature: 0.6,
    max_tokens: 4069
});

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

userInterface.prompt();
userInterface.on("line", async input => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "Your name is Ann. You are a helpful and friendly assistant. Provide detailed and engaging responses."
            },
            {
                role: "user",
                content: input,
            },
        ],
    });

    console.log(completion.choices[0].message.content + '\n');

    userInterface.prompt();
});