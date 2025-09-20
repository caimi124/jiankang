// Debug script for constitution test
const { questions, calculateConstitution, constitutionInfo } = require('./app/constitution-test/questions.ts');

// Test with sample answers (all answered with value 3 - "Sometimes")
const testAnswers = new Array(20).fill(3);

console.log('Testing constitution calculation...');
console.log('Sample answers:', testAnswers.slice(0, 5) + '...');

try {
  const result = calculateConstitution(testAnswers);
  console.log('Calculation result:', result);

  // Check if constitution info exists
  const primaryInfo = constitutionInfo[result.primary];
  console.log('Primary constitution info exists:', !!primaryInfo);

  if (primaryInfo) {
    console.log('Primary constitution details:', {
      name: primaryInfo.name,
      englishName: primaryInfo.englishName,
      icon: primaryInfo.icon
    });
  }

  // Check all constitution keys
  console.log('Available constitution types:', Object.keys(constitutionInfo));

} catch (error) {
  console.error('Error during calculation:', error);
}