import type { Devotion } from '@/types';

export const sampleDevotions: Devotion[] = [
  {
    id: 'dev-1',
    title: 'Finding Peace in the Chaos',
    date: new Date(),
    readingTime: 5,
    scripture: {
      book: 'Philippians',
      chapter: 4,
      verseStart: 6,
      verseEnd: 7,
      translation: 'NIV',
      text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
    },
    content: `We live in a world that constantly demands our attention. Between social media notifications, work emails, and endless to-do lists, anxiety has become the background noise of modern life.

But Paul's words to the Philippians offer a radically different approach. He doesn't say "eliminate all stressors" or "achieve perfect calm." Instead, he invites us into a practice: bring everything to God with gratitude.

The peace God offers isn't the absence of chaos - it's a presence that guards your heart in the middle of it. This peace "transcends understanding" because it doesn't make logical sense. You can have bills to pay, difficult relationships, and uncertain futures, yet still experience deep, supernatural peace.

The key? Prayer + Thanksgiving. Not just asking, but grateful asking. This shifts our focus from what we lack to what we have, from fear to faith.`,
    reflection: `Think about one thing causing you anxiety right now. Instead of spiraling into worst-case scenarios, what would it look like to pray about it with genuine thanksgiving for what you do have?`,
    actionStep: 'Set a timer for 2 minutes. Write down 3 things you\'re anxious about, then write 3 things you\'re grateful for. Pray about all 6.',
    category: 'anxiety-peace',
    tags: ['anxiety', 'prayer', 'gratitude', 'mental health'],
  },
  {
    id: 'dev-2',
    title: 'Work as Worship, Not Just Hustle',
    date: new Date(Date.now() - 86400000), // yesterday
    readingTime: 5,
    scripture: {
      book: 'Colossians',
      chapter: 3,
      verseStart: 23,
      verseEnd: 24,
      translation: 'NLT',
      text: 'Work willingly at whatever you do, as though you were working for the Lord rather than for people. Remember that the Lord will give you an inheritance as your reward, and that the Master you are serving is Christ.',
    },
    content: `Hustle culture tells us that our worth is tied to our productivity. Rest is for the weak. Grind now, rest later (maybe). But that's not the biblical vision for work.

Paul reframes work entirely: you're not ultimately working for your boss, your clients, or even yourself. You're working for Jesus. This changes everything.

When work is worship, you can do excellent work without it defining you. You can pursue excellence without burnout because your identity isn't tied to your output. You can have a bad day at work without having a bad day as a person.

This also means your "secular" job has sacred significance. Whether you're coding, teaching, serving coffee, or changing diapers - if you're doing it "as unto the Lord," it's worship.`,
    reflection: `How would your approach to work change if you truly believed you were working for Jesus, not just a paycheck or career advancement?`,
    actionStep: 'Before you start work today, pause and pray: "Jesus, I offer this work to you. Help me do it with excellence and peace, not anxiety and pride."',
    category: 'work-ethics',
    tags: ['work', 'purpose', 'identity', 'hustle culture'],
  },
  {
    id: 'dev-3',
    title: 'The Radical Practice of Sabbath',
    date: new Date(Date.now() - 172800000), // 2 days ago
    readingTime: 5,
    scripture: {
      book: 'Exodus',
      chapter: 20,
      verseStart: 8,
      verseEnd: 10,
      translation: 'ESV',
      text: 'Remember the Sabbath day, to keep it holy. Six days you shall labor, and do all your work, but the seventh day is a Sabbath to the Lord your God.',
    },
    content: `Sabbath is one of the most counter-cultural practices in Scripture. In a world addicted to productivity, God commands us to stop.

Not because we've earned it. Not because all the work is done (it never is). But because rest is a declaration of trust: "God, I trust that the world won't fall apart if I take a day off."

Sabbath is resistance against hustle culture, against the lie that you are what you produce. It's choosing delight over duty, presence over productivity, worship over work.

But here's the thing many young Christians miss: Sabbath isn't just "no work." It's actively choosing life-giving activities. It's a phone-free hike. It's cooking a slow meal with friends. It's creating art for fun, not content. It's worshiping without agenda.`,
    reflection: `What activities genuinely restore your soul, not just distract you? What would a true Sabbath look like for you?`,
    actionStep: 'Block off 3 hours this week for Sabbath. Put your phone in another room. Do something that brings you joy without productivity attached.',
    category: 'rest-sabbath',
    tags: ['sabbath', 'rest', 'boundaries', 'hustle culture', 'burnout'],
  },
  {
    id: 'dev-4',
    title: 'Healthy Boundaries Are Holy Boundaries',
    date: new Date(Date.now() - 259200000), // 3 days ago
    readingTime: 5,
    scripture: {
      book: 'Matthew',
      chapter: 5,
      verseStart: 37,
      translation: 'NIV',
      text: 'All you need to say is simply "Yes" or "No"; anything beyond this comes from the evil one.',
    },
    content: `Many Christians struggle with boundaries because we conflate "Christlike love" with "being a doormat." But Jesus had clear boundaries.

He said no to crowds when He needed to pray. He didn't let people's expectations dictate His mission. He spoke truth even when it made people uncomfortable. He protected His time, energy, and emotional space.

Healthy boundaries aren't selfish - they're necessary for sustainable love. You can't pour from an empty cup. You can't serve others well if you're burned out and resentful.

Saying "no" to something good often means saying "yes" to something better. No to obligatory social events might mean yes to rest. No to someone else's crisis might mean yes to your family. No to overcommitting might mean yes to depth over breadth.`,
    reflection: `Where in your life do you need to establish clearer boundaries? What "no" would create space for a more important "yes"?`,
    actionStep: 'Identify one area where you need a boundary (time, emotional energy, a relationship). Practice saying "I can\'t commit to that right now" today.',
    category: 'relationships',
    tags: ['boundaries', 'relationships', 'self-care', 'saying no'],
  },
];
