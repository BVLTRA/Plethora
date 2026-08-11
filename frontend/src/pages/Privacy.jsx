import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Privacy.css';
import Logo from '../assets/logo.png';

export default function Privacy() {
  return (
    <main className="privacy-page">
      
      {/* Pinned Logo */}
      <header className="legal-header">
        <Link to="/" className="brand-logo">
          <img src={Logo} alt="Plethora Logo" className="brand-image" />
        </Link>

        {/* The Navigation Pill */}
        <nav className="legal-toggle">
          <NavLink to="/terms" className="toggle-btn">Terms</NavLink>
          <NavLink to="/privacy" className="toggle-btn">Privacy</NavLink>
        </nav>
      </header>

      {/* The Central Reading Column */}
      <div className="privacy-content-wrapper">
        <article className="privacy-document">
          
          <h1 className="privacy-title">Privacy Policy for Plethora</h1>
          <p className="privacy-date">Last Updated: August 11, 2026</p>

          <div className="privacy-body">
            <section>
              <p>This Privacy Policy explains how BVLTRA ("Company", "we", "us", or "our"), based in Pretoria, Gauteng, South Africa, collects, uses, discloses, and safeguards your personal information when you use the Plethora website, mobile applications, and services (collectively, "Plethora" or the "Service").</p>
              <p>Plethora is a global public diary platform designed for personal expression, emotional sharing, and peer interaction. Because users often share sensitive, personal, or emotionally heavy experiences on Plethora, we are committed to protecting your privacy and being transparent about how your data is handled in compliance with the Protection of Personal Information Act (POPIA) of South Africa, the General Data Protection Regulation (GDPR) where applicable, and other global data privacy standards.</p>
            </section>

            <section>
              <h2>1. Information We Collect</h2>
              <p>We collect information in three ways: information you provide directly, information collected automatically, and information from third parties.</p>
              
              <h3>A. Information You Provide Directly</h3>
              <ul>
                <li><strong>Account Information:</strong> When you register for an account, we may collect your email address, username, password, and optional profile details (such as a profile picture or display name).</li>
                <li><strong>User Content (Posts, Responses, Likes):</strong> We collect the diary entries, reflections, responses, comments, and likes you create on the platform. Note: Because Plethora is a public platform, content you publish to public feeds is accessible to other users and the general public.</li>
                <li><strong>Communications:</strong> If you contact us for customer support, bug reports, or moderation inquiries, we collect your contact details and the content of your message.</li>
              </ul>

              <h3>B. Information Collected Automatically</h3>
              <p>When you access or navigate Plethora, we automatically collect technical data, including:</p>
              <ul>
                <li><strong>Log and Device Data:</strong> Your Internet Protocol (IP) address, browser type, operating system, device type, language settings, and referring URLs.</li>
                <li><strong>Usage Data:</strong> Pages viewed, time spent on entries, interaction timestamps, search queries, and error logs.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> Small data files stored on your device that help us remember session state, maintain authentication, and analyze usage patterns.</li>
              </ul>

              <h3>C. Sensitive Personal Data / Special Personal Information</h3>
              <p>Given the nature of Plethora, the entries or comments you choose to post may contain sensitive information regarding your emotional well-being, health, personal relationships, or beliefs. Under POPIA and GDPR, this is considered Special Personal Information (or sensitive data). By explicitly submitting this information to public areas of Plethora, you acknowledge and consent to its collection, display, and processing as outlined in this policy.</p>
            </section>

            <section>
              <h2>2. How We Use Your Information</h2>
              <p>BVLTRA uses your personal information for the following legitimate business and operational purposes:</p>
              <ul>
                <li><strong>Platform Operation:</strong> To create and manage your account, publish your posts and responses, and maintain platform functionality.</li>
                <li><strong>Community Safety & Moderation:</strong> To monitor compliance with our Terms of Use, investigate harassment or bullying, enforce bans, and protect users from harm.</li>
                <li><strong>Service Improvement:</strong> To analyze usage trends, diagnose technical bugs, optimize user experience, and develop new features.</li>
                <li><strong>Communication:</strong> To send you essential system notifications, security alerts, updates to terms or policies, and support responses.</li>
                <li><strong>Legal Compliance:</strong> To fulfill legal obligations under South African law and other applicable international regulations.</li>
              </ul>
            </section>

            <section>
              <h2>3. Legal Bases for Processing (POPIA & GDPR)</h2>
              <p>We process your data under the following legal grounds:</p>
              <ul>
                <li><strong>Consent:</strong> You have given explicit permission to process your data, particularly when sharing public entries or special personal information. You can withdraw consent at any time by deleting your content or account.</li>
                <li><strong>Contractual Necessity:</strong> Processing is necessary to perform our contract with you (delivering the Plethora service under our Terms of Use).</li>
                <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests, such as maintaining platform security, preventing moderation violations, and improving software functionality, provided these interests do not override your fundamental rights.</li>
                <li><strong>Legal Obligation:</strong> Processing is required to comply with applicable laws, judicial proceedings, or lawful requests by public authorities.</li>
              </ul>
            </section>

            <section>
              <h2>4. Public Nature of Posts & Anonymity</h2>
              <p><strong>Public Visibility:</strong> Plethora is fundamentally a public diary. Any diary entry, response, or reaction you post publicly can be read, indexed, or shared by anyone on the internet.</p>
              <p><strong>Protecting Your Identity:</strong> We strongly encourage users sharing sensitive or heavy issues to use a pseudonym or anonymous username and to refrain from including identifiable personal details (such as real names, location, employer, or contact information) within the text of their posts.</p>
            </section>

            <section>
              <h2>5. Sharing and Disclosure of Information</h2>
              <p>BVLTRA does not sell, rent, or trade your personal data to third parties or advertisers. We share information only under the following limited circumstances:</p>
              <p><strong>Service Providers:</strong> We may share data with trusted third-party vendors who perform services on our behalf (e.g., cloud hosting, database management, security monitoring, email delivery). These providers are bound by strict confidentiality and security obligations.</p>
              <p><strong>Legal & Safety Disclosures:</strong> We may disclose your information if required by law, subpoena, court order, or governmental authority, or if we believe in good faith that disclosure is necessary to:</p>
              <ul>
                <li>Protect the safety of any individual (e.g., preventing imminent physical harm or suicide threats where required by law).</li>
                <li>Address fraud, security, or technical vulnerabilities.</li>
                <li>Enforce our Terms of Use or defend legal claims against BVLTRA.</li>
              </ul>
              <p><strong>Business Transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of assets involving BVLTRA, user data may be transferred as part of the business assets, subject to the recipient honoring this Privacy Policy.</p>
            </section>

            <section>
              <h2>6. Data Retention and Deletion</h2>
              <p><strong>Retention Period:</strong> We retain your account information and content for as long as your account remains active or as needed to provide you with the Service. Log data is retained for a limited period for security analysis.</p>
              <p><strong>Account Deletion:</strong> You have the right to delete your account at any time through your account settings or by contacting us. Upon account deletion, your profile data and public entries will be removed from active databases. Backup or cached copies may persist for a short transitional period before permanent purge.</p>
              <p><strong>Anonymized Data:</strong> Aggregated, non-identifiable usage statistics may be retained indefinitely for platform development.</p>
            </section>

            <section>
              <h2>7. Data Security</h2>
              <p>BVLTRA implements appropriate technical, administrative, and organizational security measures to protect your personal information against unauthorized access, loss, destruction, alteration, or disclosure. Measures include encrypted database connections (TLS/HTTPS), access controls, and secure server infrastructure.</p>
              <p>However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security.</p>
            </section>

            <section>
              <h2>8. International Data Transfers</h2>
              <p>Plethora originates from Pretoria, South Africa, but uses global cloud infrastructure to serve users worldwide. Therefore, your personal data may be transferred to, hosted on, and processed in servers located outside your home country.</p>
              <p>Where data transfers occur across borders, BVLTRA ensures appropriate safeguards are in place (such as standard contractual clauses, adequacy decisions, or statutory exemptions under Section 72 of POPIA) to ensure your data receives an equivalent level of protection regardless of location.</p>
            </section>

            <section>
              <h2>9. Your Rights & Choices</h2>
              <p>Depending on your jurisdiction (including South Africa under POPIA and the EU/UK under GDPR), you hold the following rights regarding your personal data:</p>
              <ul>
                <li><strong>Right of Access:</strong> Request confirmation of whether we hold your personal data and obtain a copy of that data.</li>
                <li><strong>Right to Correction / Rectification:</strong> Request that incomplete, inaccurate, or outdated personal information be corrected or updated.</li>
                <li><strong>Right to Erasure / Deletion:</strong> Request the deletion or destruction of your personal data ("right to be forgotten").</li>
                <li><strong>Right to Object / Restrict:</strong> Object to the processing of your data or request that we restrict processing in certain circumstances.</li>
                <li><strong>Right to Data Portability:</strong> Request a copy of the data you provided to us in a structured, commonly used format.</li>
                <li><strong>Right to Lodge a Complaint:</strong><br/>In South Africa, you have the right to submit a complaint to the Information Regulator (South Africa) at inquiries@inforegulator.org.za.<br/>Internationally, you may contact your local statutory data protection authority.</li>
              </ul>
              <p>To exercise any of these rights, please submit a request to our privacy team using the contact details provided in Section 12.</p>
            </section>

            <section>
              <h2>10. Children's Privacy</h2>
              <p>Plethora is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has registered or provided personal data without verified parental consent, we will take immediate steps to delete the account and associated data.</p>
            </section>

            <section>
              <h2>11. Changes to this Privacy Policy</h2>
              <p>BVLTRA reserves the right to update or modify this Privacy Policy at any time. When changes are made, we will update the "Last Updated" date at the top of this document. For material updates, we will notify you by posting a prominent banner on the website or sending an email notification. Continued use of Plethora after updates take effect signifies your acceptance of the revised policy.</p>
            </section>

            <section>
              <h2>12. Contact Us & Information Officer</h2>
              <p>If you have questions, comments, or requests regarding this Privacy Policy or wish to exercise your data rights, please contact the BVLTRA data privacy team:</p>
              <ul>
                <li><strong>Operating Entity:</strong> BVLTRA</li>
                <li><strong>Location:</strong> Pretoria, Gauteng, South Africa</li>
                <li><strong>Information Officer / Privacy Contact:</strong> privacy@bvltra.com</li>
                <li><strong>Platform Website:</strong> https://plethora.bvltra.com</li>
              </ul>
            </section>
          </div>

        </article>
      </div>

    </main>
  );
}