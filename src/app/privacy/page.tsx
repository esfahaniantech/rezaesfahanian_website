"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/PageHeader"

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal data"
      />

      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border border-border p-8 mb-8">
            <p className="text-muted-foreground mb-4">
              <strong>Last updated:</strong> January 2025
            </p>
            <p className="text-muted-foreground">
              This privacy policy explains how Reza Esfahanian ("we", "us", or "I") 
              collects, uses, and protects your personal data when you visit this website. 
              We are committed to ensuring the privacy and security of your personal information 
              in compliance with the General Data Protection Regulation (GDPR) and other 
              applicable data protection laws.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                1. Data Controller
              </h2>
              <p className="text-muted-foreground">
                The data controller responsible for your personal data is:<br /><br />
                Reza Esfahanian<br />
                Hamburg, Germany<br />
                Email: hello@rezaesfahanian.com
              </p>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                2. Data We Collect
              </h2>
              <p className="text-muted-foreground mb-4">
                We may collect the following types of personal data:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Contact Information:</strong> Name, email address when you use our contact form</li>
                <li><strong>Usage Data:</strong> IP address, browser type, operating system, pages visited, time spent on pages</li>
                <li><strong>Cookies:</strong> Technical and analytical cookies as described in Section 5</li>
                <li><strong>Communication Data:</strong> Any information you provide when contacting us</li>
              </ul>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                3. How We Use Your Data
              </h2>
              <p className="text-muted-foreground mb-4">
                We use your personal data for the following purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website and user experience</li>
                <li>To analyze website traffic and usage patterns</li>
                <li>To send marketing communications (only with your explicit consent)</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                4. Legal Basis for Processing
              </h2>
              <p className="text-muted-foreground mb-4">
                We process your personal data based on the following legal grounds under GDPR:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> For analytics cookies and marketing communications</li>
                <li><strong>Legitimate Interest (Art. 6(1)(f) GDPR):</strong> For website security and improvement</li>
                <li><strong>Contract Performance (Art. 6(1)(b) GDPR):</strong> To respond to your inquiries</li>
                <li><strong>Legal Obligation (Art. 6(1)(c) GDPR):</strong> To comply with applicable laws</li>
              </ul>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                5. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted-foreground mb-4">
                This website uses cookies and similar tracking technologies. We categorize them as follows:
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                5.1 Essential Cookies
              </h3>
              <p className="text-muted-foreground mb-4">
                These cookies are necessary for the website to function properly. They do not 
                require your consent.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                5.2 Analytics Cookies
              </h3>
              <p className="text-muted-foreground mb-4">
                We use the following analytics services (only with your consent):
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                <li>
                  <strong>Google Analytics:</strong> We use Google Analytics 4 to understand how 
                  visitors interact with our website. Google Analytics collects information such as 
                  how often users visit the site, what pages they visit, and what other sites they 
                  used prior to coming to this site. We use IP anonymization. Data may be transferred 
                  to the USA under appropriate safeguards (EU-US Data Privacy Framework).
                  <br />
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Google Privacy Policy
                  </a>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
                5.3 Marketing Cookies
              </h3>
              <p className="text-muted-foreground mb-4">
                We use the following marketing services (only with your consent):
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-4">
                <li>
                  <strong>Meta (Facebook) Pixel:</strong> We use the Meta Pixel to measure the 
                  effectiveness of our advertising and understand actions people take on our website. 
                  This helps us deliver more relevant ads. Data may be transferred to the USA under 
                  appropriate safeguards.
                  <br />
                  <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Meta Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>HubSpot:</strong> We use HubSpot for customer relationship management 
                  and marketing automation. HubSpot may place cookies to track your interactions 
                  with our website and communications. Data is processed in accordance with HubSpot's 
                  privacy practices.
                  <br />
                  <a href="https://legal.hubspot.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    HubSpot Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                6. Your Rights Under GDPR
              </h2>
              <p className="text-muted-foreground mb-4">
                Under the General Data Protection Regulation, you have the following rights:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Right of Access (Art. 15):</strong> You can request a copy of your personal data</li>
                <li><strong>Right to Rectification (Art. 16):</strong> You can request correction of inaccurate data</li>
                <li><strong>Right to Erasure (Art. 17):</strong> You can request deletion of your data ("right to be forgotten")</li>
                <li><strong>Right to Restrict Processing (Art. 18):</strong> You can request limitation of processing</li>
                <li><strong>Right to Data Portability (Art. 20):</strong> You can receive your data in a structured format</li>
                <li><strong>Right to Object (Art. 21):</strong> You can object to processing based on legitimate interests</li>
                <li><strong>Right to Withdraw Consent (Art. 7):</strong> You can withdraw consent at any time</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise any of these rights, please contact us at hello@rezaesfahanian.com.
              </p>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                7. Data Retention
              </h2>
              <p className="text-muted-foreground">
                We retain your personal data only for as long as necessary for the purposes 
                set out in this policy, unless a longer retention period is required or permitted 
                by law. Contact form submissions are retained for up to 3 years. Analytics data 
                is retained according to the respective service provider's policies (typically 
                26 months for Google Analytics).
              </p>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                8. Data Security
              </h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your 
                personal data against unauthorized access, alteration, disclosure, or destruction. 
                This includes SSL/TLS encryption for data in transit, secure hosting infrastructure, 
                and regular security assessments. However, no method of transmission over the 
                Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-muted-foreground">
                Some of our service providers (Google, Meta, HubSpot) are based in the United States. 
                Where personal data is transferred outside the European Economic Area (EEA), we ensure 
                appropriate safeguards are in place, such as Standard Contractual Clauses approved by 
                the European Commission or reliance on the EU-US Data Privacy Framework for certified 
                companies.
              </p>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                10. Third-Party Links
              </h2>
              <p className="text-muted-foreground">
                This website may contain links to third-party websites. We are not responsible for 
                the privacy practices of these external sites. We encourage you to read the privacy 
                policies of any linked websites you visit.
              </p>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                11. Changes to This Policy
              </h2>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time to reflect changes in our 
                practices or for legal, operational, or regulatory reasons. We will notify you 
                of any material changes by posting the new policy on this page with an updated 
                "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                12. Supervisory Authority
              </h2>
              <p className="text-muted-foreground">
                If you believe that our processing of your personal data infringes data protection 
                laws, you have the right to lodge a complaint with a supervisory authority. In Germany, 
                you may contact the Hamburg Commissioner for Data Protection and Freedom of Information 
                (HmbBfDI) or the supervisory authority in your place of residence.
              </p>
            </div>

            <div className="bg-card border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                13. Contact Us
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about this privacy policy or our data practices, 
                please contact us at:<br /><br />
                Email: hello@rezaesfahanian.com<br />
                LinkedIn: linkedin.com/in/reza-esfahanian
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

