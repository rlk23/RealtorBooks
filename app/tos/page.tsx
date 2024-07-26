import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: September 26, 2023

Welcome to HousHub!

These Terms of Service ("Terms") govern your use of the HousHub website at https://houshub.com ("Website") and the services provided by HousHub. By using our Website and services, you agree to these Terms.

1. Description of HousHub

HousHub is a platform that offers a comprehensive CRM solution for realtors to efficiently manage their properties, rentals, calendars, and finances.

2. Ownership and Usage Rights

When you subscribe to HousHub, you gain the right to access and utilize the CRM platform for managing your real estate portfolio. You retain ownership of your data but are prohibited from reselling our service. We offer a full refund within 7 days of subscription, as specified in our refund policy.

3. User Data and Privacy

We collect and securely store user data, including personal and financial information, to facilitate our services. For details on how we handle your data, please refer to our Privacy Policy at https://houshub.com/privacy-policy.

4. Non-Personal Data Collection

We utilize cookies to gather non-personal data to enhance our services and user experience.

5. Governing Law

These Terms are subject to the laws of United States of America.

6. Updates to the Terms

We reserve the right to update these Terms periodically. Users will receive email notifications of any changes.

For inquiries or concerns regarding these Terms of Service, please contact us at rami@houshub.com.

Thank you for choosing HousHub!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
