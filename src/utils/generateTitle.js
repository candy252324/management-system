export function generateTitle(title) {
  const hasKey = this.$te('sidebar.' + title)
  const translatedTitle = this.$t('sidebar.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js

  if (hasKey) {
    return translatedTitle
  }
  return title
}
