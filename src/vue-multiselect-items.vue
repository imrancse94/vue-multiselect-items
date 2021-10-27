<template>
  <div ref="multi_select_area">
    <label for="">{{ label }}</label>
    <div class="checkbox-select">
      <div
        class="checkbox-select__trigger form-control"
        :class="{ isActive: activeTrigger,'is-invalid':errors }"
        @click.prevent="showDropdown"
      >
        <span class="checkbox-select__title">{{
          checkedFilters.length > 0 
          && 
          Object.values(this.data).some((item)=>{return  this.checkedFilters.some(e=>e == item.id); }) 
            ? checkedFilters.length + " Selected"
            : title
        }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
          <path
            d="M121.3 34.6c-1.6-1.6-4.2-1.6-5.8 0l-51 51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l53.9 53.9c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2.1-5.8z"
          />
        </svg>
      </div>
      <div v-if="errors" class="invalid-feedback">
        {{errors}}
      </div> 
      <div
        v-if="Object.keys(data).length === 0"
        id="dropdown"
        class="checkbox-select__dropdown pb-0 rounded-0"
        :class="{ activeSearch: showLoader, showdropdown: showdropdown }"
      >
        <p class="text-center text-bold text-gray mt-2">No data found</p>
      </div>
      <div
        v-if="Object.keys(data).length > 0"
        id="dropdown"
        class="checkbox-select__dropdown"
        :class="{ activeSearch: showLoader, showdropdown: showdropdown }"
      >
        <div class="checkbox-select__search-wrapp">
          <input
            type="text"
            @focus="showLoader = false"
            @blur="showLoader = false"
            :placeholder="placeholder"
            v-model="search"
          />
        </div>
        <div class="checkbox-select__col">
          <div class="checkbox-select__select-all">
            <label for="selectAll">{{ selectAllText }}</label>
            <input
              type="checkbox"
              id="selectAll"
              @click="selectAll"
              v-model="allSelected"
            />
          </div>
          <div class="checkbox-select__info">
            {{ checkedFilters.length }} SELECTED
          </div>
        </div>
        <ul
          id="customScroll"
          class="checkbox-select__filters-wrapp"
          data-simplebar-auto-hide="false"
        >
          <li :key="index" v-for="(filter, index) in filteredList">
            <div class="checkbox-select__check-wrapp">
              <input
                :id="index"
                class="conditions-check"
                :value="filter.id"
                v-model="checkedFilters"
                type="checkbox"
                @click="updateInput"
              />
              <label :for="index">{{ filter.name }}</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
    },
    data: {
      default: {},
      required: true,
    },
    value: {
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    errors:{
        type: String,
    }
  },
  data() {
    return {
      search: "",
      checkedFilters: [],
      allSelected: false,
      selectAllText: "Select All",
      activeTrigger: false,
      dropdown: false,
      showLoader: false,
      showdropdown: "",
    };
  },
  computed: {
    filteredList() {
      return this.data.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    updateInput(evt) {
      var value = evt.target.value;
      if (evt.target.checked) {
        this.addValue(value);
      } else {
        this.removeValue(value);
      }
      this.$emit("input", this.checkedFilters);
    },
    selectAll: function () {
      this.checkedFilters = [];
      if (this.selectAllText == "Select All") {
        this.data.filter((item) => {
          this.checkedFilters.push(item.id);
        });
      }

      this.selectAllText =
        this.selectAllText == "Select All" ? "Clear All" : "Select All";
    },
    showDropdown: function () {

      if (this.dropdown == false) {
        this.dropdown = true;
        this.activeTrigger = true;
        this.showdropdown = "showdropdown";
      } else {
        this.dropdown = false;
        this.activeTrigger = false;
        this.showdropdown = "";
      }
    },
    close(e) {
      if (!this.$refs.multi_select_area.contains(e.target)) {
        this.dropdown = false;
        this.activeTrigger = false;
        this.showdropdown = "";
      }
    },
    removeValue(value) {
      this.checkedFilters.splice(this.checkedFilters.indexOf(value), 1);
    },
    addValue(value) {
      this.checkedFilters.push(value);
    },
  },
  mounted() {
    this.checkedFilters = this.value;
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {  
    document.removeEventListener("click", this.close);
  },
};
</script>

<style scoped>
.checkbox-select .form-control {
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.checkbox-select .invalid-feedback {
    display: none;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 16px !important;
    color: #dc3545;
}

.checkbox-select .is-invalid~.invalid-feedback{
  display: block;
}
.checkbox-select .showdropdown {
  visibility: inherit;
  opacity: 1;
  transform: matrix(1, 0, 0, 1, 0, 0);
}
.checkbox-select ul {
  margin: 0;
  padding: 0;
}
.checkbox-select ul li {
  list-style: none;
}

.checkbox-select .checkbox-select__search-wrapp input {
  border: none;
  padding: 10px;
}

.checkbox-select textarea,
.checkbox-select input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
}

.checkbox-select {
  position: relative;
  width: 100%;
}
@media only screen and (max-width: 600px) {
  .checkbox-select {
    margin: 0 auto 0;
  }
}
.checkbox-select__trigger {
  border: 1px solid #ced4da;
  background: #fff;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  transition: all 0.4s ease;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 4px 4px 4px 4px;
}
@media only screen and (max-width: 600px) {
  .checkbox-select__trigger {
    padding: 0 15px;
    height: 36px;
  }
}
.checkbox-select__trigger.isActive {
  border-radius: 4px 4px 4px 4px;
  background: #f2f2f2;
}
.checkbox-select__trigger.isActive svg {
  transform: rotate(-180deg);
}
.checkbox-select__trigger:hover {
  background: #f4f4f4;
}
.checkbox-select__trigger svg {
  width: 15px;
  stroke: 4px;
  transition: all 0.4s ease;
}
@media only screen and (max-width: 600px) {
  .checkbox-select__trigger svg {
    width: 15px;
  }
}
.checkbox-select__title {
  flex: 1;
  padding: 7px;
  letter-spacing: 1px;
  padding-left: 0;
}
@media only screen and (max-width: 600px) {
}
.checkbox-select__dropdown {
  opacity: 0;
  visibility: hidden;
  background: #fff;
  position: absolute;
  left: 0;
  right: 0;
  box-shadow: 0 12px 15px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}
.checkbox-select__dropdown:after,
.checkbox-select__dropdown:before {
  position: absolute;
  content: "";
  top: 0;
  display: block;
  height: 4px;
  z-index: 1;
}
.checkbox-select__dropdown:after {
  opacity: 0;
  background: #000;
  left: -200px;
  width: 200px;
  background-color: #2980b9;
  transition: opacity 0.3s ease;
  animation: load 1.8s linear infinite;
  background: linear-gradient(
    135deg,
    #8f24ed 20%,
    #8f24ed 20%,
    #8f24ed 22%,
    #8f24ed 25%,
    #107cb3 100%
  );
}
.checkbox-select__dropdown:before {
  width: 100%;
}
.checkbox-select__dropdown.activeSearch:after {
  opacity: 1;
}
.checkbox-select__dropdown .simplebar-scrollbar {
  width: 3px;
  right: 1px;
}
.checkbox-select__search-wrapp {
  padding: 10px 25px 5px;
}
@media only screen and (max-width: 600px) {
  .checkbox-select__search-wrapp {
    padding: 10px 15px 5px;
  }
}
.checkbox-select__search-wrapp input {
  width: 100%;
  height: 36px;
  border: none;
  font-size: 16px;
  font-family: "Roboto Slab", serif;
  background: transparent;
}
.checkbox-select__search-wrapp ::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #b8b8b8;
  opacity: 1;
}
.checkbox-select__search-wrapp ::-moz-placeholder {
  /* Firefox 19+ */
  color: #b8b8b8;
  opacity: 1;
}
.checkbox-select__search-wrapp :-ms-input-placeholder {
  /* IE 10+ */
  color: #b8b8b8;
  opacity: 1;
}
.checkbox-select__search-wrapp :-moz-placeholder {
  /* Firefox 18- */
  color: #b8b8b8;
  opacity: 1;
}
.checkbox-select__col {
  display: flex;
  font-size: 12px;
  padding: 0 25px;
  justify-content: space-between;
  text-transform: uppercase;
  margin-bottom: 10px;
}
@media only screen and (max-width: 600px) {
  .checkbox-select__col {
    padding: 0 15px;
  }
}
.checkbox-select__select-all label {
  cursor: pointer;
}
.checkbox-select__select-all input {
  display: none;
}
.checkbox-select__filters-wrapp {
  margin-top: 20px;
  height: 161px;
  overflow-y: auto;
  margin-bottom: 15px !important;
}
.checkbox-select__check-wrapp {
  position: relative;
  padding: 0 25px;
  margin-bottom: 5px;
}
@media only screen and (max-width: 600px) {
  .checkbox-select__check-wrapp {
    padding: 0 15px;
  }
}
.checkbox-select__check-wrapp input[type="checkbox"] {
  display: none;
}
.checkbox-select__check-wrapp input[type="checkbox"] + label {
  position: relative;
  cursor: pointer;
  font-size: 16px;
  line-height: 22px;
  padding-left: 30px;
  display: inline-block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: padding 0.25s ease;
  font-weight: normal;
}
.checkbox-select__check-wrapp input[type="checkbox"] + label:after {
  border: solid 2px #5cb85c;
  content: "";
  width: 22px;
  height: 22px;
  top: 0;
  left: 0;
  position: absolute;
}
.checkbox-select__check-wrapp input[type="checkbox"] + label:before {
  width: 14px;
  height: 14px;
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  background-color: #5cb85c;
  opacity: 0;
  will-change: transform;
  transform: scale(0.5);
  transition: all 0.2s ease;
}
.checkbox-select__check-wrapp input[type="checkbox"] + label:hover {
  padding-left: 32px;
}
.checkbox-select__check-wrapp input[type="checkbox"]:checked + label:before {
  opacity: 1;
  transform: scale(1);
}

@keyframes load {
  0% {
    left: -200px;
    width: 20%;
  }
  50% {
    width: 40%;
  }
  70% {
    width: 60%;
  }
  80% {
    left: 50%;
  }
  95% {
    left: 120%;
  }
  100% {
    left: 100%;
  }
}
.link {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 20px;
  z-index: 9999;
}
.link a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
}
.link .fa {
  font-size: 28px;
  margin-right: 8px;
  color: #fff;
}

.form-control.is-invalid {
    border-color: #dc3545;
}
</style>