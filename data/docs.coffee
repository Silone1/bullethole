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
        description: 'Broadcast when someone dies.'
        type: 'string'
        required: no
        notes: [
            '[~Player~] is the player who died.'
            "[~Role~] is the player's role."
        ]
        example:
            killmsg: '±Bot: ~Player~ (~Role~) is no longer with us!'
    killusermsg:
        description: 'Sent to the person who died.'
        type: 'string'
        required: no
        example:
            killusermsg: '±Bot: You died!'
    ticks:
        description: 'Amount of ticks for a given phase.'
        type: 'object'
        required: no
        notes: [
            'A tick in Mafia is equal to one (1) second.'
            'Cannot be applied to the voting phase.'
            'Minimum ticks is 1, maximum ticks is 60'
        ]
        properties:
            night:
                description: 'Ticks per night.'
                type: 'number'
                required: no
            standby:
                description: 'Ticks per standby.'
                type: 'number'
                required: no
        example:
            ticks:
                night: 30
                standby: 40
            
}