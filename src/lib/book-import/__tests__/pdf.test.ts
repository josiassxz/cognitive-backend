import { describe, it } from 'vitest';

// We do not yet have a representative PDF fixture committed to the repo, and
// generating one at test time would require an additional dep (`pdf-lib`) just
// for the smoke test. The PDF v2 pipeline is still covered by the unit-level
// reflow / chapter-detection logic; this is a placeholder to track the gap.
describe('extractPdf', () => {
  it.todo('parses a sample PDF into NormalizedBook chapters');
});
