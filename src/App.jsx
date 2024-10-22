import { createSignal, Show } from 'solid-js';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0);
  const [answers, setAnswers] = createSignal([]);
  const [showResult, setShowResult] = createSignal(false);
  const [result, setResult] = createSignal('');

  const questions = [
    {
      id: 1,
      question: "Do you enjoy working outdoors?",
      options: ["Yes", "No"],
    },
    {
      id: 2,
      question: "Which of these skills best describe you?",
      options: ["Technical", "Management", "Design", "Craftsmanship"],
    },
    {
      id: 3,
      question: "Do you prefer working alone or in a team?",
      options: ["Alone", "Team"],
    },
    {
      id: 4,
      question: "Are you comfortable with heights?",
      options: ["Yes", "No"],
    },
    {
      id: 5,
      question: "Do you have an interest in mathematics and physics?",
      options: ["Yes", "No"],
    },
  ];

  const careers = {
    outdoorYes: {
      Technical: "Civil Engineer",
      Management: "Site Manager",
      Design: "Landscape Architect",
      Craftsmanship: "Bricklayer",
    },
    outdoorNo: {
      Technical: "Structural Engineer",
      Management: "Project Manager",
      Design: "Architect",
      Craftsmanship: "Electrician",
    },
  };

  const handleOptionSelect = (option) => {
    setAnswers([...answers(), option]);
    if (currentQuestionIndex() < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex() + 1);
    } else {
      calculateResult();
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    const [outdoorAnswer, skillAnswer] = answers();
    const outdoorKey = outdoorAnswer === "Yes" ? "outdoorYes" : "outdoorNo";
    const career = careers[outdoorKey][skillAnswer] || "Construction Worker";
    setResult(career);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
    setResult('');
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <div class="max-w-2xl mx-auto h-full flex flex-col justify-center">
        <h1 class="text-3xl font-bold text-center text-green-600 mb-8">
          UK Construction Career Quiz
        </h1>

        <Show when={!showResult()}>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <p class="text-lg font-semibold text-gray-800 mb-4">
              {questions[currentQuestionIndex()].question}
            </p>
            <div class="space-y-4">
              {questions[currentQuestionIndex()].options.map((option) => (
                <button
                  class="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </Show>

        <Show when={showResult()}>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <p class="text-lg font-semibold text-gray-800 mb-4">
              Based on your answers, a suitable career for you is:
            </p>
            <p class="text-2xl font-bold text-green-600 mb-6">{result()}</p>
            <button
              class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={restartQuiz}
            >
              Retake Quiz
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
}

export default App;