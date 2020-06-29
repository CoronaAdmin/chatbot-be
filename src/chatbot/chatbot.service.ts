import { Injectable } from '@nestjs/common';

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
require('dotenv').config()
const sessionId = uuid.v4();

@Injectable()
export class ChatbotService {
    async runSample(message:string,projectId = 'nest-chat-bot-hxwsgv') {
    
    try{
      const key = process.env.private_key.toString()
      const sessionClient = new dialogflow.SessionsClient({
        credentials:{
            "private_key": process.env.private_key,
            "client_email": process.env.client_email,
        } 
      });
      const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: message,
            languageCode: 'en-US',
          },
        },
      };
    
      const responses = await sessionClient.detectIntent(request);
      console.log('Detected intent');
      const result = responses[0].queryResult;
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }

      return {
          response:result.fulfillmentText
      }
    }catch(err){
        return err
    }
    }
}
