import { FAQItemType } from "../types/faqTypes";
import FaqItem from "./FaqItem";

function FAQ() {
  const DEMO_FAQS: FAQItemType[] = [
    {
      id: 1,
      name: "Are custom pricing options available for unique use cases?",
      description:
        "Lorem ipsum dolor sit amet consectetur. Quis volutpat dictumst semper sit mus. Porta duis vitae in augue. Sit cras imperdiet in erat ut dignissim nunc. Enim risus egestas vestibulum ridiculus malesuada. Sagittis blandit gravida etiam varius eu donec interdum.Donec scelerisque a nascetur dolor. Urna id proin eget neque hac est ut sed sed. Adipiscing integer vulputate mi dignissim euismod suspendisse fringilla nibh. Id etiam velit aliquet turpis at augue facilisi. ",
    },
    {
      id: 2,
      name: "Are custom pricing options available for unique use cases?",
      description:
        "Lorem ipsum dolor sit amet consectetur. Quis volutpat dictumst semper sit mus. Porta duis vitae in augue. Sit cras imperdiet in erat ut dignissim nunc. Enim risus egestas vestibulum ridiculus malesuada. Sagittis blandit gravida etiam varius eu donec interdum.Donec scelerisque a nascetur dolor. Urna id proin eget neque hac est ut sed sed. Adipiscing integer vulputate mi dignissim euismod suspendisse fringilla nibh. Id etiam velit aliquet turpis at augue facilisi. ",
    },
    {
      id: 3,
      name: "Are custom pricing options available for unique use cases?",
      description:
        "Lorem ipsum dolor sit amet consectetur. Quis volutpat dictumst semper sit mus. Porta duis vitae in augue. Sit cras imperdiet in erat ut dignissim nunc. Enim risus egestas vestibulum ridiculus malesuada. Sagittis blandit gravida etiam varius eu donec interdum.Donec scelerisque a nascetur dolor. Urna id proin eget neque hac est ut sed sed. Adipiscing integer vulputate mi dignissim euismod suspendisse fringilla nibh. Id etiam velit aliquet turpis at augue facilisi. ",
    },
    {
      id: 4,
      name: "Are custom pricing options available for unique use cases?",
      description:
        "Lorem ipsum dolor sit amet consectetur. Quis volutpat dictumst semper sit mus. Porta duis vitae in augue. Sit cras imperdiet in erat ut dignissim nunc. Enim risus egestas vestibulum ridiculus malesuada. Sagittis blandit gravida etiam varius eu donec interdum.Donec scelerisque a nascetur dolor. Urna id proin eget neque hac est ut sed sed. Adipiscing integer vulputate mi dignissim euismod suspendisse fringilla nibh. Id etiam velit aliquet turpis at augue facilisi. ",
    },
  ];

  return (
    <section>
      <div className="container">
        <h2 className="text-[32px] leading-[130%] text-center text-primary lg:text-[48px] xxl:text-[54px]">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-secondary mt-[16px] mb-[32px] lg:text-[18px] xxl:text-[20px] lg:mb-[42px]">
          Real stories from real users — hear their feedback.
        </p>
        <div className="border border-gray-light divide-y divide-gray-light">
          {DEMO_FAQS.map((faq) => (
            <FaqItem
              key={faq.id}
              description={faq.description}
              name={faq.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
