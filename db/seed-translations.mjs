/**
 * Traducción al inglés del contenido que ya existe.
 *
 * Escribe en la columna `translations` (JSONB) sin tocar el español, que sigue
 * siendo la fuente. Se puede volver a ejecutar: hace merge sobre lo que ya
 * hubiera, así que no pisa lo que el cliente haya escrito a mano en el panel
 * salvo en los campos que este archivo define.
 *
 *   node --env-file=.env.local db/seed-translations.mjs
 *
 * No es traducción literal: es copy. "Ganar el lineal, turno por turno" es
 * "Winning the shelf, shift by shift", no la versión palabra por palabra.
 */
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'

async function cargarEntorno() {
  if (process.env.DATABASE_URL) return
  const raw = await readFile(path.join(process.cwd(), '.env.local'), 'utf8')
  for (const linea of raw.split('\n')) {
    const m = linea.match(/^([A-Z_]+)=(.*)$/)
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const NICHOS = {
  'marketing-btl-para-bebidas-degustacion-y-experiencia': {
    name: 'Alcoholic Beverages',
    menuLabel: 'Alcoholic Beverages',
    headline: 'BTL marketing for beverages: tasting and experience',
    subheadline: 'Make the first taste of your brand unforgettable',
    description:
      'Activations, tastings and brand experiences for spirits and alcoholic beverages. Trained field staff, regulatory compliance and real measurement at the point of sale.',
    intro:
      'With alcoholic beverages the decision takes seconds, and almost always right at the shelf. We design tastings and activations that turn that second into a product trial, and that trial into a repeat purchase.',
    capabilities: [
      'Tastings and sampling at retail and in the HORECA channel',
      'Field staff trained in service protocol and liquor regulations',
      'Production of bars, stands and brand activations',
      'Measurement of product trials, conversion and repeat purchase',
    ],
    keywords: [
      'BTL marketing alcoholic beverages',
      'liquor tasting at point of sale',
      'aguardiente brand activation',
      'liquor field marketing Colombia',
      'beverage sampling Medellín',
    ],
    faqs: [
      {
        q: 'What does a liquor tasting need to be effective?',
        a: 'Three things: field staff who can actually talk about the product, a mechanic that does not interrupt the shopping trip, and measurement of trials against conversions. Without the third one you never know whether it worked.',
      },
      {
        q: 'Can a liquor brand be activated in any point of sale?',
        a: 'No. Every chain and every municipality has different rules on alcohol tasting, opening hours and visible material. We handle the permits before the activation goes up.',
      },
    ],
  },

  'marketing-btl-inmobiliario-mas-leads-y-ventas': {
    name: 'Real Estate Development',
    menuLabel: 'Real Estate Development',
    headline: 'BTL marketing for real estate: more leads and sales',
    subheadline: 'From the sales room to closing, fully traceable',
    description:
      'Activations, sales rooms and experiences for real estate projects. Qualified lead generation with full traceability through to the visit and the close.',
    intro:
      'Selling a home is not selling a product: it is guiding the biggest financial decision a family makes. We build experiences in the sales room and on the street that generate real leads, not inflated databases.',
    capabilities: [
      'Activations in sales rooms and travelling showrooms',
      'Lead capture with on-site qualification',
      'Trade shows, launches and project events',
      'Lead traceability: contact, scheduled visit and close',
    ],
    keywords: [
      'real estate BTL marketing',
      'sales room activation',
      'real estate lead generation',
      'housing project marketing Colombia',
      'real estate events Medellín',
    ],
    faqs: [
      {
        q: 'How do you measure a real estate activation?',
        a: 'By qualified leads, not by volume of contacts. We record how many people left their details, how many matched the credit profile and how many booked a visit to the project.',
      },
      {
        q: 'Does BTL work for affordable housing projects?',
        a: 'Yes, and it usually performs better than in the high-end segment: affordable-housing buyers need to resolve subsidy and credit questions face to face, and that is exactly where experiential marketing works.',
      },
    ],
  },

  'marketing-btl-consumo-masivo-mas-trafico-y-ventas': {
    name: 'Consumer Goods',
    menuLabel: 'Consumer Goods',
    headline: 'BTL marketing for consumer goods: more traffic and sales',
    subheadline: 'Winning the shelf, shift by shift',
    description:
      'Trade marketing and activations for consumer goods. In-store push, sampling and field staff management with reporting by location, shift and SKU.',
    intro:
      'In consumer goods the brand is won or lost at the shelf. We run in-store push, sampling and POP material across several cities at once, with daily reporting on what actually happened at each location.',
    capabilities: [
      'In-store push and merchandisers in chains and traditional trade',
      'Sampling and product demonstration',
      'POP material rollout and audit',
      'Reporting by location, shift, staff member and SKU',
    ],
    keywords: [
      'trade marketing Colombia',
      'in-store push at point of sale',
      'consumer goods sampling',
      'retail field staff management',
      'supermarket brand activation',
    ],
    faqs: [
      {
        q: 'What is the difference between in-store push and sampling?',
        a: 'In-store push aims to close the sale on the spot, with a promoter making the case right at the shelf. Sampling aims for product trial to drive future repeat purchase. They are often combined, but they are measured differently.',
      },
      {
        q: 'How do you make sure the promoter is actually at the location?',
        a: 'With clock-in and clock-out per shift, photographic evidence of the shelf and reporting of units moved. That control is what separates a serious operation from one that just bills hours.',
      },
    ],
  },

  'activaciones-btl-tecnologia-alto-impacto': {
    name: 'Technology',
    menuLabel: 'Technology',
    headline: 'BTL activations for technology: high impact',
    subheadline: 'Make tangible what a slide only explains',
    description:
      'Activations and experiences for technology brands: launches, product demonstrations and interactive experiences that make the product clear by using it.',
    intro:
      'A technology product rarely sells by being explained. It sells when someone uses it. We design demonstrations and interactive experiences where the attendee tries it rather than listens to it.',
    capabilities: [
      'Launches and product presentations',
      'Guided demos and interactive experiences',
      'Stands and brand spaces for industry trade shows',
      'Interaction capture and purchase-intent measurement',
    ],
    keywords: [
      'technology BTL activations',
      'tech product launch',
      'interactive brand experiences',
      'product demo at events',
      'experiential marketing technology Colombia',
    ],
    faqs: [
      {
        q: 'What format works best for launching a technology product?',
        a: 'The one that lets people touch it. A three-minute guided demo converts better than a thirty-minute presentation, because the memory of using something outweighs the memory of being told about it.',
      },
      {
        q: 'Can a technology activation be measured?',
        a: 'Yes: completed interactions, time of use per person, questions collected on site and stated purchase intent. That data also feeds the product roadmap.',
      },
    ],
  },
}

const EPISODIOS = {
  'hacia-donde-va-el-mercado-inmobiliario-en-colombia': {
    title: 'Where is the real estate market in Colombia heading?',
    subtitle: 'Prices, demand and what to expect in the coming years',
    metaDescription:
      'Andrés Giraldo on prices, appreciation and demand in Colombian real estate, and what it means for anyone buying or investing.',
  },
  'invertir-en-propiedad-raiz-con-poco-dinero': {
    title: 'Can you invest in real estate with little money?',
    subtitle: 'Entry routes, common mistakes and realistic expectations',
    metaDescription:
      'Ways into real estate investment without large capital, the mistakes that cost the most, and how to judge whether a project is worth it.',
  },
  'tendencias-que-transforman-el-marketing-y-la-comunicacion': {
    title: 'Trends reshaping marketing and communication',
    subtitle: 'What is actually changing, beyond the buzzwords',
  },
  'de-cero-a-una-vida-con-proposito': {
    title: 'From zero to a life with purpose and real connection',
    subtitle: 'Building a business that actually holds up',
  },
}

const POSTS = {
  'sala-de-ventas-por-que-la-primera-visita-decide-el-cierre': {
    title: 'The sales room: why the first visit decides the close',
    excerpt:
      'What happens in the first fifteen minutes of a visit weighs more than the whole campaign that got the person there.',
    metaDescription:
      'Why the first visit to a sales room decides the close, and what to control so it does not depend on luck.',
  },
  'que-pedirle-a-una-agencia-btl-antes-de-firmar': {
    title: 'What to ask a BTL agency before you sign',
    excerpt:
      'Six questions that separate an agency that runs activations from one that just bills hours.',
    metaDescription:
      'The questions to ask a BTL agency before hiring: measurement, field staff, permits and reporting.',
  },
  'como-medir-una-activacion-btl-sin-metricas-de-vanidad': {
    title: 'How to measure a BTL activation without vanity metrics',
    excerpt:
      'Reach and impressions say almost nothing. These are the numbers that tell you whether it worked.',
    metaDescription:
      'Which metrics really measure a BTL activation: trials, conversion, cost per contact and traceability.',
  },
}

async function main() {
  await cargarEntorno()
  const sql = neon(process.env.DATABASE_URL)

  // `||` sobre JSONB hace merge a primer nivel: conserva otros idiomas y sólo
  // reemplaza la clave 'en'. Así no se pierde nada si mañana hay portugués.
  for (const [slug, en] of Object.entries(NICHOS)) {
    await sql`
      update niches
      set translations = translations || ${JSON.stringify({ en })}::jsonb
      where slug = ${slug}
    `
  }
  console.log(`✓ ${Object.keys(NICHOS).length} nichos traducidos`)

  for (const [slug, en] of Object.entries(EPISODIOS)) {
    await sql`
      update episodes
      set translations = translations || ${JSON.stringify({ en })}::jsonb
      where slug = ${slug}
    `
  }
  console.log(`✓ ${Object.keys(EPISODIOS).length} episodios traducidos`)

  for (const [slug, en] of Object.entries(POSTS)) {
    await sql`
      update posts
      set translations = translations || ${JSON.stringify({ en })}::jsonb
      where slug = ${slug}
    `
  }
  console.log(`✓ ${Object.keys(POSTS).length} artículos traducidos`)

  console.log('\nEl cuerpo de los artículos y las transcripciones siguen en español:')
  console.log('se traducen desde el panel, campo a campo, cuando haga falta.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
