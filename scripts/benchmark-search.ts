
import { buildSearchIndex, searchComplaints, ComplaintFilters } from '../lib/services/complaintSearchService';
import { Complaint } from '../lib/types/medical';
import { performance } from 'perf_hooks';

// Mock Complaint Generator
function generateComplaints(count: number): Complaint[] {
  const complaints: Complaint[] = [];
  const symptoms = ['Headache', 'Fever', 'Cough', 'Pain', 'Dizziness', 'Nausea', 'Fatigue', 'Rash'];
  const locations = ['Head', 'Chest', 'Abdomen', 'Leg', 'Arm', 'Back'];
  const severities = ['Mild', 'Moderate', 'Severe'];

  for (let i = 0; i < count; i++) {
    const symptom = symptoms[Math.floor(Math.random() * symptoms.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const severityText = severities[Math.floor(Math.random() * severities.length)];

    complaints.push({
      id: `complaint-${i}`,
      title: `${severityText} ${symptom} in ${location} ${i}`,
      subtitle: `Patient reports ${symptom.toLowerCase()} affecting the ${location.toLowerCase()}`,
      group: 'General',
      synonyms: [`${symptom} ${location}`, `${location} ${symptom}`],
      searchTerms: [symptom, location],
      chips: [],
      commonMisconceptions: [],
      bodySystem: [],
      severity: Math.floor(Math.random() * 5) + 1,
      riskLevel: Math.random() > 0.5 ? 'high' : 'low',
      isFastTrack: Math.random() > 0.8,
      icd10Codes: [],
      searchWeight: 1,
      // Add other required fields if any, checking types...
      // Based on file read previously, the interface usage in buildSearchIndex seemed to cover these.
    } as any); // Cast to any to avoid strict type checking for all optional fields in this mock
  }
  return complaints;
}

async function runBenchmark() {
  const DATASET_SIZE = 10000;
  console.log(`Generating ${DATASET_SIZE} synthetic complaints...`);
  const complaints = generateComplaints(DATASET_SIZE);

  console.log('Building search index...');
  const buildStart = performance.now();
  const index = buildSearchIndex(complaints);
  const buildEnd = performance.now();
  console.log(`Index built in ${(buildEnd - buildStart).toFixed(2)}ms`);

  const searchTerms = [
    complaints[0].title, // Exact match
    complaints[5000].title.substring(0, 10), // Prefix match
    'Unknown Term', // No match
    'fever', // Common term
    'head', // Short term
  ];

  console.log('\nRunning search benchmark...');

  const ITERATIONS = 100;
  let totalTime = 0;

  for (const term of searchTerms) {
    const start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      searchComplaints(index, term);
    }
    const end = performance.now();
    const duration = end - start;
    totalTime += duration;
    console.log(`Term "${term}": ${(duration / ITERATIONS).toFixed(3)}ms avg per search`);
  }

  console.log(`\nTotal time for ${searchTerms.length * ITERATIONS} searches: ${totalTime.toFixed(2)}ms`);
  console.log(`Average time per search: ${(totalTime / (searchTerms.length * ITERATIONS)).toFixed(3)}ms`);
}

runBenchmark().catch(console.error);
