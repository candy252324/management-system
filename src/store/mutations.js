export let changeColor = (state,color) => {
  state.default.lang=color;
}

export let changeStatusTrue = state => {
	state.default.changeStatus = true
	// console.log('我是mutations的true:'+state.default.changeStatus)
}

export let changeStatusFalse = state => {
	state.default.changeStatus = false
	// console.log('我是mutations的false:'+state.default.changeStatus)

}
