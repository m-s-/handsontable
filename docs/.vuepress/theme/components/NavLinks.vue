<template>
  <nav class="nav-links">
    <!-- user links -->
    <div :class="{'nav-item': true, 'no-active': isRoadmapLinkActive}">
      <NavLink :item="guideLink"/>
    </div>
    <div class="nav-item">
      <NavLink :item="apiLink"/>
    </div>
    <div class="nav-item roadmap">
      <NavLink :item="roadmapLink"/>
    </div>
  </nav>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue';

export default {
  name: 'NavLinks',

  components: {
    NavLink
  },
  computed: {
    frameworkUrlPrefix() {
      return `/${this.$page.currentFramework}${this.$page.frameworkSuffix}`;
    },
    guideLink() {
      return {
        link: `${this.frameworkUrlPrefix}/`,
        text: 'Docs'
      };
    },
    apiLink() {
      return {
        link: `${this.frameworkUrlPrefix}/api/`,
        text: 'API'
      };
    },
    roadmapLink() {
      return {
        link: `${this.frameworkUrlPrefix}/roadmap/`,
        text: 'Roadmap'
      };
    },
    isRoadmapLinkActive() {
      return this.$route.path.includes('/roadmap');
    }
  }
};

</script>
