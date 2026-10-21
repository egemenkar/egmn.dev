import assert from 'node:assert/strict'
import { test } from 'node:test'
import { education, experience, focusAreas, links, person, posts, site } from '../data/profile.ts'

const words = text => text.trim().split(/\s+/).length

test('positioning matches the CV header', () => {
  assert.equal(person.name, 'Egemen Kar')
  assert.equal(person.headline, 'Head of Frontend | AI-Native Engineering & Product Delivery')
  assert.equal(person.subline, 'Frontend Architecture, Performance & Quality')
  assert.equal(person.jobTitle, 'Head of Frontend')
  assert.equal(person.employer, 'The Despatch Company')
  assert.equal(site.title, 'Egemen Kar — Head of Frontend')
  assert.ok(site.description.length >= 70 && site.description.length <= 200, 'meta description length')
})

test('hero intro is two sentences and about stays within ~120 words', () => {
  assert.equal(person.intro.length, 2)
  assert.ok(words(person.about.join(' ')) <= 125, `about is ${words(person.about.join(' '))} words`)
})

test('contact links are email, LinkedIn and GitHub', () => {
  assert.equal(links.email.href, 'mailto:egemenkar@gmail.com')
  assert.equal(links.linkedin.href, 'https://www.linkedin.com/in/egemen-kar/')
  assert.equal(links.github.href, 'https://github.com/egemenkar')
})

test('focus areas are the four agreed blocks', () => {
  assert.deepEqual(focusAreas.map(({ title }) => title), [
    'Frontend Architecture',
    'Performance & Quality',
    'AI-Native Engineering',
    'Leading Teams & Delivery',
  ])
})

test('experience mirrors the CV timeline', () => {
  assert.deepEqual(
    experience.map(({ company, roles }) => [company, roles.map(({ title, start, end }) => [title, start, end])]),
    [
      ['The Despatch Company', [['Head of Frontend', '2025-02', null], ['Senior Frontend Developer', '2023-04', '2025-02']]],
      ['RIGHTYON', [['Frontend Developer', '2022-01', '2023-04']]],
      ['Freelance', [['Full Stack Web Developer', '2018-04', '2022-01']]],
    ],
  )

  for (const { roles } of experience) {
    for (const role of roles) {
      assert.ok(role.highlights.length >= 2 && role.highlights.length <= 3, `${role.title} should have 2-3 bullets`)
    }
  }
})

test('education mirrors the CV, newest first', () => {
  assert.deepEqual(education.map(({ institution, date, expected }) => [institution, date, Boolean(expected)]), [
    ['Selçuk University', '2027', true],
    ['Anadolu University', '2026-05', false],
    ['Atatürk University', '2023-06', false],
    ['Turkish National Defense University', '2010-08', false],
  ])
})

test('posts, when present, are complete and newest first', () => {
  for (const post of posts) {
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/)
    assert.ok(post.title && post.summary && post.href)
  }
  const dates = posts.map(({ date }) => date)
  assert.deepEqual(dates, [...dates].sort().reverse())
})
