<template>
  <footer class="footer-shell">
    <div class="app-container footer-inner">
      <span>SkillHub static foundation</span>
      <span>Built for GitHub Pages delivery</span>
    </div>
  </footer>
</template>

<style scoped>
.footer-shell {
  border-top: 1px solid var(--border);
  margin-top: 48px;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 0 40px;
  color: var(--text-muted);
  font-size: 14px;
}

@media (max-width: 767px) {
  .footer-inner {
    flex-direction: column;
  }
}
</style>
