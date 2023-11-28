import { FaAngleDown } from "react-icons/fa6";

const Faq = () => {
  const faqData = [
    {
      question: "How do I create a survey?",
      answer:
        "Creating a survey is easy. Simply navigate to the 'Create Survey' section and follow the step-by-step instructions.",
    },
    {
      question: "Can I customize the design of my survey?",
      answer:
        "Yes, you have the flexibility to customize the design of your survey. Explore the 'Design' options during the survey creation process.",
    },
    {
      question: "What types of questions can I add to my survey?",
      answer:
        "You can add various types of questions, including multiple-choice, open-ended, and rating questions. Choose the type that best fits your survey content.",
    },
    {
      question: "How can I analyze survey results?",
      answer:
        "Once your survey is complete, you can access detailed analytics in the 'Results' section. View response trends, demographics, and more to gain valuable insights.",
    },
    {
      question: "Is my survey data secure?",
      answer:
        "Yes, we prioritize the security of your survey data. Our platform employs encryption and strict privacy measures to ensure the confidentiality of your information.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <ul className="divide-y shadow-lg rounded-lg overflow-hidden">
        {faqData.map((faq, index) => (
          <li key={index}>
            <details className="group">
              <summary className="flex items-center gap-3 px-4 py-3 font-medium cursor-pointer transition-colors group-hover:bg-blue-100">
                <FaAngleDown className="text-blue-500" />
                <span className="text-blue-800">{faq.question}</span>
              </summary>

              <article className="px-4 pb-4">
                <p className="text-gray-700">{faq.answer}</p>
              </article>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Faq;
