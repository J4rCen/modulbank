import { assign, createMachine } from "xstate";

const machine = createMachine({
  id: "Video",
  initial: "mini",
  context: {
    isLarge: false
  },
  states: {
    mini: {
      on: {
        toggle: {
          target: "full",
        },
        resize: {
          actions: 'toggleSize'
        },
      }
    },
    full: {
      entry: "playVideo",
      exit: "pauseVideo",
      initial: "playing",
      states: {
      playing: {
        on: {
          "video.ended": {
            target: "stopped"
          }
        }
      },
      stopped: {
        after: {
          "1000": {
            target: "#Video.mini",
              actions: []
            }
          }
        }
      },
      on: {
        toggle: {
          target: "mini",
        },
        resize: {
          actions: 'toggleSize'
        },
        "key.escape": {
          target: "mini"
        }
      }
    }, 
  }
}, {
  actions: {
    toggleSize: assign(
      (context) => {
        const el = document.getElementById("reactPlayer")
        
        if (el) {
          if (context.context.isLarge) {
            el.style.width = "500px";
            el.style.height = "350px";
          } else {
            el.style.width = "1000px";
            el.style.height = "700px";
          }
        }
  
        return {isLarge: !context.context.isLarge}
      }
    ),
  }
});

export default machine