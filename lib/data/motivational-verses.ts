export interface MotivationalVerse {
  text: string;
  reference: string;
}

export const motivationalVerses: MotivationalVerse[] = [
  {
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13"
  },
  {
    text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
    reference: "Jeremiah 29:11"
  },
  {
    text: "The Lord is my strength and my shield; in him my heart trusts, and I am helped.",
    reference: "Psalm 28:7"
  },
  {
    text: "Be strong and courageous. Do not fear or be in dread, for it is the Lord your God who goes with you.",
    reference: "Deuteronomy 31:6"
  },
  {
    text: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
    reference: "Proverbs 3:5"
  },
  {
    text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.",
    reference: "Philippians 4:6"
  },
  {
    text: "The Lord is near to the brokenhearted and saves the crushed in spirit.",
    reference: "Psalm 34:18"
  },
  {
    text: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7"
  },
  {
    text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you.",
    reference: "Isaiah 41:10"
  },
  {
    text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.",
    reference: "Lamentations 3:22-23"
  },
  {
    text: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles.",
    reference: "Isaiah 40:31"
  },
  {
    text: "The Lord will fight for you, and you have only to be silent.",
    reference: "Exodus 14:14"
  },
  {
    text: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you.",
    reference: "John 14:27"
  },
  {
    text: "In all your ways acknowledge him, and he will make straight your paths.",
    reference: "Proverbs 3:6"
  },
  {
    text: "The joy of the Lord is your strength.",
    reference: "Nehemiah 8:10"
  },
  {
    text: "Let us not grow weary of doing good, for in due season we will reap, if we do not give up.",
    reference: "Galatians 6:9"
  },
  {
    text: "The Lord is my light and my salvation; whom shall I fear?",
    reference: "Psalm 27:1"
  },
  {
    text: "Come to me, all who labor and are heavy laden, and I will give you rest.",
    reference: "Matthew 11:28"
  },
  {
    text: "If God is for us, who can be against us?",
    reference: "Romans 8:31"
  },
  {
    text: "The Lord is good, a stronghold in the day of trouble; he knows those who take refuge in him.",
    reference: "Nahum 1:7"
  },
  {
    text: "Commit your work to the Lord, and your plans will be established.",
    reference: "Proverbs 16:3"
  },
  {
    text: "Be still, and know that I am God.",
    reference: "Psalm 46:10"
  },
  {
    text: "God is our refuge and strength, a very present help in trouble.",
    reference: "Psalm 46:1"
  },
  {
    text: "Rejoice in hope, be patient in tribulation, be constant in prayer.",
    reference: "Romans 12:12"
  },
  {
    text: "The Lord your God is in your midst, a mighty one who will save; he will rejoice over you with gladness.",
    reference: "Zephaniah 3:17"
  },
  {
    text: "For where two or three are gathered in my name, there am I among them.",
    reference: "Matthew 18:20"
  },
  {
    text: "And we know that for those who love God all things work together for good.",
    reference: "Romans 8:28"
  },
  {
    text: "The Lord bless you and keep you; the Lord make his face to shine upon you.",
    reference: "Numbers 6:24-25"
  },
  {
    text: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you.",
    reference: "Ephesians 4:32"
  },
  {
    text: "Draw near to God, and he will draw near to you.",
    reference: "James 4:8"
  },
  {
    text: "The Lord is gracious and merciful, slow to anger and abounding in steadfast love.",
    reference: "Psalm 145:8"
  }
];

/**
 * Get the verse of the day based on current date
 * Uses day of month to cycle through verses
 */
export function getVerseOfTheDay(): MotivationalVerse {
  const today = new Date();
  const dayOfMonth = today.getDate(); // 1-31
  const index = (dayOfMonth - 1) % motivationalVerses.length;
  return motivationalVerses[index];
}
