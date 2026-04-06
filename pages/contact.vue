<template>
  <div>
    <AppNav />

    <section class="contact-page">
      <div class="contact-bg" />
      <div class="container">
        <div class="contact-grid">
          <!-- Left: info -->
          <div class="contact-info">
            <div class="eyebrow">Contact</div>
            <h1 class="contact-h1">Let's build something<br />together.</h1>
            <p class="contact-sub">
              Tell us about your game, your studio, ideas, and your scale goals. We'll
              reach you as soon as possible.
            </p>

            <!-- <div class="contact-details">
              <div class="detail">
                <span class="detail-label">Response time</span>
                <span class="detail-val">&lt; 24h</span>
              </div>
              <div class="detail">
                <span class="detail-label">Integration support</span>
                <span class="detail-val">Hands-on</span>
              </div>
              <div class="detail">
                <span class="detail-label">Early access</span>
                <span class="detail-val status-coming-soon">Coming soon</span>
              </div>
            </div> -->
          </div>

          <!-- Right: form -->
          <div class="contact-form-wrap">
            <form
              v-if="!submitted"
              class="contact-form"
              @submit.prevent="handleSubmit"
              novalidate
            >
              <div class="form-row">
                <div class="field">
                  <label for="name" class="field-label">Name</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Your name"
                    class="field-input"
                    :class="{ error: errors.name }"
                    autocomplete="name"
                  />
                  <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
                </div>
                <div class="field">
                  <label for="studio" class="field-label">Studio</label>
                  <input
                    id="studio"
                    v-model="form.studio"
                    type="text"
                    placeholder="Studio name"
                    class="field-input"
                    :class="{ error: errors.studio }"
                    autocomplete="organization"
                  />
                  <span v-if="errors.studio" class="field-error">{{ errors.studio }}</span>
                </div>
              </div>

              <div class="field">
                <label for="email" class="field-label">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="you@studio.com"
                  class="field-input"
                  :class="{ error: errors.email }"
                  autocomplete="email"
                />
                <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
              </div>

              <div class="field">
                <label for="message" class="field-label">Message</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  placeholder="Your message here"
                  class="field-input field-textarea"
                  :class="{ error: errors.message }"
                />
                <span v-if="errors.message" class="field-error">{{ errors.message }}</span>
              </div>

              <button type="submit" class="submit-btn" :disabled="submitting">
                <span v-if="!submitting">Send message →</span>
                <span v-else class="submitting-text">Sending…</span>
              </button>
            </form>

            <div v-else class="success-state">
              <div class="success-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="15" stroke="var(--accent)" stroke-width="1.5" />
                  <path
                    d="M10 16.5L14 20.5L22 12.5"
                    stroke="var(--accent)"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="success-title">Message received.</h3>
              <p class="success-desc">
                We'll review your project and get back to you within 24 hours.
              </p>
              <button class="reset-btn" @click="reset">Send another message</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

interface FormData {
  name: string
  studio: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  studio?: string
  email?: string
  message?: string
}

const form = reactive<FormData>({
  name: '',
  studio: '',
  email: '',
  message: '',
})

const errors = reactive<FormErrors>({})
const submitting = ref(false)
const submitted = ref(false)

function validate(): boolean {
  Object.assign(errors, { name: undefined, studio: undefined, email: undefined, message: undefined })

  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.studio.trim()) errors.studio = 'Studio name is required.'
  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!form.message.trim()) errors.message = 'Message is required.'

  return !Object.values(errors).some(Boolean)
}

async function handleSubmit() {
  if (!validate()) return

  submitting.value = true
  try {
    await $fetch('https://formspree.io/f/mlgoaozw', {
      method: 'POST',
      body: { ...form },
    })
    submitted.value = true
  } finally {
    submitting.value = false
  }
}

function reset() {
  form.name = ''
  form.studio = ''
  form.email = ''
  form.message = ''
  submitted.value = false
}
</script>

<style scoped>
/* ── Layout ─────────────────────────────────────────────────── */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.eyebrow {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text);
  margin-bottom: 1.5rem;
}

/* ── Page ─────────────────────────────────────────────────────── */
.contact-page {
  position: relative;
  min-height: 100vh;
  padding: 9rem 0 6rem;
  overflow: hidden;
}

.contact-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 70% 60% at 0% 30%,
    rgba(128, 224, 199, 0.03) 0%,
    transparent 60%
  );
  pointer-events: none;
}

/* ── Grid ─────────────────────────────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7rem;
  align-items: start;
}

/* ── Info ─────────────────────────────────────────────────────── */
.contact-h1 {
  font-size: clamp(34px, 4.5vw, 56px);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: var(--text);
  margin-bottom: 1.5rem;
}

.contact-sub {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 3rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.detail:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 13px;
  color: var(--muted);
  font-weight: 300;
}

.detail-val {
  font-size: 13px;
  color: var(--text);
  font-weight: 400;
}

.detail-val.status-coming-soon {
  color: var(--accent);
  font-weight: 500;
  text-transform: none;
}

/* ── Form ─────────────────────────────────────────────────────── */
.contact-form-wrap {
  position: relative;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text);
}

.field-input {
  background: rgba(212, 235, 235, 0.06);
  border: 1px solid rgba(212, 235, 235, 0.12);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 300;
  color: var(--text);
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
  resize: none;
  width: 100%;
}

.field-input::placeholder {
  color: rgba(212, 235, 235, 0.35);
}

.field-input:focus {
  background: rgba(212, 235, 235, 0.09);
  border-color: rgba(128, 224, 199, 0.5);
}

.field-input.error {
  border-color: rgba(255, 100, 100, 0.4);
}

.field-textarea {
  min-height: 130px;
  color: var(--text);
}

.field-error {
  font-size: 12px;
  color: rgba(255, 130, 130, 0.8);
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  padding: 14px 32px;
  background: var(--accent);
  color: #030705;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.2s, transform 0.15s;
  align-self: flex-start;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.88;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submitting-text {
  opacity: 0.7;
}

/* ── Success ─────────────────────────────────────────────────── */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 3rem;
  border: 1px solid rgba(128, 224, 199, 0.2);
  border-radius: 12px;
  background: rgba(128, 224, 199, 0.03);
}

.success-title {
  font-size: 22px;
  font-weight: 300;
  letter-spacing: -0.03em;
  color: var(--text);
}

.success-desc {
  font-size: 14px;
  font-weight: 300;
  color: var(--muted);
  line-height: 1.65;
}

.reset-btn {
  font-size: 13px;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.reset-btn:hover {
  opacity: 1;
}

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 540px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
