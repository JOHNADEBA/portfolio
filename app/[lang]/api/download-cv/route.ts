import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// CV data in all languages - matching your original CV format
const cvData = {
  en: {
    name: "John Adeba",
    title: "Senior Software Engineer",
    contact: {
      phone: "+386 31 733 559",
      email: "adebajohn@gmail.com",
      location: "Ljubljana, Slovenia",
      portfolio: "https://portfolio-two-navy-15.vercel.app/en",
      linkedin: "https://www.linkedin.com/in/john-adeba-794738117/",
      github: "https://github.com/JOHNADEBA",
    },
    summary:
      "Senior Software Engineer with extensive experience in full-stack development, specializing in modern JavaScript frameworks (React, Angular, Vue.js) and backend technologies (Node.js, NestJS, Python). Proven record of delivering scalable, high-performance solutions for government, fintech, e-commerce, and agricultural sectors. Strong collaborator and mentor with a passion for clean code, agile practices, and cross-functional teamwork.",
    skills: {
      frontend:
        "Frontend: HTML, CSS, SASS, Tailwind CSS, JavaScript (React, Next.js, Angular, AngularJS, Vue.js), TypeScript, Redux, Angular Material, PrimeNG.",
      backend:
        "Backend: JavaScript(Node.js, NestJS, Express), Python, PHP (CodeIgniter).",
      database: "Database: PostgreSQL, MySQL, MongoDB, Prisma ORM.",
      devops:
        "DevOps & Tools: Docker, Git (BitBucket, GitLab), Jira, Confluence, Jest, Postman, Linux.",
      other:
        "Other: RESTful APIs, Keycloak, Leaflet, Chart.js, GeoJSON, Agile/Scrum",
    },
    experience: [
      {
        company: "John Adeba s.p. - Ljubljana, Slovenia",
        role: "Senior Software Engineer | Jan 2023 - Present",
        points: [
          "Engineered migration of legacy PHP CRM to modern Next.js application, improving performance by 40% and enhancing developer productivity",
          "Contributed to a government project enabling secure communication between police and the Ministry of Justice using Angular.",
          "Implemented real-time data synchronization and payment processing across multiple applications.",
          "Optimized API performance, reducing response times by 30% through query tuning and caching.",
        ],
        tech: "Technologies: Next.js, React, Node.js, Tailwind CSS, Python, NestJS, Prisma, Jest, PostgreSQL, Bitbucket, Jira, Confluence, Angular, Vue",
      },
      {
        company: "Gamanza - Hybrid",
        role: "Senior Software Engineer | Oct 2023 - Dec 2024",
        points: [
          "Contributed to frontend development for an online casino platform using React/Next.js and TypeScript.",
          "Collaborated on backend microservices in Node.js/NestJS with secure payment integration.",
          "Implemented comprehensive Jest testing pipelines ensuring high-quality releases.",
          "Designed and tested APIs using Postman for robust integration and validation.",
        ],
        tech: "Technologies: React, Next.js, Node.js, NestJS, MUI, Jest, PostgreSQL, Postman, GitLab, Jira, Confluence",
      },
      {
        company: "Endava — Hybrid",
        role: "Senior Software Engineer | Feb 2022 - Dec 2022",
        points: [
          "Integrated Keycloak authentication for a streaming platform, managing sessions and security workflows.",
          'Co-founded the "School of Angular" mentoring initiative to elevate team proficiency.',
          "Enhanced application UX and security with improved authentication and user flows.",
        ],
        tech: "Technologies: AngularJS, Angular, PrimeNG, TypeScript, Keycloak, BitBucket, Jira, Confluence",
      },
      {
        company: "Elmibit — Remote",
        role: "Full-Stack Developer | Apr 2021 - Jan 2022",
        points: [
          "Built a full agricultural management system spanning the farming lifecycle.",
          "Designed data visualization dashboards with Vue.js, Chart.js, and Leaflet.",
          "Managed cross-border data synchronization (Brazil, Spain, Slovenia).",
          "Developed drone navigation coordinates for vineyard optimization.",
        ],
        tech: "Technologies: Vue.js, CodeIgniter (PHP), PostgreSQL, Leaflet, Chart.js, Java, Linux",
      },
      {
        company: "Diptour Limited",
        role: "Software Engineer | Jun 2016 - Dec 2019",
        points: [
          "Developed a full-stack travel management platform using React and Express.js.",
          "Designed REST APIs and database schemas to support scalable service architecture.",
        ],
        tech: "Technologies: HTML, CSS, React, Express.js, SQL",
      },
      {
        company: "House 53/54",
        role: "IT Assistant | Feb 2010 - Jan 2012",
        points: [
          "Maintained IT infrastructure and company website.",
          "Supported database management and troubleshooting operations.",
        ],
        tech: "Technologies: HTML, CSS, JavaScript, PHP, SQL, MsOffice",
      },
      {
        company: "Youth Empowerment Computers",
        role: "Instructor | Jul 2008 - Apr 2009",
        points: [
          "Taught desktop publishing fundamentals and design tools.",
          "Developed a structured learning curriculum for aspiring designers.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Institut Supérieur De Formation Professionelle",
        startDate: "Sep 2012",
        endDate: "Aug 2016",
      },
    ],
    certifications: [
      {
        name: "JAVA Certification",
        issuer: "National Institute of Information Technology",
        startDate: "Dec 2017",
        endDate: "Nov 2019",
      },
      {
        name: "Amadeus Certification",
        issuer: "Amadeus",
        date: "30 Nov 2016",
      },
      {
        name: "Travelport - Galileo Certification",
        issuer: "Travelport",
        date: "21 Feb 2017",
      },
      {
        name: "Sabre Certification",
        issuer: "Sabre",
        date: "2 May 2014",
      },
      {
        name: "Basic Airfares and Ticketing",
        issuer: "IATA",
        date: "17-21 Mar 2014",
      },
      {
        name: "Desktop Publishing",
        issuer: "Youth Empowerment Computers",
        date: "7 Jul 2008",
      },
    ],
    languages: ["English: Fluent", "Slovenian: A2", "German: A1"],
  },
  sl: {
    name: "John Adeba",
    title: "Višji programski inženir",
    contact: {
      phone: "+386 31 733 559",
      email: "adebajohn@gmail.com",
      location: "Ljubljana, Slovenija",
      portfolio: "https://portfolio-two-navy-15.vercel.app/sl",
      linkedin: "https://www.linkedin.com/in/john-adeba-794738117/",
      github: "https://github.com/JOHNADEBA",
    },
    summary:
      "Višji programski inženir z obsežnimi izkušnjami na področju razvoja celovitih rešitev, specializiran za sodobna JavaScript ogrodja (React, Angular, Vue.js) in zaledne tehnologije (Node.js, NestJS, Python). Dokazano uspešen pri zagotavljanju skalabilnih, visoko zmogljivih rešitev za vladne, finančne, e-trgovinske in kmetijske sektorje. Močan sodelavec in mentor s strastjo do čiste kode, agilnih praks in medfunkcijskega timskega dela.",
    skills: {
      frontend:
        "Frontend: HTML, CSS, SASS, Tailwind CSS, JavaScript (React, Next.js, Angular, AngularJS, Vue.js), TypeScript, Redux, Angular Material, PrimeNG.",
      backend:
        "Backend: JavaScript (Node.js, NestJS, Express), Python, PHP (CodeIgniter).",
      database: "Database: PostgreSQL, MySQL, MongoDB, Prisma ORM.",
      devops:
        "DevOps & Tools: Docker, Git (BitBucket, GitLab), Jira, Confluence, Jest, Postman, Linux.",
      other:
        "Other: RESTful APIs, Keycloak, Leaflet, Chart.js, GeoJSON, Agile/Scrum",
    },
    experience: [
      {
        company: "John Adeba s.p. - Ljubljana, Slovenija",
        role: "Višji programski inženir | jan 2023 - danes",
        points: [
          "Izvedel migracijo zastarelega PHP CRM sistema na sodobno Next.js aplikacijo, izboljšal zmogljivost za 40% in povečal produktivnost razvijalcev.",
          "Prispeval k vladnemu projektu za varno komunikacijo med policijo in ministrstvom za pravosodje z uporabo Angular.",
          "Implementiral sinhronizacijo podatkov v realnem času in obdelavo plačil v več aplikacijah.",
          "Optimiziral delovanje API-jev, zmanjšal odzivne čase za 30% s prilagoditvijo poizvedb in predpomnjenjem.",
        ],
        tech: "Tehnologije: Next.js, React, Node.js, Tailwind CSS, Python, NestJS, Prisma, Jest, PostgreSQL, Bitbucket, Jira, Confluence, Angular, Vue",
      },
      {
        company: "Gamanza - Hibridno",
        role: "Višji programski inženir | okt 2023 - dec 2024",
        points: [
          "Prispeval k razvoju frontenda za platformo spletnih igralnic z uporabo React/Next.js in TypeScript.",
          "Sodeloval pri razvoju zalednih mikrostoritev v Node.js/NestJS z varno integracijo plačil.",
          "Implementiral celovite testne cevovode z Jest za zagotavljanje kakovostnih izdaj.",
          "Načrtoval in testiral API-je z uporabo Postmana za robustno integracijo in validacijo.",
        ],
        tech: "Tehnologije: React, Next.js, Node.js, NestJS, MUI, Jest, PostgreSQL, Postman, GitLab, Jira, Confluence",
      },
      {
        company: "Endava — Hibridno",
        role: "Višji programski inženir | feb 2022 - dec 2022",
        points: [
          "Integriral Keycloak avtentikacijo za pretočno platformo, upravljal seje in varnostne poteke.",
          'Soustanovil mentorstvo "Šola Angularja" za dvig strokovnosti ekipe.',
          "Izboljšal uporabniško izkušnjo in varnost aplikacije z izboljšano avtentikacijo in uporabniškimi tokovi.",
        ],
        tech: "Tehnologije: AngularJS, Angular, PrimeNG, TypeScript, Keycloak, BitBucket, Jira, Confluence",
      },
      {
        company: "Elmibit — Na daljavo",
        role: "Razvijalec celovitih rešitev | apr 2021 - jan 2022",
        points: [
          "Zgradil celovit kmetijski sistem upravljanja, ki pokriva celoten kmetijski cikel.",
          "Oblikoval nadzorne plošče za vizualizacijo podatkov z Vue.js, Chart.js in Leaflet.",
          "Upravljal čezmejno sinhronizacijo podatkov (Brazilija, Španija, Slovenija).",
          "Razvil koordinate za navigacijo dronov za optimizacijo vinogradov.",
        ],
        tech: "Tehnologije: Vue.js, CodeIgniter (PHP), PostgreSQL, Leaflet, Chart.js, Java, Linux",
      },
      {
        company: "Diptour Limited",
        role: "Programski inženir | jun 2016 - dec 2019",
        points: [
          "Razvil celovito platformo za upravljanje potovanj z uporabo React in Express.js.",
          "Oblikoval REST API-je in sheme podatkovnih baz za podporo skalabilni arhitekturi storitev.",
        ],
        tech: "Tehnologije: HTML, CSS, React, Express.js, SQL",
      },
      {
        company: "House 53/54",
        role: "Pomočnik za IT | feb 2010 - jan 2012",
        points: [
          "Vzdrževal IT infrastrukturo in spletno stran podjetja.",
          "Podpiral upravljanje podatkovnih baz in odpravljanje težav.",
        ],
        tech: "Tehnologije: HTML, CSS, JavaScript, PHP, SQL, MsOffice",
      },
      {
        company: "Youth Empowerment Computers",
        role: "Inštruktor | jul 2008 - apr 2009",
        points: [
          "Poučeval osnove namiznega založništva in orodja za oblikovanje.",
          "Razvil strukturiran učni načrt za bodoče oblikovalce.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Institut Supérieur De Formation Professionelle",
        startDate: "Sep 2012",
        endDate: "Aug 2016",
      },
    ],
    certifications: [
      {
        name: "JAVA Certification",
        issuer: "National Institute of Information Technology",
        startDate: "Dec 2017",
        endDate: "Nov 2019",
      },
      {
        name: "Amadeus Certification",
        issuer: "Amadeus",
        date: "30 Nov 2016",
      },
      {
        name: "Travelport - Galileo Certification",
        issuer: "Travelport",
        date: "21 Feb 2017",
      },
      {
        name: "Sabre Certification",
        issuer: "Sabre",
        date: "2 May 2014",
      },
      {
        name: "Basic Airfares and Ticketing",
        issuer: "IATA",
        date: "17-21 Mar 2014",
      },
      {
        name: "Desktop Publishing",
        issuer: "Youth Empowerment Computers",
        date: "7 Jul 2008",
      },
    ],
    languages: ["Angleščina: tekoče", "Slovenščina: A2", "Nemščina: A1"],
  },
  de: {
    name: "John Adeba",
    title: "Senior Softwareentwickler",
    contact: {
      phone: "+386 31 733 559",
      email: "adebajohn@gmail.com",
      location: "Ljubljana, Slowenien",
      portfolio: "https://portfolio-two-navy-15.vercel.app/de",
      linkedin: "https://www.linkedin.com/in/john-adeba-794738117/",
      github: "https://github.com/JOHNADEBA",
    },
    summary:
      "Senior Softwareentwickler mit umfassender Erfahrung in der Full-Stack-Entwicklung, spezialisiert auf moderne JavaScript-Frameworks (React, Angular, Vue.js) und Backend-Technologien (Node.js, NestJS, Python). Nachweisliche Erfolge bei der Bereitstellung skalierbarer, leistungsstarker Lösungen für Regierungs-, Fintech-, E-Commerce- und Agrarsektoren. Starker Teamplayer und Mentor mit Leidenschaft für sauberen Code, agile Praktiken und funktionsübergreifende Zusammenarbeit.",
    skills: {
      frontend:
        "Frontend: HTML, CSS, SASS, Tailwind CSS, JavaScript (React, Next.js, Angular, AngularJS, Vue.js), TypeScript, Redux, Angular Material, PrimeNG.",
      backend:
        "Backend: JavaScript (Node.js, NestJS, Express), Python, PHP (CodeIgniter).",
      database: "Database: PostgreSQL, MySQL, MongoDB, Prisma ORM.",
      devops:
        "DevOps & Tools: Docker, Git (BitBucket, GitLab), Jira, Confluence, Jest, Postman, Linux.",
      other:
        "Other: RESTful APIs, Keycloak, Leaflet, Chart.js, GeoJSON, Agile/Scrum",
    },
    experience: [
      {
        company: "John Adeba s.p. - Ljubljana, Slowenien",
        role: "Senior Softwareentwickler | Jan. 2023 - heute",
        points: [
          "Entwickelte die Migration eines Legacy-PHP-CRM zu einer modernen Next.js-Anwendung, verbesserte die Leistung um 40% und steigerte die Entwicklerproduktivität.",
          "Trug zu einem Regierungsprojekt bei, das sichere Kommunikation zwischen Polizei und Justizministerium mit Angular ermöglicht.",
          "Implementierte Echtzeit-Datensynchronisation und Zahlungsabwicklung in mehreren Anwendungen.",
          "Optimierte die API-Leistung, reduzierte Antwortzeiten um 30% durch Query-Optimierung und Caching.",
        ],
        tech: "Technologien: Next.js, React, Node.js, Tailwind CSS, Python, NestJS, Prisma, Jest, PostgreSQL, Bitbucket, Jira, Confluence, Angular, Vue",
      },
      {
        company: "Gamanza - Hybrid",
        role: "Senior Softwareentwickler | Okt. 2023 - Dez. 2024",
        points: [
          "Trug zur Frontend-Entwicklung für eine Online-Casino-Plattform mit React/Next.js und TypeScript bei.",
          "Arbeitete an Backend-Mikroservices in Node.js/NestJS mit sicherer Zahlungsintegration.",
          "Implementierte umfassende Jest-Testpipelines zur Sicherstellung hochwertiger Releases.",
          "Entwarf und testete APIs mit Postman für robuste Integration und Validierung.",
        ],
        tech: "Technologien: React, Next.js, Node.js, NestJS, MUI, Jest, PostgreSQL, Postman, GitLab, Jira, Confluence",
      },
      {
        company: "Endava — Hybrid",
        role: "Senior Softwareentwickler | Feb. 2022 - Dez. 2022",
        points: [
          "Integrierte Keycloak-Authentifizierung für eine Streaming-Plattform, Verwaltung von Sitzungen und Sicherheitsabläufen.",
          'Mitbegründer der "School of Angular"-Mentoring-Initiative zur Steigerung der Teamkompetenz.',
          "Verbesserte Anwendungs-UX und Sicherheit durch verbesserte Authentifizierung und Benutzerabläufe.",
        ],
        tech: "Technologien: AngularJS, Angular, PrimeNG, TypeScript, Keycloak, BitBucket, Jira, Confluence",
      },
      {
        company: "Elmibit — Remote",
        role: "Full-Stack-Entwickler | Apr. 2021 - Jan. 2022",
        points: [
          "Entwickelte ein vollständiges landwirtschaftliches Verwaltungssystem für den gesamten landwirtschaftlichen Lebenszyklus.",
          "Gestaltete Datenvisualisierungs-Dashboards mit Vue.js, Chart.js und Leaflet.",
          "Verwaltete grenzüberschreitende Datensynchronisation (Brasilien, Spanien, Slowenien).",
          "Entwickelte Drohnen-Navigationskoordinaten zur Weinbergoptimierung.",
        ],
        tech: "Technologien: Vue.js, CodeIgniter (PHP), PostgreSQL, Leaflet, Chart.js, Java, Linux",
      },
      {
        company: "Diptour Limited",
        role: "Softwareentwickler | Jun. 2016 - Dez. 2019",
        points: [
          "Entwickelte eine Full-Stack-Reiseverwaltungsplattform mit React und Express.js.",
          "Entwarf REST-APIs und Datenbankschemata zur Unterstützung skalierbarer Service-Architektur.",
        ],
        tech: "Technologien: HTML, CSS, React, Express.js, SQL",
      },
      {
        company: "House 53/54",
        role: "IT-Assistent | Feb. 2010 - Jan. 2012",
        points: [
          "Wartete IT-Infrastruktur und Unternehmenswebsite.",
          "Unterstützte Datenbankverwaltung und Fehlerbehebungsvorgänge.",
        ],
        tech: "Technologien: HTML, CSS, JavaScript, PHP, SQL, MsOffice",
      },
      {
        company: "Youth Empowerment Computers",
        role: "Dozent | Jul. 2008 - Apr. 2009",
        points: [
          "Unterrichtete Grundlagen der Desktop-Publishing- und Design-Tools.",
          "Entwickelte einen strukturierten Lehrplan für angehende Designer.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "Institut Supérieur De Formation Professionelle",
        startDate: "Sep 2012",
        endDate: "Aug 2016",
      },
    ],
    certifications: [
      {
        name: "JAVA Certification",
        issuer: "National Institute of Information Technology",
        startDate: "Dec 2017",
        endDate: "Nov 2019",
      },
      {
        name: "Amadeus Certification",
        issuer: "Amadeus",
        date: "30 Nov 2016",
      },
      {
        name: "Travelport - Galileo Certification",
        issuer: "Travelport",
        date: "21 Feb 2017",
      },
      {
        name: "Sabre Certification",
        issuer: "Sabre",
        date: "2 May 2014",
      },
      {
        name: "Basic Airfares and Ticketing",
        issuer: "IATA",
        date: "17-21 Mar 2014",
      },
      {
        name: "Desktop Publishing",
        issuer: "Youth Empowerment Computers",
        date: "7 Jul 2008",
      },
    ],
    languages: ["Englisch: Fließend", "Slowenisch: A2", "Deutsch: A1"],
  },
};

// Add translated section titles
const sectionTitles = {
  en: {
    summary: "Professional Summary",
    skills: "Technical Skills",
    experience: "Professional Experience",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
  },
  sl: {
    summary: "Povzetek",
    skills: "Tehnične veščine",
    experience: "Poklicne izkušnje",
    education: "Izobrazba",
    certifications: "Certifikati",
    languages: "Jeziki",
  },
  de: {
    summary: "Berufliche Zusammenfassung",
    skills: "Technische Fähigkeiten",
    experience: "Berufserfahrung",
    education: "Bildung",
    certifications: "Zertifizierungen",
    languages: "Sprachen",
  },
};

function generateCVHTML(data: any, lang: string) {
  const titles =
    sectionTitles[lang as keyof typeof sectionTitles] || sectionTitles.en;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            line-height: 1.4;
            color: #000;
            padding: 20px;
          }
          
          .cv-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
          }
          
          .cv-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .cv-title {
            font-size: 18px;
            color: #333;
          }
          
          .cv-contact {
            text-align: right;
            font-size: 11px;
          }
          
          .cv-contact p {
            margin: 2px 0;
          }
          
          .cv-section {
            margin: 16px 0;
          }
          
          .cv-section-title {
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1.5px solid #000;
            padding-bottom: 3px;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          
          .cv-text {
            font-size: 11px;
            margin: 4px 0;
            line-height: 1.5;
          }
          
          .cv-job {
            margin-bottom: 16px;
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 12px;
          }
          
          .cv-job:last-child {
            border-bottom: none;
          }
          
          .cv-job-company {
            font-weight: bold;
            font-size: 13px;
            margin-bottom: 2px;
          }
          
          .cv-job-role {
            font-style: italic;
            font-size: 11px;
            margin-bottom: 4px;
            color: #555;
          }
          
          .cv-job-points {
            margin-left: 20px;
            list-style-type: none;
          }
          
          .cv-job-point {
            font-size: 11px;
            margin-bottom: 2px;
            position: relative;
            padding-left: 15px;
          }
          
          .cv-job-point::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #000;
          }
          
          .cv-tech {
            font-size: 10px;
            color: #555;
            margin-top: 4px;
            font-style: italic;
            position: relative;
            padding-left: 15px;
          }
          
          .cv-tech::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #000;
          }
          
          .cv-list {
            margin-left: 20px;
            list-style-type: none;
          }
          
          .cv-list-item {
            font-size: 11px;
            margin-bottom: 2px;
            position: relative;
            padding-left: 15px;
          }
          
          .cv-list-item::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #000;
          }
        </style>
      </head>
      <body>
        <div class="cv-container">
          <!-- Header -->
          <div class="cv-header">
            <div>
              <h1 class="cv-name">${data.name}</h1>
              <h2 class="cv-title">${data.title}</h2>
            </div>
            <div class="cv-contact">
              <p>${data.contact.phone} | ${data.contact.email}</p>
              <p>${data.contact.location}</p>
              <p>${data.contact.linkedin} | ${data.contact.github}</p>
              <p>${data.contact.portfolio}</p>
            </div>
          </div>

          <!-- Professional Summary -->
          <div class="cv-section">
            <h3 class="cv-section-title">${titles.summary}</h3>
            <p class="cv-text">${data.summary}</p>
          </div>

          <!-- Technical Skills -->
          <div class="cv-section">
            <h3 class="cv-section-title">${titles.skills}</h3>
            <p class="cv-text">• ${data.skills.frontend}</p>
            <p class="cv-text">• ${data.skills.backend}</p>
            <p class="cv-text">• ${data.skills.database}</p>
            <p class="cv-text">• ${data.skills.devops}</p>
            <p class="cv-text">• ${data.skills.other}</p>
          </div>

          <!-- Professional Experience -->
          <div class="cv-section">
            <h3 class="cv-section-title">${titles.experience}</h3>
            ${data.experience
              .map(
                (job: any) => `
              <div class="cv-job">
                <p class="cv-job-company">${job.company}</p>
                <p class="cv-job-role">${job.role}</p>
                <ul class="cv-job-points">
                  ${job.points
                    .map(
                      (point: string) => `
                    <li class="cv-job-point">${point}</li>
                  `,
                    )
                    .join("")}
                </ul>
                ${job.tech ? `<p class="cv-tech">${job.tech}</p>` : ""}
              </div>
            `,
              )
              .join("")}
          </div>

          <!-- Education Section -->
<div class="cv-section">
  <h3 class="cv-section-title">${titles.education}</h3>
  ${
    Array.isArray(data.education)
      ? data.education
          .map(
            (edu: any) => `
      <div class="cv-education-item" style="margin-bottom: 8px;">
        <p style="font-weight: bold; font-size: 12px; margin-bottom: 2px;">${edu.degree}</p>
        <p style="font-size: 11px; color: #555; margin-bottom: 2px;">${edu.institution}</p>
        <p style="font-size: 10px; color: #777;">${edu.startDate} — ${edu.endDate}</p>
      </div>
    `,
          )
          .join("")
      : `<p class="cv-text">${data.education}</p>`
  }
</div>

<!-- Certifications Section -->
<div class="cv-section">
  <h3 class="cv-section-title">${titles.certifications}</h3>
  <ul class="cv-list" style="list-style-type: none; padding-left: 0;">
    ${
      Array.isArray(data.certifications)
        ? data.certifications
            .map(
              (cert: any) => `
        <li class="cv-list-item" style="margin-bottom: 6px; position: relative; padding-left: 15px;">
          <span style="font-weight: 500;">${cert.name}</span>
          ${cert.issuer ? `<span style="color: #555;"> — ${cert.issuer}</span>` : ""}
          <br>
          <span style="font-size: 10px; color: #777;">
            ${
              cert.startDate && cert.endDate
                ? `${cert.startDate} — ${cert.endDate}`
                : cert.date
                  ? cert.date
                  : ""
            }
          </span>
        </li>
      `,
            )
            .join("")
        : data.certifications
            .map(
              (cert: string) => `
        <li class="cv-list-item">${cert}</li>
      `,
            )
            .join("")
    }
  </ul>
</div>

          <!-- Languages -->
          <div class="cv-section">
            <h3 class="cv-section-title">${titles.languages}</h3>
            <ul class="cv-list">
              ${data.languages
                .map(
                  (lang: string) => `
                <li class="cv-list-item">${lang}</li>
              `,
                )
                .join("")}
            </ul>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get("lang") || "en";
    const data = cvData[lang as keyof typeof cvData] || cvData.en;

    const html = generateCVHTML(data, lang);

    let browser;

    // Vercel / production environment
    if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
      console.log("Running in production mode, using @sparticuz/chromium");

      // Get the executable path
      const executablePath = await chromium.executablePath();

      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: executablePath,
        headless: true,
      });
    } else {
      // Local development fallback
      console.log("Running in development mode, searching for Chrome");

      const chromePaths = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium-browser",
        process.env.CHROME_PATH,
      ].filter(Boolean) as string[];

      let executablePath = null;
      for (const path of chromePaths) {
        try {
          const fs = require("fs");
          if (fs.existsSync(path)) {
            executablePath = path;
            console.log(`Found Chrome at: ${path}`);
            break;
          }
        } catch (e) {
          // Ignore errors
        }
      }

      if (!executablePath) {
        console.warn("No Chrome installation found, using default");
      }

      browser = await puppeteer.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
          "--disable-software-rasterizer",
        ],
        executablePath: executablePath || undefined,
        headless: true,
      });
    }

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });

    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="John_Adeba_CV_${lang}.pdf"`,
        "Content-Length": pdf.length.toString(),
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
