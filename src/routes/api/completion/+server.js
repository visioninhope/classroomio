import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { OPENAI_API_KEY } from '$env/static/private';

// Create an OpenAI API client (that's edge friendly!)
const openAIConfig = new Configuration({
  apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(openAIConfig);

// Set the runtime to edge for best performance
export const config = {
  runtime: 'edge'
};

const instruction = {
  outline: 'a structured lesson outline',
  note: 'a sample lesson note',
  activities: 'few interactive lesson activities to my lecture'
};

export async function POST({ request }) {
  const { prompt } = await request.json();
  const { courseTitle, lessonTitle, type } = prompt;
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Generate ${instruction[type]} given the course title is "${courseTitle}" and the lesson is "${lessonTitle}". Format in HTML without any styling, no ul, ol or li tags, don't include the title of the course and title of the lesson in the result & make sure the content is well detailed.`
      }
    ],
    stream: true
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
