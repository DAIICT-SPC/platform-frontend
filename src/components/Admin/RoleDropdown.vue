<template lang="html">
  <div class="role-dropdown">

    <label class="label">Role</label>

    <span :class="{ 'select': true, 'is-danger': errors.has('roleDropdown') }">
      <select v-validate="'required|not_in:null'" v-model="role" name="roleDropdown" @change="roleChange">
        <option value=''>Select Role</option>
        <option value=student>Student</option>
        <option value=company>Company</option>
        <option value=admin>Admin</option>
      </select>
    </span>
    <div class="help is-danger" v-show="errors.has('roleDropdown')">
			The Role is a required field.
		</div>

  </div>
</template>

<script>
export default {
  name: 'role-dropdown',

  data() {
    return {
      role: ''
    };
  },
  methods: {
    roleChange() {
      this.$bus.$emit( 'role-change', {
        role: this.role
      } );
    }
  }
}
</script>

<style lang="scss">
.role-dropdown {}
</style>
