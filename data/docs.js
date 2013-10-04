({
  Global: {
    __category__: true,
    name: {
      description: 'Name of a theme.',
      type: 'string',
      required: true,
      example: {
        name: 'default'
      }
    },
    summary: {
      description: 'Summary of the theme. Displayed when the theme has opened for signups.',
      type: 'string',
      required: false,
      example: {
        summary: 'Kill them all and have fun!'
      }
    },
    border: {
      description: 'Replaces the default border if defined. <br/> Using " *** " at the beginning of the border will enable the pink color. Highly recommended.',
      type: 'string',
      required: false,
      example: {
        border: '*** [] [] [] [] [] [] [] [] [] [] [] []'
      }
    },
    killmsg: {
      description: 'Broadcast when someone dies. <br/> ~Player~ is the player who died. ~Role~ is player\'s role.',
      type: 'string',
      required: false,
      example: {
        killmsg: '±Bot: ~Player~ (~Role~) is no longer with us!'
      }
    },
    killusermsg: {
      description: 'Sent to the person who died.',
      type: 'string',
      required: false,
      example: {
        killusermsg: '±Bot: You died!'
      }
    }
  }
});