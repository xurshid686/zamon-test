// Telegram bot API endpoint
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, surname, score, total, answers } = req.body;
    
    const message = `
🎯 Zamonlar Test Results
👤 Student: ${name} ${surname}
📊 Score: ${score}/${total} (${Math.round((score/total)*100)}%)
📝 Test: Simple and Continuous Tenses

Detailed Results:
${answers.map((answer, index) => 
  `Q${index + 1}: ${answer.isCorrect ? '✅' : '❌'} - ${!answer.isCorrect ? `Correct: "${answer.correct}"` : 'Correct!'}`
).join('\n')}

🏆 Performance: ${score >= 16 ? 'Excellent!' : score >= 12 ? 'Good!' : 'Needs improvement!'}
Test completed at: ${new Date().toLocaleString()}
    `;

    // Your Telegram bot configuration
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
