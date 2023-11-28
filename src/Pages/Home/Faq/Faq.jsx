import { FaMoneyCheckAlt, FaPoll, FaUserCog } from "react-icons/fa";
import { FaAngleDown, FaComments } from "react-icons/fa6";
import Container from "../../../Components/Container";
import Heading from "../../../Components/Heading";

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

  const steps = [
    {
      icon: <FaUserCog className="text-green-500" />,
      title: "User Management",
      details:
        "Implement a robust user management system to handle user registration, login, and profiles.",
    },
    {
      icon: <FaPoll className="text-blue-500" />,
      title: "Survey Creation",
      details:
        "Craft a feature-rich platform for survey creation with various question types and customization options.",
    },
    {
      icon: <FaMoneyCheckAlt className="text-yellow-500" />,
      title: "Payment Integration",
      details:
        "Integrate payment functionalities to support transactions and premium features for users.",
    },
    {
      icon: <FaComments className="text-purple-500" />,
      title: "User Interaction",
      details:
        "Enhance user interaction through features like voting, commenting, and result analysis.",
    },
  ];

  return (
    <Container>
      <Heading
        mainHeading="How SurveySift Works"
        subHeading="Explore the simplicity and effectiveness of SurveySift. Your feedback, your way."
      ></Heading>
      <div className="flex gap-10 justify-between md:flex-row flex-col p-3 md:p-0">
        <ul className="divide-y shadow-lg rounded-lg overflow-hidden bg-blue-50 md:w-1/2">
          {faqData.map((faq, index) => (
            <li key={index}>
              <details className={``}>
                <summary className="flex items-center gap-3 px-4 py-3 font-medium cursor-pointer transition-colors group-hover:bg-blue-100">
                  <FaAngleDown className={`text-blue-500 `} />
                  <span className="text-blue-800">{faq.question}</span>
                </summary>
                <article className="px-4 pb-4">
                  <p className="text-gray-700">{faq.answer}</p>
                </article>
              </details>
            </li>
          ))}
        </ul>
        <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 md:w-1/2">
          {steps.map((step, index) => (
            <li key={index} className={`mb-10 ms-6`}>
              <div
                className={`absolute flex items-center justify-center w-16 h-16 rounded-full -start-4 ring-4 ring-white bg-blue-100`}
              >
                <p className="text-2xl">{step.icon}</p>
              </div>
              <div className="ml-10">
                <h3 className="font-medium leading-tight">{step.title}</h3>
                <p className="text-sm">{step.details}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Container>
  );
};

export default Faq;
