# Just convert this at http://coffeescript.org/
# it's not that big of a deal

{
 Global:
    __category__: yes
    name:
        description: 'Name of a theme.'
        type: 'string'
        required: yes
        example:
            name: 'default'
    summary:
        description: 'Summary of the theme. Displayed when the theme has opened for signups.'
        type: 'string'
        required: no
        example:
            summary: 'Kill them all and have fun!'
    border:
        description: 'Replaces the default border if defined. <br/> Using " *** " at the beginning of the border will enable the pink color. Highly recommended.'
        type: 'string'
        required: no
        example:
            border: '*** [] [] [] [] [] [] [] [] [] [] [] []'
    killmsg:
        description: 'Broadcast when someone dies. <br/> ~Player~ is the player who died. ~Role~ is player\'s role.'
        type: 'string'
        required: no
        example:
            killmsg: '±Bot: ~Player~ (~Role~) is no longer with us!'
    killusermsg:
        description: 'Sent to the person who died.'
        type: 'string'
        required: no
        example:
            killusermsg: '±Bot: You died!'
}