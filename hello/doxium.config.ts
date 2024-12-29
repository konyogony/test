import { DoxiumConfig } from 'types';

export default {
    style: {
        'base-color': 'zinc',
        'accent-color': 'blue',
        'shiki-theme': 'github-dark-dimmed',
    },
    alias: {
        components: '@/components/doxium',
        lib: '@/lib',
        types: '@/types',
    },
    'use-docs': true,
    'base-url': 'app/docs',
    'root-name': 'Getting Started',
    socials: {
        'github-repo': 'https://github.com/konyogony/doxium',
        twitter: '',
        discord: '',
    },
    misc: {
        separate: false,
    },
    lastEdited: {
        enabled: true,
        showAuthor: true,
    },
} satisfies DoxiumConfig;
