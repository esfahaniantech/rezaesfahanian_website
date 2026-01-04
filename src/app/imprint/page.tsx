"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/shared/PageHeader"

export default function ImprintPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Legal"
        title="Imprint"
        subtitle="Legal disclosure in accordance with § 5 TMG (German Telemedia Act)"
      />

      <section className="py-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto prose dark:prose-invert"
        >
          <div className="bg-card border border-border p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Information according to § 5 TMG
            </h2>
            <p className="text-muted-foreground">
              Reza Esfahanian<br />
              Hamburg, Germany
            </p>
          </div>

          <div className="bg-card border border-border p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground">
              Email: hello@rezaesfahanian.com<br />
              LinkedIn: linkedin.com/in/reza-esfahanian
            </p>
          </div>

          <div className="bg-card border border-border p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Responsible for Content according to § 55 Abs. 2 RStV
            </h2>
            <p className="text-muted-foreground">
              Reza Esfahanian<br />
              Hamburg, Germany
            </p>
          </div>

          <div className="bg-card border border-border p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Disclaimer
            </h2>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Liability for Content
            </h3>
            <p className="text-muted-foreground mb-4">
              The contents of this website have been created with the utmost care. However, 
              I cannot guarantee the accuracy, completeness, or timeliness of the content. 
              As a service provider, I am responsible for my own content on these pages 
              according to § 7 Abs.1 TMG (German Telemedia Act). According to §§ 8 to 10 TMG, 
              however, I am not obligated as a service provider to monitor transmitted or 
              stored third-party information or to investigate circumstances that indicate 
              illegal activity. Obligations to remove or block the use of information under 
              general law remain unaffected. Liability in this regard is only possible from 
              the point in time at which knowledge of a specific infringement of the law is 
              obtained. Upon becoming aware of such violations, I will remove this content 
              immediately.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Liability for Links
            </h3>
            <p className="text-muted-foreground mb-4">
              This website contains links to external third-party websites over whose content 
              I have no influence. Therefore, I cannot assume any liability for this external 
              content. The respective provider or operator of the linked pages is always 
              responsible for the content of the linked pages. The linked pages were checked 
              for possible legal violations at the time of linking. Illegal content was not 
              recognizable at the time of linking. However, permanent monitoring of the content 
              of linked pages is not reasonable without concrete evidence of an infringement. 
              Upon becoming aware of legal violations, I will remove such links immediately.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Copyright
            </h3>
            <p className="text-muted-foreground mb-4">
              The content and works created on this website are subject to German copyright 
              law. The duplication, processing, distribution, and any kind of exploitation 
              outside the limits of copyright law require the written consent of the 
              respective author or creator. Downloads and copies of this website are only 
              permitted for private, non-commercial use. Insofar as the content on this 
              website was not created by the operator, the copyrights of third parties are 
              respected. In particular, third-party content is marked as such. Should you 
              nevertheless become aware of a copyright infringement, please notify me 
              accordingly. Upon becoming aware of legal violations, I will remove such 
              content immediately.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Professional Information
            </h3>
            <p className="text-muted-foreground mb-4">
              The information provided on this website is for general informational purposes 
              only. It is not intended to constitute professional advice and should not be 
              relied upon as such. No professional-client relationship is established through 
              the use of this website or communication through it. For specific advice related 
              to your individual circumstances, please consult a qualified professional.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              No Warranties
            </h3>
            <p className="text-muted-foreground mb-4">
              This website and its content are provided "as is" without any warranties of any 
              kind, either express or implied. I disclaim all warranties, including but not 
              limited to implied warranties of merchantability, fitness for a particular 
              purpose, and non-infringement. I do not warrant that this website will be 
              uninterrupted, error-free, or free of viruses or other harmful components.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Limitation of Liability
            </h3>
            <p className="text-muted-foreground mb-4">
              To the fullest extent permitted by applicable law, I shall not be liable for 
              any indirect, incidental, special, consequential, or punitive damages, or any 
              loss of profits or revenues, whether incurred directly or indirectly, or any 
              loss of data, use, goodwill, or other intangible losses, resulting from your 
              access to or use of or inability to access or use this website.
            </p>
          </div>

          <div className="bg-card border border-border p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              EU Dispute Resolution
            </h2>
            <p className="text-muted-foreground">
              The European Commission provides a platform for online dispute resolution (ODR): 
              <a 
                href="https://ec.europa.eu/consumers/odr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              <br /><br />
              I am not obligated and not willing to participate in dispute resolution 
              proceedings before a consumer arbitration board.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

