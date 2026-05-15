import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { dictionaries } from "@/lib/i18n/dictionaries";

const CONTACT_LINKS = {
  linkedin: "https://www.linkedin.com/in/john-adeba-794738117/",
  github: "https://github.com/JOHNADEBA",
};

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

function buildCVData(lang: string) {
  const dict = dictionaries[lang as keyof typeof dictionaries] ?? dictionaries.en;
  return {
    name: dict.hero.name,
    title: dict.hero.title,
    contact: {
      phone: dict.contact.info.phone,
      email: dict.contact.info.email,
      location: dict.contact.info.location,
      portfolio: `https://portfolio-two-navy-15.vercel.app/${lang}`,
      ...CONTACT_LINKS,
    },
    summary: dict.about.summary,
    skills: {
      frontend: `Frontend: ${dict.skills.items.frontend}`,
      backend: `Backend: ${dict.skills.items.backend}`,
      database: `Database: ${dict.skills.items.database}`,
      devops: `DevOps & Tools: ${dict.skills.items.devops}`,
      other: `Other: ${dict.skills.items.other}`,
      ai: `${dict.skills.categories.ai}: ${dict.skills.items.ai}`,
    },
    experience: dict.experience.jobs,
    education: dict.about.education.items,
    certifications: dict.about.certifications.items,
    languages: dict.about.languages,
  };
}

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
            <p class="cv-text">• ${data.skills.ai}</p>
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

          <!-- Education -->
          <div class="cv-section">
            <h3 class="cv-section-title">${titles.education}</h3>
            ${data.education
              .map(
                (edu: any) => `
              <div style="margin-bottom: 8px;">
                <p style="font-weight: bold; font-size: 12px; margin-bottom: 2px;">${edu.degree}</p>
                <p style="font-size: 11px; color: #555; margin-bottom: 2px;">${edu.institution}</p>
                <p style="font-size: 10px; color: #777;">${edu.startDate} — ${edu.endDate}</p>
              </div>
            `,
              )
              .join("")}
          </div>

          <!-- Certifications -->
          <div class="cv-section">
            <h3 class="cv-section-title">${titles.certifications}</h3>
            <ul class="cv-list" style="list-style-type: none; padding-left: 0;">
              ${data.certifications
                .map(
                  (cert: any) => `
                <li class="cv-list-item" style="margin-bottom: 6px; position: relative; padding-left: 15px;">
                  <span style="font-weight: 500;">${cert.name}</span>
                  ${cert.issuer ? `<span style="color: #555;"> — ${cert.issuer}</span>` : ""}
                  <br>
                  <span style="font-size: 10px; color: #777;">
                    ${cert.startDate && cert.endDate ? `${cert.startDate} — ${cert.endDate}` : cert.date ? cert.date : ""}
                  </span>
                </li>
              `,
                )
                .join("")}
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

const pdfCache = new Map<string, Buffer>();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lang = searchParams.get("lang") || "en";

    // Serve pre-generated static PDF if available (production build)
    const staticPath = join(process.cwd(), "public/cv", `${lang}.pdf`);
    if (existsSync(staticPath)) {
      const pdfBuffer = readFileSync(staticPath);
      return new NextResponse(new Uint8Array(pdfBuffer), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="John_Adeba_CV_${lang}.pdf"`,
          "Content-Length": pdfBuffer.length.toString(),
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // In-memory cache for dev fallback
    if (pdfCache.has(lang)) {
      const cached = pdfCache.get(lang)!;
      return new NextResponse(new Uint8Array(cached), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="John_Adeba_CV_${lang}.pdf"`,
          "Content-Length": cached.length.toString(),
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    const data = buildCVData(lang);
    const html = generateCVHTML(data, lang);

    let browser;

    if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
      const executablePath = await chromium.executablePath();
      browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: executablePath,
        headless: true,
      });
    } else {
      const chromePaths = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium-browser",
        process.env.CHROME_PATH,
      ].filter(Boolean) as string[];

      let executablePath: string | null = null;
      for (const path of chromePaths) {
        if (existsSync(path)) {
          executablePath = path;
          break;
        }
      }

      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
        executablePath: executablePath || undefined,
        headless: true,
      });
    }

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });
    await browser.close();

    const pdfBuffer = Buffer.from(pdf);
    pdfCache.set(lang, pdfBuffer);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="John_Adeba_CV_${lang}.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "public, max-age=86400",
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
