import test from 'node:test';
import assert from 'node:assert/strict';
import { experience, projects, skillGroups, stats, usedIn, matchCommand } from './data.js';

test('usedIn links a skill to the roles and projects that list it', () => {
  assert.deepEqual(usedIn('Angular').map((u) => u.title), ['Hindustan Aeronautics Limited']);
  assert.deepEqual(usedIn('Docker').map((u) => u.title), ['Festly', 'Unfiltered', 'Smart Presence AI']);
  assert.deepEqual(usedIn('Nope'), []);
});

test('ids are unique and every project has somewhere to click', () => {
  const ids = [...experience, ...projects].map((x) => x.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const p of projects) assert.ok(p.live || p.code, `${p.title} has no link`);
});

test('the "projects shipped" stat matches the projects actually shown', () => {
  assert.equal(stats.find((s) => s.label.includes('projects')).value, projects.length);
});

test('no skill appears in two groups', () => {
  const all = skillGroups.flatMap((g) => g.skills);
  assert.equal(new Set(all).size, all.length);
});

test('matchCommand needs every word, ignores case, matches keywords', () => {
  const cmd = { label: 'Go to Projects', keywords: 'work portfolio' };
  assert.ok(matchCommand(cmd, ''));
  assert.ok(matchCommand(cmd, 'PROJ'));
  assert.ok(matchCommand(cmd, 'go work'));
  assert.ok(!matchCommand(cmd, 'go contact'));
});
