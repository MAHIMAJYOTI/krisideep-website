export interface FAQ {
  id: string;
  question: string;
  questionHindi: string;
  answer: string;
  answerHindi: string;
  category: string;
}

export interface FAQJson {
  id: string;
  question: string;
  questionHindi: string;
  answer: string;
  answerHindi: string;
  category: string;
}

export const faqFromJson = (json: FAQJson): FAQ => ({
  id: json.id,
  question: json.question,
  questionHindi: json.questionHindi,
  answer: json.answer,
  answerHindi: json.answerHindi,
  category: json.category,
});

export const faqToJson = (faq: FAQ): FAQJson => ({
  id: faq.id,
  question: faq.question,
  questionHindi: faq.questionHindi,
  answer: faq.answer,
  answerHindi: faq.answerHindi,
  category: faq.category,
});
