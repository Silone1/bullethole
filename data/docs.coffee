# This is the theme documentation used by Bullethole.
# It's compiled into JavaScript by grunt-contrib-coffee
# and then later that is eval'd and JSON.parse'd with
# a custom grunt task.

# Categories can have the following meta properties:
# __category__: boolean

# 'required' is optional, but recommended to have even when false.
# Types: string, boolean, number, object, array, randomobject
# Examples are JSON.stringify'd.

# 'properties' contains a list of property objects.

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
    lynchmsg:
        description: 'Broadcast when someone is lynched.'
        type: 'string'
        required: no
        notes: [
            '[~Player~] is the player who was lynched'
            "[~Role~] is the player's role"
            "[~Side~] is the player's side."
            "[~Count~] is the amount of votes against them"
        ]
        example:
            lynchmsg: '±Bot: ~Player~ (~Role~ from ~Side~) had ~Count~ dislikes, goodbye!'
    drawmsg:
        description: 'Broadcast when no side has any roles remaining (revenge kill, for example).'
        type: 'string'
        required: no
        example:
            drawmsg: '±Bot: What is this? Everyone died?'
    minplayers:
        description: 'Minimum amount of players for a game to start.'
        type: 'number'
        required: no
        notes: [
            'Minimum amount of players is 3.'
            'Default is 5.'
        ]
        example:
            minplayers: 8
    nolynch:
        description: 'If the voting phase should be skipped.'
        type: 'boolean'
        required: no
        example:
            nolynch: yes
    votesniping:
        description: 'If players can vote at the very last second.'
        type: 'boolean'
        required: no
        notes: [
            'Normally, if someone votes, the phase timer is set to a minimum of 8 seconds'
            'Not recommended. This can provide an unfair advantage to anyone that can time their vote right before the phase ends.'
        ]
        example:
            votesniping: yes
    silentVote:
        description: 'If the voted target is <b>not</b> broadcast to everyone ([self] voted! instead of [self] voted for [target]!).'
        type: 'boolean'
        required: no
        example:
            silentVote: yes
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
    sides:
        description: 'Sides of a theme.'
        type: 'array'
        required: yes
        example:
            sides: [
                {side: 'Side1', translation: 'Side 1'}
            ]
    roles:
        description: 'Roles of a theme.'
        type: 'array'
        required: yes
        example:
            roles: [
                {role: 'Role1', translation: 'Role 1', side: 'Side1'}
            ]
    rolesN:
        description: 'Role lists of a theme.'
        type: 'array'
        required: yes
        notes: [
            'The syntax is roles<i>n</i>, for example roles1, roles2'
            'Only roles1 is required, any additional role lists are optional.'
            "The next role list is used if the previous role list doesn't have enough roles for the amount of entrants. This also decides the theme's maximum player count"
            'You can have unlimited role lists.'
            "You can't skip a role list. If you have roles3, you must have roles2."
            'Values can be a String or a RandomObject. If they are of type RandomObject, a random role will be selected (each with a specific chance).'
        ]
        example:
            roles1: [
                'role 1'
                'role 2'
            ]
            roles2: [
                'role 2'
                'role 3'
                'role 4'
            ]
            roles3: [
                'role 5'
                'role 6'
                {'role 7': 0.5, 'role 3': 0.5}
            ]
    villageCantLoseRoles:
        description: "Contains a list of roles that prevent the special side 'village' from losing if they have less roles than any other side (in a 1v1)."
        type: 'array'
        required: no
        notes: [
            "Strongly recommended for any theme with a side 'village'."
            "Only roles sided with the village that have a kill, poison, convert, copy, bomb action, revenge kill, or vote(shield) greater than 1 should be in this list"
        ]
        example:
            villageCantLoseRoles: [
                'bomb'
                'vigilante'
                'mayor'
                'samurai'
            ]
}