<template lang="html">
    <a class="nav-item has-dropdown" :class="{ 'is-active': isOpen}" @click.stop="toggleDropdown">
        <img v-if="image" :src="image" class="image is-24x24">
        {{title}}
        <span class="icon">
            <i class="fa fa-chevron-down" v-if="!isOpen"></i>
            <i class="fa fa-chevron-up" v-if="isOpen"></i>
        </span>

        <div class="dropdown" :class="alignClass" v-show="isOpen" @click.stop="">
            <div class="dropdown-body">
                <slot></slot>
            </div>
        </div>
    </a>
</template>

<script>
export default {
  name: 'domain-dropdown',
  props: ["title", "image", "align"],
  created() {
    document.addEventListener('click', function(event) {
      this.isOpen = false;
    }.bind(this));
  },
  data() {
    return {
      domains: [],
      isOpen: false
    };
  },
  computed: {
    alignClass() {
      return "is-" + this.align;
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    }
  }
}
</script>

<style lang="scss">
.dropdown {
    position: absolute;
    top: 100%;
    min-width: 200px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    padding: 5px 0;
    overflow: hidden;
    z-index: 20;

    &.is-right {
        right: 1rem;
    }

    &.is-left {
        left: 1rem;
    }

    .dropdown-body {
        max-height: 360px;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .dropdown-section {
        border-bottom: solid 1px #ddd;
        padding-bottom: 1rem;
        &:last-child {
            border-bottom: none;
        }

        .dropdown-section-heading {
            color: #ddd;
            padding: 1rem;
            margin-bottom: 0.5rem;
        }
    }
}
</style>
