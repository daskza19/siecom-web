<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const HELP_ITEMS = [
  { id: 'invoices', icon: 'file' },
  { id: 'consumption', icon: 'chart' },
  { id: 'support', icon: 'headset' },
]
</script>

<template>
  <div class="view">
    <section class="section login">
      <div class="container login__inner">
        <div class="login__intro">
          <p class="eyebrow">{{ $t('clientAccess.eyebrow') }}</p>
          <h1>{{ $t('clientAccess.title') }}</h1>
          <p class="lead">{{ $t('clientAccess.subtitle') }}</p>

          <ul class="help">
            <li v-for="item in HELP_ITEMS" :key="item.id" class="help__item">
              <span class="help__icon"><AppIcon :name="item.icon" :size="20" /></span>
              <div>
                <h2 class="help__title">{{ $t(`clientAccess.help.${item.id}.title`) }}</h2>
                <p class="help__text">{{ $t(`clientAccess.help.${item.id}.description`) }}</p>
              </div>
            </li>
          </ul>
        </div>

        <form class="card login__form" @submit.prevent>
          <label class="field">
            <span class="field__label">{{ $t('clientAccess.form.user') }}</span>
            <input
              class="field__input"
              type="text"
              autocomplete="username"
              :placeholder="$t('clientAccess.form.userPlaceholder')"
            />
          </label>

          <label class="field">
            <span class="field__label">{{ $t('clientAccess.form.password') }}</span>
            <input
              class="field__input"
              type="password"
              autocomplete="current-password"
              :placeholder="$t('clientAccess.form.passwordPlaceholder')"
            />
          </label>

          <div class="login__row">
            <label class="checkbox">
              <input type="checkbox" />
              <span>{{ $t('clientAccess.form.remember') }}</span>
            </label>
            <a class="login__link" href="#">{{ $t('clientAccess.form.forgot') }}</a>
          </div>

          <BaseButton type="submit" block>
            <AppIcon name="lock" :size="18" />
            {{ $t('clientAccess.form.submit') }}
          </BaseButton>

          <p class="login__footer">
            {{ $t('clientAccess.form.noAccount') }}
            <a class="login__link" href="#">{{ $t('clientAccess.form.register') }}</a>
          </p>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.login {
  background: linear-gradient(180deg, var(--color-brand-50), var(--color-bg) 60%);
}

.login__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-8);
  align-items: start;
}

.login__intro { display: grid; gap: var(--space-3); }

.help {
  display: grid;
  gap: var(--space-4);
  margin-top: var(--space-5);
}

.help__item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.help__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  border: var(--border-base);
  color: var(--color-primary);
}

.help__title { font-size: var(--font-size-md); }

.help__text { font-size: var(--font-size-sm); color: var(--color-text-muted); }

.login__form {
  display: grid;
  gap: var(--space-4);
  box-shadow: var(--shadow-md);
}

.field { display: grid; gap: var(--space-2); }

.field__label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.field__input {
  width: 100%;
  padding: var(--padding-input);
  border: var(--border-base);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg);
  color: var(--color-text);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.field__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}

.login__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  font-size: var(--font-size-sm);
}

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
}

.login__link {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}
.login__link:hover { text-decoration: underline; }

.login__footer {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-align: center;
}

@media (min-width: 900px) {
  .login__inner {
    grid-template-columns: minmax(0, 1fr) minmax(360px, 420px);
    gap: var(--space-9);
  }
}
</style>
