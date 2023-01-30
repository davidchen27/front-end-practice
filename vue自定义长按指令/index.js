const { createApp } = Vue

window.onload = () => {
  createApp({
    directives: {
      longpress: {
        beforeMount(el, binding){
          let pressTimer = null
          el.addEventListener('mousedown', function(){
            pressTimer = setTimeout(() => {
              if(typeof binding.value === 'function') binding.value()
              cancel()
            }, parseInt(binding.arg || 2000))
          })
          const cancel = () => {
            if(pressTimer !== null){
              clearTimeout(pressTimer)
              pressTimer = null
            }
          }
          el.addEventListener('mouseup', cancel)
          el.addEventListener('mouseout', cancel)
        },
        beforeUnmount(el){
          el.removeEventListener('mousedown')
          el.removeEventListener('mouseup')
          el.removeEventListener('mouseout')
        }
      }
    },
    methods: {
      doBgChange(){
        document.body.style.color = '#ffffff'
        document.body.style.backgroundColor = rgb()
      }
    }
  }).mount('#app')
}

function rgb(){//rgb颜色随机
  const r = Math.floor(Math.random()*256);
  const g = Math.floor(Math.random()*256);
  const b = Math.floor(Math.random()*256);
  return `rgb(${r},${g},${b})`;
}