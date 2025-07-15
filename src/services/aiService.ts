
import { WikipediaResult } from './wikipediaApi';
import { UserPreferences } from '@/hooks/useUser';

export interface AIResponse {
  content: string;
  sources?: string[];
}

export const generateAIResponse = async (
  userInput: string, 
  wikipediaData: WikipediaResult[], 
  userPreferences?: UserPreferences
): Promise<AIResponse> => {
  
  // Create context from Wikipedia data
  const context = wikipediaData.length > 0 
    ? `\n\nRelevant information from Wikipedia:\n${wikipediaData.map(result => 
        `- ${result.title}: ${result.snippet}`
      ).join('\n')}`
    : '';

  // Adapt response based on user preferences
  const levelContext = userPreferences?.learningLevel 
    ? `\nUser learning level: ${userPreferences.learningLevel}. Adjust explanation complexity accordingly.`
    : '';

  const styleContext = userPreferences?.learningStyle
    ? `\nUser learns best through: ${userPreferences.learningStyle} methods.`
    : '';

  // Generate educational response
  const response = generateEducationalResponse(userInput, context, levelContext, styleContext);
  
  const sources = wikipediaData.map(result => result.url);

  return {
    content: response,
    sources: sources.length > 0 ? sources : undefined
  };
};

const generateEducationalResponse = (
  input: string, 
  context: string, 
  levelContext: string, 
  styleContext: string
): string => {
  
  // Simple keyword-based response generation
  const lowerInput = input.toLowerCase();
  
  // Programming topics
  if (lowerInput.includes('javascript') || lowerInput.includes('js') || lowerInput.includes('programming')) {
    return `Great question about programming! Let me break this down step by step:

🎯 **Core Concept**: JavaScript is a versatile programming language that powers web interactivity.

📚 **Key Points**:
1. **Variables**: Store data using let, const, or var
2. **Functions**: Reusable blocks of code
3. **DOM Manipulation**: Change webpage content dynamically
4. **Events**: Respond to user interactions

💡 **Learning Tip**: Start with simple projects like a calculator or to-do list to practice these concepts!

🤔 **Quick Quiz**: Can you tell me what you'd like to build with JavaScript? This will help me tailor the next lesson!${context}${levelContext}${styleContext}`;
  }

  // Math topics
  if (lowerInput.includes('math') || lowerInput.includes('calculus') || lowerInput.includes('algebra')) {
    return `Excellent! Mathematics is the foundation of logical thinking. Let me help you understand this:

🧮 **Step-by-Step Approach**:
1. **Start Simple**: Break complex problems into smaller parts
2. **Visualize**: Draw diagrams or graphs when possible
3. **Practice**: Work through examples systematically
4. **Connect**: Relate new concepts to what you already know

🎨 **Visual Learning**: I recommend using graphs, charts, or even physical objects to understand abstract concepts.

🚀 **Challenge**: What specific math topic would you like to explore? I can create custom examples at your level!${context}${levelContext}${styleContext}`;
  }

  // Science topics
  if (lowerInput.includes('science') || lowerInput.includes('physics') || lowerInput.includes('chemistry') || lowerInput.includes('biology')) {
    return `Science is all about understanding how our world works! Let's explore this together:

🔬 **Scientific Method**:
1. **Observe**: What do you notice?
2. **Question**: What do you want to know?
3. **Hypothesize**: What do you think will happen?
4. **Test**: How can we find out?
5. **Analyze**: What did we learn?

🌟 **Real-World Connection**: Science is everywhere - from cooking (chemistry) to sports (physics) to gardening (biology)!

🎯 **Interactive Learning**: Let's try a thought experiment or simple demonstration related to your question!${context}${levelContext}${styleContext}`;
  }

  // General educational response
  return `Thank you for that fascinating question! As your MentorAI, I'm here to help you learn in the way that works best for you.

🧠 **Let's Think Together**:
I've found some relevant information to help answer your question. Let me break this down in a way that builds your understanding step by step.

📖 **What I've Learned**: ${context || 'Based on your question, here are the key concepts we should explore...'}

🎯 **Personalized Learning**:
- I'll adapt my explanations to match your learning style
- We can go deeper or simpler based on what you need
- I'm here to answer follow-up questions and clarify anything

🤝 **Interactive Approach**:
1. What specific aspect interests you most?
2. Would you like me to explain this with examples?
3. Are there related topics you'd like to explore?

What would you like to dive into next?${levelContext}${styleContext}`;
};
