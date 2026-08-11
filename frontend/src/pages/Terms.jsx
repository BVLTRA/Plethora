import React from 'react';
import { Link } from 'react-router-dom';
import './Terms.css';
import Logo from '../assets/logo.png'

export default function Terms() {
  return (
    <main className="terms-page">
      
      {/* Pinned Logo */}
      <header className="terms-header">
        <Link to="/" className="brand-logo">
          <img src={Logo}/>
        </Link>
      </header>

      {/* The Central Reading Column */}
      <div className="terms-content-wrapper">
        <article className="terms-document">
          
          <h1 className="terms-title">Terms of Use for Plethora</h1>
          <p className="terms-date">Last Updated: August 11, 2026</p>

          <div className="terms-body">
            <section>
              <p>Welcome to Plethora, a platform operated and owned by BVLTRA ("Company", "we", "us", or "our"). These Terms of Use ("Terms", "Agreement") govern your access to and use of the Plethora website, mobile applications, and related services (collectively, the "Service" or "Platform").</p>
              <p>By creating an account, accessing, or using Plethora, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.</p>
            </section>

            <section>
              <h2>1. Purpose and Nature of the Service</h2>
              <p>Plethora is designed as a public diary platform—a dedicated digital space intended for users worldwide to share personal reflections, thoughts, and heavy emotional experiences, and to interact with others through supportive responses and likes.</p>
              <p>Because Plethora hosts sensitive personal expressions, maintaining a safe, empathetic, and respectful community is paramount. The platform relies on strict mutual respect, and your continued access depends on adhering to these principles.</p>
            </section>

            <section>
              <h2>2. Eligibility and International Use</h2>
              <p><strong>Eligibility:</strong> You must be at least 13 years of age (or the minimum legal age required in your jurisdiction to consent to digital services without parental approval) to use Plethora.</p>
              <p><strong>Global Access:</strong> The Service originates from Pretoria, Gauteng, South Africa, but is accessible globally. If you access or use the Service from outside South Africa, you are responsible for compliance with all local laws and regulations regarding online conduct and acceptable content.</p>
            </section>

            <section>
              <h2>3. Mental Health and Crisis Disclaimer</h2>
              <p>PLETHORA IS NOT A MEDICAL, PSYCHOLOGICAL, OR CRISIS INTERVENTION SERVICE.</p>
              <p><strong>No Professional Advice:</strong> Content shared on Plethora by users or BVLTRA administrators does not constitute professional medical, psychiatric, psychological, or clinical advice, diagnosis, or treatment.</p>
              <p><strong>Peer Interaction Only:</strong> Interactions on Plethora are strictly peer-to-peer personal reflections. Never disregard professional medical or mental health advice or delay seeking it because of something you have read or experienced on Plethora.</p>
              <p><strong>Crisis Situations:</strong> If you are experiencing a mental health emergency, thoughts of self-harm, suicide, or severe distress, do not rely on Plethora for help. Please immediately contact your local emergency services or a dedicated national crisis hotline in your region (e.g., the South African Depression and Anxiety Group [SADAG] at 0800 567 567 in South Africa, 988 in the US/Canada, 111/116 123 in the UK, or local international equivalents).</p>
            </section>

            <section>
              <h2>4. Community Guidelines & Prohibited Conduct</h2>
              <p>BVLTRA operates a zero-tolerance policy for hostility, abuse, and harassment on Plethora. Because users share vulnerable and heavy issues, all interactions must remain compassionate, civil, and constructive.</p>
              <p>You agree NOT to engage in any of the following prohibited behaviors:</p>
              
              <h3>A. Bullying, Harassment, and Abuse</h3>
              <ul>
                <li><strong>Harsh or Cruel Language:</strong> Using insults, derogatory statements, name-calling, or intentional hostility toward any user.</li>
                <li><strong>Bullying and Cyberstalking:</strong> Repeatedly targeting, intimidating, mocking, or attempting to humiliate another user.</li>
                <li><strong>Hate Speech:</strong> Posting content that attacks, dehumanizes, or promotes hatred or violence against individuals or groups based on race, ethnicity, national origin, religion, disability, medical condition, gender identity, sexual orientation, or age.</li>
                <li><strong>Intentional Emotional Harm:</strong> Maliciously exploiting another user's stated vulnerabilities or emotional struggles.</li>
              </ul>

              <h3>B. Harmful and Illegal Content</h3>
              <ul>
                <li><strong>Encouragement of Self-Harm or Suicide:</strong> Promoting, encouraging, instructing, or glorifying suicide, self-injury, or dangerous behaviors.</li>
                <li><strong>Threats of Violence:</strong> Making threats of physical or emotional harm against any person or group.</li>
                <li><strong>Doxxing:</strong> Publishing private personal information (such as real names, addresses, phone numbers, email addresses, or workplaces) of any individual without explicit consent.</li>
                <li><strong>Illegal Activity:</strong> Using the platform to plan, facilitate, or promote illegal acts.</li>
              </ul>

              <h3>C. Platform Abuse and Misuse</h3>
              <ul>
                <li><strong>Spam and Commercial Solicitations:</strong> Posting repetitive content, unauthorized advertisements, promotional links, or commercial pitches.</li>
                <li><strong>Impersonation:</strong> Pretending to be another person, entity, public figure, or representative of BVLTRA / Plethora.</li>
                <li><strong>Automated Access:</strong> Using bots, scrapers, crawlers, or automated tools to extract data or interact with the platform without express written permission from BVLTRA.</li>
              </ul>
            </section>

            <section>
              <h2>5. Content Ownership and License Grants</h2>
              <h3>A. Your Ownership</h3>
              <p>You retain all ownership rights to the diary entries, comments, responses, and other text or materials ("User Content") that you post to Plethora.</p>
              
              <h3>B. License to BVLTRA</h3>
              <p>By posting User Content on Plethora, you grant BVLTRA a non-exclusive, worldwide, royalty-free, transferable, and sublicensable license to host, store, cache, display, reproduce, modify (for formatting or technical display purposes), and distribute your content solely for the operation, maintenance, improvement, and promotion of the Service.</p>
              
              <h3>C. Public Nature of Posts</h3>
              <p>Plethora is a public diary platform. You acknowledge and agree that any User Content you post to public areas of the Service can be viewed, read, liked, and responded to by other users globally. Do not post information you wish to keep strictly private or confidential.</p>
            </section>

            <section>
              <h2>6. Moderation, Suspension, and Termination</h2>
              <h3>A. Enforcement Rights</h3>
              <p>BVLTRA reserves the right, but assumes no obligation, to monitor, review, screen, edit, or remove any User Content at its sole discretion, at any time and for any reason, without prior notice.</p>
              
              <h3>B. Ban and Suspension Policy</h3>
              <p>Violation of any rule outlined in Section 4 (Community Guidelines) will result in immediate disciplinary action. BVLTRA reserves the absolute right to:</p>
              <ul>
                <li>Issue formal warnings.</li>
                <li>Temporarily suspend account access and posting privileges.</li>
                <li>Permanently ban user accounts, IP addresses, or device identifiers.</li>
                <li>Remove infringing or harmful User Content immediately.</li>
              </ul>
              <p>Determinations of what constitutes bullying, harsh language, or improper behavior are made at the sole discretion of BVLTRA’s moderation team.</p>
            </section>

            <section>
              <h2>7. Intellectual Property Rights</h2>
              <p>The Service, including its software, code, original content (excluding User Content), branding, trademarks, logos, design elements, and functionality, are the exclusive property of BVLTRA and its licensors. You may not copy, modify, distribute, sell, or lease any part of our platform or included software without express written authorization from BVLTRA.</p>
            </section>

            <section>
              <h2>8. Privacy</h2>
              <p>Your privacy is vital. Please review the Plethora Privacy Policy to understand how BVLTRA collects, uses, and safeguards your personal data under applicable data protection laws (including the Protection of Personal Information Act / POPIA where applicable).</p>
            </section>

            <section>
              <h2>9. Disclaimer of Warranties</h2>
              <p>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-INFRINGEMENT.</p>
              <p>BVLTRA DOES NOT WARRANT THAT:</p>
              <ul>
                <li>THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, OR ERROR-FREE.</li>
                <li>DEFECTS OR ERRORS WILL BE CORRECTED.</li>
                <li>THE USER CONTENT ON THE PLATFORM IS ACCURATE, RELIABLE, OR HARMLESS.</li>
                <li>THE SERVICE WILL MEET YOUR SPECIFIC EMOTIONAL OR PERSONAL EXPECTATIONS.</li>
              </ul>
            </section>

            <section>
              <h2>10. Limitation of Liability</h2>
              <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL BVLTRA, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:</p>
              <ul>
                <li>LOSS OF PROFITS, DATA, USE, OR GOODWILL;</li>
                <li>EMOTIONAL DISTRESS OR MENTAL ANGUISH ARISING FROM INTERACTIONS WITH OTHER USERS;</li>
                <li>UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT;</li>
                <li>STATEMENTS OR CONDUCT OF ANY THIRD PARTY OR USER ON THE SERVICE.</li>
              </ul>
            </section>

            <section>
              <h2>11. Indemnification</h2>
              <p>You agree to defend, indemnify, and hold harmless BVLTRA, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including legal fees) arising out of or in any way connected with:</p>
              <ul>
                <li>Your access to or use of the Service;</li>
                <li>Your User Content;</li>
                <li>Your violation of these Terms or community guidelines;</li>
                <li>Your violation of any third-party right, including intellectual property or privacy rights.</li>
              </ul>
            </section>

            <section>
              <h2>12. Governing Law and Jurisdiction</h2>
              <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa, without regard to its conflict of law principles. Any legal suit, action, or proceeding arising out of or related to these Terms or the Service shall be instituted exclusively in the courts located in Pretoria, Gauteng, South Africa (such as the High Court of South Africa, Gauteng Division, Pretoria), and you submit to the personal jurisdiction of such courts.</p>
            </section>

            <section>
              <h2>13. Modifications to Terms</h2>
              <p>BVLTRA reserves the right to modify or replace these Terms at any time. If a revision is material, we will provide notice prior to any new terms taking effect by posting an update on the website or sending a notification. What constitutes a material change will be determined at our sole discretion.</p>
              <p>By continuing to access or use Plethora after those revisions become effective, you agree to be bound by the revised terms.</p>
            </section>

            <section>
              <h2>14. Contact Information</h2>
              <p>If you have any questions about these Terms, wish to report a moderation issue, or need to contact the operating entity, please reach out to:</p>
              <ul>
                <li><strong>Entity:</strong> BVLTRA</li>
                <li><strong>Location:</strong> Pretoria, Gauteng, South Africa</li>
                <li><strong>Email:</strong> support@bvltra.com</li>
              </ul>
            </section>
          </div>

        </article>
      </div>

    </main>
  );
}