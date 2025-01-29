import { createMachine } from "xstate";

const machine = createMachine({
    id: "Video",
    initial: "mini",
    states: {
      mini: {
        description: "The video as a small thumbnail",
        on: {
          toggle: {
            target: "full",
          }
        }
      },
      full: {
        entry: "playVideo",
        exit: "pauseVideo",
        initial: "playing",
        description: "Video playing fullscreen",
        meta: {
            size: {
                height: 400,
                width: 600,
            }
        },
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
            description: "User clicks video"
          },
          "key.escape": {
            target: "mini"
          }
        }
      }
    }
  });

export default machine