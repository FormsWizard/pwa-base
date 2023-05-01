import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  organization: '',
  apiKey: '',
})
const openaiInstance = new OpenAIApi(configuration)

export default openaiInstance

export const model = 'gpt-3.5-turbo'
