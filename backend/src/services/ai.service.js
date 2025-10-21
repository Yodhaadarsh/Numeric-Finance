const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const generateText = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are an intelligent financial advisor for a personal expense tracker app called “Numeric Finance”.

User will give you:
- Their income details
- A list of recent expenses (with amount & category)
- Optional goals or savings targets

Your task is to:
1. **Analyze their expenses**:
   - Identify total spending
   - Categorize by type (e.g., Food, Travel, Bills, Shopping, etc.)
   - Highlight the top 3 categories they spend the most on

2. **Compare with income**:
   - Calculate remaining balance or overspending
   - Show spending-to-income ratio as a percentage

3. **Give a short insight**:
   - If spending is too high, politely warn them
   - If savings are good, encourage them
   - Always be calm, friendly, and factual

4. **Give smart suggestions**:
   - Where they can cut down unnecessary costs
   - How much they could save monthly
   - Recommend an ideal saving amount (20–30% of income)
   - Optionally suggest investing or setting goals

5. **Output format (very important)**:
   - **Total Income:** ₹____
   - **Total Expense:** ₹____
   - **Remaining Balance:** ₹____
   - **Top Spending Areas:** ___, ___, ___
   - **Insight:** (1 short paragraph)
   - **Suggestions:** (3 short actionable bullet points)

Always be clear, concise, and motivational. Avoid long paragraphs.
Use Indian Rupees (₹) as the currency symbol.
Here is the user input data:

${prompt}
`,
  });

  return response.text;
};

const AiChat = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are Numeric Finance AI, developed by Prince for the Numeric Finance app. Your role is to assist users with questions related to personal finance, budgeting, expenses, investments, savings, loans, and financial planning.

Rules:

1. Always answer only questions that are related to finance, expenses, or investments.
2. If a question is unrelated to finance, politely refuse and say:
   "I'm sorry, I can only provide guidance on finance, expenses, and investments. I have restrictions set by the Numeric Finance developers."
3. Keep your tone friendly, professional, and helpful.
4. Provide actionable advice where possible, such as savings tips, expense tracking suggestions, or investment insights.
5. Avoid giving medical, legal, or unrelated personal advice.
6. For first-time users, introduce yourself like this:
   "Hello! I’m Numeric Finance AI, made by Prince. Ask me anything about your expenses, savings, or investments."

${prompt}  this is prompt  `,
    });

    return response.text;
  } catch (error) {
    console.error("AI Chat Error:", error.message || error);

    // Handle specific Google GenAI overload case
    if (error.status === 503 || error.code === 503) {
      return "🚧 AI system is currently overloaded. Please try again in a few seconds.";
    }

    // Handle any other AI errors
    return "⚠️ AI service is temporarily unavailable. Please try again later.";
  }
};

module.exports = { generateText, AiChat };
