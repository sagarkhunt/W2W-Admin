<template>
  <div class="footer-sticky">
    <footer class="the-footer flex-wrap justify-between" :class="classes">
      <p>
        <span>{{ $t('copyright') }} &copy; </span>
        <span>{{ new Date().getFullYear() }} </span>
        <a href="#" target="_blank" rel="nofollow">{{ $t('way2_work') }}</a>
        <span class="hidden sm:inline-block">, {{ $t('all_rights_reserved') }}</span>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'the-footer',
  props: {
    classes: {
      type: String
    }
  }
}
</script>
