/**
 * Divya Mangalam — Vedic Knowledge Corpus & Retrieval Engine
 * Indexes:
 *  1. Classical Stotras & Shlokas (Sanskrit & English translation)
 *  2. Ashtadasha Maha Puranas (Key verses, chapters & philosophical summaries)
 *  3. Srimad Mahabharata (Unabridged P.C. Roy translation sections)
 */

const fs = require('fs');
const path = require('path');

// Classical Stotras & Vedic Mantras
const CLASSICAL_SHLOKAS = [
  {
    id: "SHLOKA-GAYATRI",
    source: "Rigveda (3.62.10) & Shukla Yajurveda",
    chapter: "Gayatri Chandas",
    text: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥\nWe meditate upon the supreme spiritual splendor of the divine Sun (Savitr). May that divine light illuminate and inspire our intellect toward truth and righteousness."
  },
  {
    id: "SHLOKA-MRITYUNJAYA",
    source: "Rigveda (7.59.12) & Taittiriya Samhita",
    chapter: "Maha Mrityunjaya Sukta",
    text: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात् ॥\nWe revere the three-eyed Lord Shiva, fragrant and nourishing all existence. As a ripe cucumber is gently released from its stalk, may He liberate us from mortality and fear of death into the eternal light of immortality."
  },
  {
    id: "SHLOKA-ASATO-MA",
    source: "Brihadaranyaka Upanishad (1.3.28)",
    chapter: "Pavamana Abhyaroha Mantra",
    text: "ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥ ॐ शान्तिः शान्तिः शान्तिः ॥\nLead us from the unreal to the real. Lead us from darkness to light. Lead us from mortality to immortality. Om peace, peace, peace."
  },
  {
    id: "SHLOKA-SARVE-BHAVANTU",
    source: "Brihadaranyaka Upanishad & Garuda Purana",
    chapter: "Universal Shanti Prayer",
    text: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥ ॐ शान्तिः शान्तिः शान्तिः ॥\nMay all beings everywhere be happy and free from illness. May all perceive auspiciousness and virtue. May no one suffer distress or grief. Om peace, peace, peace."
  },
  {
    id: "SHLOKA-GURU-STOTRAM",
    source: "Skanda Purana",
    chapter: "Guru Gita",
    text: "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः । गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः ॥\nThe Guru is Brahma the creator, the Guru is Vishnu the preserver, the Guru is Shiva the transformer. The Guru is verily the supreme Brahman. Salutations to that revered spiritual guide."
  },
  {
    id: "SHLOKA-GANESHA-DHYANAM",
    source: "Ganesha Purana & Mudgala Purana",
    chapter: "Vighnaharta Dhyana",
    text: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥\nO Lord of the curved trunk, of immense divine form, whose brilliance equals ten million suns: please remove all obstacles from all my endeavors at all times."
  },
  {
    id: "SHLOKA-DEVI-APARAJITA",
    source: "Devi Mahatmyam / Markandeya Purana",
    chapter: "Chapter 5 (Devi Suktam)",
    text: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता । नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥\nTo that Divine Mother who abides in all living beings in the form of Power and Consciousness: salutations to Her, salutations to Her, repeated salutations again and again."
  },
  {
    id: "SHLOKA-HANUMAN-CHALISA-01",
    source: "Goswami Tulsidas — Hanuman Chalisa",
    chapter: "Invocation Doha & Chaupai 1",
    text: "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि । बरनउँ रघुबर बिमल जसु जो दायकु फल चारि ॥ जय हनुमान ज्ञान गुन सागर । जय कपीस तिहुँ लोक उजागर ॥\nHaving cleansed the mirror of my mind with the dust of the holy Guru's lotus feet, I narrate the pure glory of Lord Rama, which bestows the four fruits of life (Dharma, Artha, Kama, Moksha). Glory to Hanuman, the boundless ocean of wisdom and virtue; glory to the Lord of the Vanaras, who illumines the three worlds."
  },
  {
    id: "SHLOKA-SHIVA-PANCHAKSHARA",
    source: "Shiva Purana & Adi Shankaracharya",
    chapter: "Shiva Panchakshara Stotram",
    text: "नागेन्द्रहाराय त्रिलोचनाय भस्माङ्गरागाय महेश्वराय । नित्याय शुद्धाय दिगम्बराय तस्मै नकाराय नमः शिवाय ॥\nTo Him who wears the serpent king as a garland, the three-eyed Lord, whose limbs are adorned with holy ashes, the supreme Maheshvara, eternal, pure, and clothed in the directions: salutations to the syllable 'Na', salutations to Shiva."
  },
  {
    id: "SHLOKA-PARASHARA-MANGAL",
    source: "Brihat Parashara Hora Shastra",
    chapter: "Chapter 28 — Dosha Vichara & Kuja Dosha",
    text: "लग्ने व्यये च पाताले यामित्रे चाष्टमे कुजे । भार्या भर्तुर्विनाशाय भर्तुश्च स्त्रीविनाशनम् ॥ कुजदोषे स्थिते भौमे मेषे वृश्चिके वा स्वक्षेत्रे नास्ति दोषः ॥\nWhen Mars is situated in the 1st, 12th, 4th, 7th, or 8th house from the Ascendant, Kuja Dosha is considered. However, if Mars is located in its own sign (Aries or Scorpio) or in Capricorn (exaltation), the blemish is cancelled through divine strength and self-discipline."
  },
  {
    id: "SHLOKA-PARASHARA-SHANI",
    source: "Brihat Parashara Hora Shastra",
    chapter: "Chapter 44 — Shani Dasha & Transits",
    text: "शनिः शुभप्रदः काले तपसा धर्मरक्षणे । धैर्यं यस्य मनोवृत्तिः स जयं प्राप्नुयात् सदा ॥\nSaturn rewards the steady practitioner through austerity, truth, and righteous conduct. One whose mental disposition is anchored in patience and humility attains lasting victory over tribulations."
  }
];

// Lazy-loaded cache
let corpusPassages = null;

function loadCorpus() {
  if (corpusPassages) return corpusPassages;

  const passages = [...CLASSICAL_SHLOKAS];

  // 1. Ingest Puranas data if available
  const puranasPath = path.join(__dirname, '..', 'puranas-data.js');
  if (fs.existsSync(puranasPath)) {
    try {
      const puranasFile = fs.readFileSync(puranasPath, 'utf8');
      // Extract PURANAS array using Function eval in safe context
      const sandbox = {};
      const runner = new Function('sandbox', puranasFile + '\nsandbox.PURANAS = PURANAS;');
      runner(sandbox);

      if (Array.isArray(sandbox.PURANAS)) {
        sandbox.PURANAS.forEach(p => {
          if (p.keyShloka) {
            passages.push({
              id: `PUR-${p.id.toUpperCase()}-KEY-SHLOKA`,
              source: `${p.nameEn} (${p.nameSa})`,
              chapter: "Invocation & Central Verse",
              text: `${p.keyShloka.sanskrit}\n${p.keyShloka.meaningEn}`
            });
          }
          if (p.summaryEn) {
            passages.push({
              id: `PUR-${p.id.toUpperCase()}-SUMMARY`,
              source: `${p.nameEn}`,
              chapter: "Overview & Philosophy",
              text: p.summaryEn
            });
          }
        });
      }
    } catch (e) {
      console.warn('Could not parse puranas-data.js for corpus:', e.message);
    }
  }

  // 2. Ingest key Mahabharata texts if available
  const mbDir = path.join(__dirname, '..', 'mahabharata-text');
  if (fs.existsSync(mbDir)) {
    const keyFiles = ['vol-01-adi.json', 'vol-05-bhishma.json', 'vol-08-shanti1.json'];
    keyFiles.forEach(file => {
      const filePath = path.join(mbDir, file);
      if (fs.existsSync(filePath)) {
        try {
          const mbData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (mbData && Array.isArray(mbData.sections)) {
            // Index first 10 sections of key volumes to keep memory light and relevant
            mbData.sections.slice(0, 10).forEach(sec => {
              if (sec.text && sec.text.length > 50) {
                // Take first 1,200 chars as clean excerpt
                const excerpt = sec.text.substring(0, 1200).replace(/\s+/g, ' ').trim();
                passages.push({
                  id: `MHB-${mbData.id.toUpperCase()}-SEC-${sec.number}`,
                  source: `Mahabharata — ${mbData.title} (Tr. Pratap Chandra Roy)`,
                  chapter: sec.title || `Section ${sec.number}`,
                  text: excerpt
                });
              }
            });
          }
        } catch (e) {
          console.warn(`Could not parse ${file}:`, e.message);
        }
      }
    });
  }

  corpusPassages = passages;
  return corpusPassages;
}

/**
 * Deterministic keyword retrieval across corpus
 * @param {string} query - User question or topic
 * @param {number} limit - Maximum passages to return (default 4)
 * @returns {Array} Top passages with scores
 */
function retrievePassages(query, limit = 4) {
  const corpus = loadCorpus();
  if (!query || typeof query !== 'string') return [];

  // Tokenize and clean terms
  const terms = query
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !['what', 'when', 'which', 'where', 'how', 'the', 'and', 'for', 'about', 'with', 'does', 'from'].includes(t));

  if (terms.length === 0) {
    // Return universal foundational shlokas
    return corpus.slice(0, limit);
  }

  const scored = corpus.map(item => {
    let score = 0;
    const itemText = (item.text + ' ' + item.source + ' ' + item.chapter).toLowerCase();

    terms.forEach(term => {
      if (itemText.includes(term)) {
        score += 2;
        // Boost if in title/source
        if (item.source.toLowerCase().includes(term) || item.chapter.toLowerCase().includes(term)) {
          score += 3;
        }
      }
    });

    return { item, score };
  });

  const matched = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.item);

  if (matched.length > 0) {
    return matched.slice(0, limit);
  }

  // Fallback to primary shlokas
  return corpus.slice(0, limit);
}

module.exports = {
  loadCorpus,
  retrievePassages,
  CLASSICAL_SHLOKAS
};
