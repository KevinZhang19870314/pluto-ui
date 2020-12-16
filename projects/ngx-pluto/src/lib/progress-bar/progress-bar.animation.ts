import {
    animate,
    state,
    style,
    transition,
    trigger,
    AnimationTriggerMetadata,
} from '@angular/animations';

export const daffProgressIndicatorAnimation: {
    readonly fill: AnimationTriggerMetadata,
} = {
    fill: trigger('fill', [
        state('*', style({ width: "{{ percentage }}%" }), { params: { percentage: 100 } }),
        transition('* <=> *', animate('800ms cubic-bezier(.86, .05, .4, .96)'))
    ])
};