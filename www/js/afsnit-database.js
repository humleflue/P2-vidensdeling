let sectionDatabase = [
    {section: 2.1, content: {keywords: ['vidensdeling', 'feed-up', 'feed-forward']}},
    {section: 2.2, content: {keywords: ['studier', 'evaluering', 'formativ', 'summativ']}},
    {section: 2.3, content: {keywords: ['metoder', 'active recall', 'spaced repetition']}},
    {section: 2.4, content: {keywords: ['SOTA', 'classkick', 'kahoot!']}},
];

/* console.log(sectionDatabase[0].content.keywords); */

let afsnitMap = new Map();
afsnitMap.set(2.1, ['vidensdeling', 'feed-up', 'feed-forward']);
afsnitMap.set(2.2, ['studier', 'evaluering', 'formativ', 'summativ']);
afsnitMap.set(2.3, ['metoder', 'active recall', 'spaced repetition']);
afsnitMap.set(2.4, ['SOTA', 'classkick', 'kahoot!']);

afsnitMap.get(2.1);
console.log(afsnitMap.get(2.1));
console.log(afsnitMap.get(2.2));
console.log(afsnitMap.get(2.3));
console.log(afsnitMap.get(2.4));
